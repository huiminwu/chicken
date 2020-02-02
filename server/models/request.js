const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  user: String,
  product: String,
  units: Number,
  id: Number
});

module.exports = mongoose.model("request", RequestSchema);