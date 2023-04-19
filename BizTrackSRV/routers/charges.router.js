const express = require('express');
const controller = require('../controllers/charges.controller');

const router = express.Router();

router.get('/getAll', controller.getAll);
router.get('/get/:id', controller.getById);
router.get('/getByBankNoteSummary/:id', controller.getBybanknoteSummaryId);
router.post('/new', controller.createNew);

module.exports = router;