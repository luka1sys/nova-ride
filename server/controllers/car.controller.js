

const Car = require("../models/car.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const imageUpload = require("../utils/image");

const addCar = catchAsync(async (req, res, next) => {
    // 1. ამოვიღოთ მონაცემები body-დან
    let {
        brand, model, year, pricePerDay, carType, engine, transmission,
        condition, mileage, fueltype, countryoforigin, doors, seats,
        pasenger, location, description, phone, features
    } = req.body;

    // 2. ლოკაციის გასწორება (ტექსტიდან ობიექტში გადაყვანა)
    // თუ ფრონტიდან მოდის უბრალოდ "tbilisi", ჩვენ ის უნდა ჩავსვათ address ველში
    let formattedLocation;
    if (typeof location === 'string') {
        formattedLocation = { address: location };
    } else {
        formattedLocation = location;
    }

    // 3. Features-ის დაპარსვა
    let parsedFeatures = {};
    if (features) {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    }

    // 4. სურათების დამუშავება
    const images = req.files ? req.files.map((file) => file.path.replace(/\\/g, '/')) : [];
    const result = await imageUpload('cars', images);
    const imagesUrls = result.map(r => r.secure_url);

    // 5. მანქანის შექმნა (ყველა ციფრი ავტომატურად გახდება Number მოდელის მიერ)
    const newCar = await Car.create({
        brand,
        model,
        year,
        pricePerDay,
        images: imagesUrls,
        carType,
        engine,
        transmission,
        condition,
        mileage,
        fueltype,
        countryoforigin,
        doors,
        seats,
        pasenger,
        location: formattedLocation, // აქ უკვე იქნება { address: 'tbilisi' }
        description,
        phone,
        features: parsedFeatures
    });

    res.status(200).json({
        status: 'success',
        message: 'Car added',
        car: newCar
    });
});

const getAllCar = catchAsync(async (req, res, next) => {
    const {
        sorted,
        carType,
        brand,
        model,
        minYear,   // ახალი
        maxYear,   // ახალი
        minPrice,
        maxPrice,
    } = req.query;

    // 1) Query object
    let queryObj = {};
    if (brand) queryObj.brand = brand;
    if (model) queryObj.model = model;
    if (carType) queryObj.carType = carType;

    // Year range filtering
    if ((minYear && !isNaN(minYear)) || (maxYear && !isNaN(maxYear))) {
        queryObj.year = {};
        if (minYear && !isNaN(minYear)) queryObj.year.$gte = Number(minYear);
        if (maxYear && !isNaN(maxYear)) queryObj.year.$lte = Number(maxYear);
    }

    // Price range filtering
    if (minPrice || maxPrice) {
        queryObj.pricePerDay = {};
        if (minPrice && !isNaN(minPrice)) queryObj.pricePerDay.$gte = Number(minPrice);
        if (maxPrice && !isNaN(maxPrice)) queryObj.pricePerDay.$lte = Number(maxPrice);
    }

    // 2) Base query
    let query = Car.find(queryObj);

    // 3) Sorting
    if (sorted === 'price-asc') query = query.sort({ pricePerDay: 1 });
    if (sorted === 'price-desc') query = query.sort({ pricePerDay: -1 });
    if (sorted === 'year-asc') query = query.sort({ year: 1 });
    if (sorted === 'year-desc') query = query.sort({ year: -1 });

    // 4) Execute query (NO PAGINATION)
    const cars = await query;

    // 5) Send response
    res.status(200).json({
        status: 'success',
        results: cars.length,
        cars
    });
});

const getCar = catchAsync(async (req, res, next) => {
    const car = await Car.findById(req.params.id)
    if (!car) {
        return next(new AppError('car not found', 404))
    }
    res.status(200).json({
        status: 'success',
        car
    })
})

const updateCar = catchAsync(async (req, res, next) => {
    let car = await Car.findById(req.params.id);
    if (!car) return next(new AppError('Car not found', 404));

    // 1. სურათების დამუშავება
    let imagesUrls = car.images; // დავიტოვოთ ძველი სურათები

    // შემოწმება: ნამდვილად მოვიდა თუ არა ფაილები
    if (req.files && req.files.length > 0) {
        try {
            const images = req.files.map(file => file.path.replace(/\\/g, '/'));

            // დაამატე კონსოლში, რომ ნახო აქამდე თუ აღწევს
            console.log("Uploading to Cloudinary...");

            const result = await imageUpload('cars', images);

            if (result && result.length > 0) {
                imagesUrls = result.map(r => r.secure_url);
                console.log("Upload successful!");
            }
        } catch (uploadErr) {
            console.error("Cloudinary Upload Error:", uploadErr);
            // თუ ატვირთვა ჩავარდა, ნუ გავაჩერებთ რექვესტს, დავაბრუნოთ ერორი
            return next(new AppError('Image upload failed', 500));
        }
    }

    // 2. დანარჩენი მონაცემების მომზადება
    const { features, location, ...bodyData } = req.body;

    // Features-ის სწორი დაპარსვა
    let parsedFeatures = car.features;
    if (features) {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    }

    // ლოკაციის სწორი დამუშავება
    let formattedLocation = car.location;
    if (location) {
        formattedLocation = typeof location === 'string' ? { address: location } : location;
    }

    // 3. მონაცემების შერწყმა
    const updateData = {
        ...bodyData,
        images: imagesUrls,
        features: parsedFeatures,
        location: formattedLocation
    };

    // წავშალოთ undefined მნიშვნელობები
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    Object.assign(car, updateData);

    // შენახვა (save() გამოიძახებს გეოკოდერსაც)
    const updatedCar = await car.save();

    res.status(200).json({
        status: 'success',
        car: updatedCar
    });
});

const deleteCar = catchAsync(async (req, res, next) => {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return next(AppError('Car not found', 404));
    res.status(200).json({
        status: 'success',
        message: 'Car deleted',
        car
    })
})


module.exports = { addCar, getAllCar, getCar, updateCar, deleteCar }
