const express = require('express');
const { addCar, getAllCar, getCar, updateCar, deleteCar } = require('../controllers/car.controller');
const { restrictTo, protect } = require('../middleware/auth.middleware');
const upload = require('../config/multer');




const carRouter = express.Router()

carRouter.post('/', upload.array('images', 8), protect, restrictTo('admin'), addCar)
carRouter.get('/', getAllCar)
carRouter.get('/:id', getCar)
carRouter.patch('/:id', upload.array('images', 8), protect, restrictTo('admin'), updateCar);
carRouter.delete('/:id', protect, restrictTo('admin'), deleteCar)
module.exports = carRouter

