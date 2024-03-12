const mongoose = require("mongoose");
const { Schema } = mongoose;

const placemasterSchema = new Schema({
  place_id: { type: String },
  city: { type: String, require: true },
  title: { type: String },
  description: { type: String },
  upload_images: { type: String },
  location: { type: String },
  timing: { type: String },
  website_url: { type: String },
  season: { type: String },
});

module.exports = mongoose.model("place_master", placemasterSchema);
