const express = require('express');
const controller = require('../controllers/restaurant.controller');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/getAllwithDetails', controller.getAllwithDetails);
router.get('/get/:id', controller.getById);
router.post('/new', controller.createNew);
router.post('/assign', controller.assignUserRestaurant);

module.exports = router;