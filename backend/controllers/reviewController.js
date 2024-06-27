const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    const { user, game, rating, comment } = req.body;
    try {
        const newReview = new Review({ user, game, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('user').populate('game');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
