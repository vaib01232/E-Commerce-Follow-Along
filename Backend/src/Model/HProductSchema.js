const mongoose = require("mongoose");

const homeProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  tags: [String],
  price: Number,
  stock: Number,
  email: String,
  images: [String]
});

const HomeProductModel = mongoose.model('Products', homeProductSchema,);


module.exports = HomeProductModel;
