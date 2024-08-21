const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/employees', marketController.listEmployees);
router.post('/buy', marketController.buyEmployee);
router.post('/sell', marketController.sellEmployee);

module.exports = router;
