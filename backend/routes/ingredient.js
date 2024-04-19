const express = require('express');
const Ingredient = require('../models/Ingredient');
const User = require('../models/User');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/getMyIngredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({
      user: new mongoose.Types.ObjectId(req.user._id),
    });
    res.json({ msg: 'INGREDIENTS FOUND', data: ingredients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getByIngredientId', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.body.ingredientId);
    if (!ingredient) return res.json({ msg: 'INGREDIENT NOT FOUND' });
    res.json({ msg: 'INGREDIENT FOUND', data: ingredient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addIngredient', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.json({ msg: 'USER NOT FOUND' });
    await Ingredient.create({ ...req.body, user: user._id });
    res.json({ msg: 'INGREDIENT ADDED' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/deleteByIngredientId', async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.body.ingredientId);
    if (!ingredient) return res.json({ msg: 'INGREDIENT NOT FOUND' });
    await Ingredient.deleteOne({ _id: req.body.ingredientId });
    res.json({ msg: 'INGREDIENT DELETED' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
