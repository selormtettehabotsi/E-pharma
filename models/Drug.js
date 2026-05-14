const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: String,
  price: Number,
  pharmacy: String,
  location: String,
  strength: Schema.Types.Mixed,
  form: String
});

// Text index for fast, case-insensitive search on name
drugSchema.index({ name: 'text' });

module.exports = mongoose.model('Drug', drugSchema);
