const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({

  user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },

  name: { 
    type: String, 
    required: true },
  
  description: { 
    type: String, 
    required: true },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
