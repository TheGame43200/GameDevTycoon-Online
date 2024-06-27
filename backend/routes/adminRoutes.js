const express = require('express');
const router = express.Router();
const Name = require('../models/Name');
const Comment = require('../models/Comment');

// Ajouter un prénom et un nom
router.post('/add-name', async (req, res) => {
  const { firstName, lastName } = req.body;
  const name = new Name({ firstName, lastName });
  try {
    await name.save();
    res.status(201).send(name);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Ajouter un commentaire
router.post('/add-comment', async (req, res) => {
  const { text, rating } = req.body;
  const comment = new Comment({ text, rating });
  try {
    await comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
