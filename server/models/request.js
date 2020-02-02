const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const RequestSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "user" },
  product: String,
  price: String,
  units: String,
});

module.exports = mongoose.model("request", RequestSchema);
