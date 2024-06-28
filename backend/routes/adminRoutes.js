const express = require('express');
const router = express.Router();
const { addFirstName, addLastName, addComment } = require('../controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');

// Route pour ajouter un prénom
router.post('/add-firstname', isAuthenticated, isAdmin, addFirstName);

// Route pour ajouter un nom de famille
router.post('/add-lastname', isAuthenticated, isAdmin, addLastName);

// Route pour ajouter un commentaire
router.post('/add-comment', isAuthenticated, isAdmin, addComment);

module.exports = router;
