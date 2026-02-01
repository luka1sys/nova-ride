

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

    // ლოკაციის გასწორება 
   
    let formattedLocation;
    if (typeof location === 'string') {
        formattedLocation = { address: location };
    } else {
        formattedLocation = location;
    }


    let parsedFeatures = {};
    if (features) {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    }

    //  სურათების დამუშავება
    const images = req.files ? req.files.map((file) => file.path.replace(/\\/g, '/')) : [];
    const result = await imageUpload('cars', images);
    const imagesUrls = result.map(r => r.secure_url);

    //  მანქანის შექმნა 
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
        location: formattedLocation, 
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
        minYear,   
        maxYear,   
        minPrice,
        maxPrice,
    } = req.query;

  
    let queryObj = {};
    if (brand) queryObj.brand = brand;
    if (model) queryObj.model = model;
    if (carType) queryObj.carType = carType;


    if ((minYear && !isNaN(minYear)) || (maxYear && !isNaN(maxYear))) {
        queryObj.year = {};
        if (minYear && !isNaN(minYear)) queryObj.year.$gte = Number(minYear);
        if (maxYear && !isNaN(maxYear)) queryObj.year.$lte = Number(maxYear);
    }

    if (minPrice || maxPrice) {
        queryObj.pricePerDay = {};
        if (minPrice && !isNaN(minPrice)) queryObj.pricePerDay.$gte = Number(minPrice);
        if (maxPrice && !isNaN(maxPrice)) queryObj.pricePerDay.$lte = Number(maxPrice);
    }

    let query = Car.find(queryObj);

    if (sorted === 'price-asc') query = query.sort({ pricePerDay: 1 });
    if (sorted === 'price-desc') query = query.sort({ pricePerDay: -1 });
    if (sorted === 'year-asc') query = query.sort({ year: 1 });
    if (sorted === 'year-desc') query = query.sort({ year: -1 });

    const cars = await query;

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

    //  Features-ის დაპარსვა
    let parsedFeatures = car.features;
    if (features) {
        parsedFeatures = typeof features === "string" ? JSON.parse(features) : features;
    }

    //  სურათების დამუშავება
    let imagesUrls = car.images;
    if (req.files && req.files.length > 0) {
        const images = req.files.map(file => file.path.replace(/\\/g, '/'));
        const result = await imageUpload('cars', images);
        imagesUrls = result.map(r => r.secure_url);
    }

    let formattedLocation = car.location; 
    if (location) {
        if (typeof location === 'string') {
            formattedLocation = { address: location };
        } else {
            formattedLocation = location;
        }
    }


    const updateData = {
        brand, model, year, pricePerDay,
        images: imagesUrls,
        carType,
        engine, transmission, condition, mileage, fueltype,
        countryoforigin, doors, seats, pasenger,
        location: formattedLocation, 
        description, phone,
        features: parsedFeatures
    };

    //  განახლება და შენახვა
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