const express = require('express');
const controller = require('../controllers/summary.controller');

const router = express.Router();

router.post('/save', controller.save);

module.exports = router;