const FirstName = require('../models/FirstName');
const LastName = require('../models/LastName');
const Comment = require('../models/Comment');

exports.addFirstName = async (req, res) => {
    try {
        const { firstName } = req.body;
        const newFirstName = new FirstName({ name: firstName });
        await newFirstName.save();
        res.status(201).json({ message: 'Prénom ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du prénom' });
    }
};

exports.addLastName = async (req, res) => {
    try {
        const { lastName } = req.body;
        const newLastName = new LastName({ name: lastName });
        await newLastName.save();
        res.status(201).json({ message: 'Nom de famille ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du nom de famille' });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const newComment = new Comment({ text, rating });
        await newComment.save();
        res.status(201).json({ message: 'Commentaire ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire' });
    }
};
