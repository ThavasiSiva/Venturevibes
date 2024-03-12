const mongoose = require("mongoose");
const { Schema } = mongoose;

const cityMasterSchema = new Schema({
  city_id:{type:String},
  city: { type: String, require: true },
  district: { type: String },
});

module.exports = mongoose.model("city_master", cityMasterSchema);