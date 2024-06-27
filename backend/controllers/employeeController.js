const Employee = require('../models/Employee');

// Ajouter un employé
exports.createEmployee = async (req, res) => {
    const { name, development, graphics, ai, gameDesign, sound, overallRating, potential } = req.body;
    try {
        const employee = new Employee({ name, development, graphics, ai, gameDesign, sound, overallRating, potential });
        await employee.save();
        res.status(201).send(employee);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Récupérer tous les employés
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.send(employees);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Mettre à jour un employé
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer un employé
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employé supprimé' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
