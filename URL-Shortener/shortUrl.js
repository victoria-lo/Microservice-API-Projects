// This is where we define the data that we are gonna save
const mongoose = require("mongoose");

// We'll create a schema for our database entries to follow, making both of its keys/properties required...
const urlSchema = new mongoose.Schema({
  original_url: {type: String, required: true},
  short_url: {type: Number, required: true}
});


module.exports = mongoose.model("shortUrl", urlSchema);
