const express = require('express');
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/getMyRecipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({
      user: new mongoose.Types.ObjectId(req.user._id),
    });
    res.json({ msg: 'RECIPES FOUND', data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getByRecipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    if (!recipe) return res.json({ msg: 'RECIPE NOT FOUND' });
    res.json({ msg: 'RECIPE FOUND', data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/addRecipe', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.json({ msg: 'USER NOT FOUND' });
    await Recipe.create({ ...req.body, user: user._id });
    res.json({ msg: 'RECIPE ADDED' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/deleteByRecipeId', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    if (!recipe) return res.json({ msg: 'RECIPE NOT FOUND' });
    await Recipe.deleteOne({ _id: req.body.recipeId });
    res.json({ msg: 'RECIPE DELETED' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
