const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

router.post('/add', createEmployee);
router.get('/', getEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
