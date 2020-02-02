const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  user: String,
  product: String,
  units: Number,
});

module.exports = mongoose.model("request", RequestSchema);
