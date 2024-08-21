const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/hire', employeeController.hireEmployee);
router.delete('/:id', employeeController.fireEmployee);
router.put('/:id', employeeController.updateEmployee);

module.exports = router;
