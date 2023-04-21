const express = require('express');
const controller = require('../controllers/employees.controller');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/getByResturant/:id', controller.getAllByResturantId);

module.exports = router;