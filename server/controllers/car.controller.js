

const Car = require("../models/car.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const imageUpload = require("../utils/image");
const addCar = catchAsync(async (req, res, next) => {
    let {
        brand, model, year, pricePerDay, carType, engine, transmission,
        condition, mileage, fueltype, countryoforigin, doors, seats,
        pasenger, location, description, phone, features
    } = req.body;

    // 1. ლოკაციის სწორად დაჭერა
    let addressText = "";

    if (typeof location === 'string') {
        // თუ სტრინგია, ვამოწმებთ ხომ არ არის JSON სტრინგი
        if (location.startsWith('{')) {
            try {
                const parsedLoc = JSON.parse(location);
                addressText = parsedLoc.address || "";
            } catch (e) {
                addressText = location;
            }
        } else {
            addressText = location;
        }
    } else if (location && typeof location === 'object') {
        // თუ პირდაპირ ობიექტი მოვიდა
        addressText = location.address || "";
    }

    // თუ მისამართი ცარიელია, შეგვიძლია შეცდომა დავაბრუნოთ
    if (!addressText || addressText === "[object Object]") {
        return next(new AppError('Please provide a valid location address', 400));
    }

    // 2. Features-ის დაპარსვა
    let parsedFeatures = {};
    if (features) {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    }

    // 3. სურათების დამუშავება
    const images = req.files ? req.files.map((file) => file.path.replace(/\\/g, '/')) : [];
    const result = await imageUpload('cars', images);
    const imagesUrls = result.map(r => r.secure_url);

    // 4. მანქანის შექმნა
    const newCar = await Car.create({
        brand, model, year, pricePerDay,
        images: imagesUrls,
        carType, engine, transmission, condition, mileage, fueltype,
        countryoforigin, doors, seats, pasenger,
        location: {
            address: addressText // აქ ახლა იქნება ნამდვილი ტექსტი: "Tbilisi"
        },
        description, phone,
        features: parsedFeatures
    });

    res.status(200).json({
        status: 'success',
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

    const {
        brand, model, year, pricePerDay, carType, engine, transmission,
        condition, mileage, fueltype, countryoforigin, doors, seats,
        pasenger, location, description, phone, features
    } = req.body;

    // 1. Features-ის დაპარსვა
    let parsedFeatures = car.features;
    if (features) {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    }

    // 2. სურათების დამუშავება
    let imagesUrls = car.images;
    if (req.files && req.files.length > 0) {
        const images = req.files.map(file => file.path.replace(/\\/g, '/'));
        const result = await imageUpload('cars', images);
        imagesUrls = result.map(r => r.secure_url);
    }

    // 3. ლოკაციის გასწორება (აი ეს აკლდა!)
    let formattedLocation = car.location; // დეფოლტად ძველი დავტოვოთ

    if (location) {
        if (typeof location === 'string') {
            try {
                formattedLocation = JSON.parse(location);
            } catch (e) {
                formattedLocation = { address: location };
            }
        } else {
            formattedLocation = location;
        }
    }

    // 4. მონაცემების მომზადება
    const updateData = {
        brand, model, year, pricePerDay,
        images: imagesUrls,
        carType,
        engine, transmission, condition, mileage, fueltype,
        countryoforigin, doors, seats, pasenger,
        location: formattedLocation, // ახლა უკვე ობიექტია
        description, phone,
        features: parsedFeatures
    };

    // 5. განახლება და შენახვა
    Object.assign(car, updateData);
    const updatedCar = await car.save();

    res.status(200).json({
        status: 'success',
        message: 'Car updated',
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
