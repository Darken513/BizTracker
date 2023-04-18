const express = require('express');
const controller = require('../controllers/banknotesummary.controller');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/get/:id', controller.getById);
router.post('/new', controller.createNew);

module.exports = router;