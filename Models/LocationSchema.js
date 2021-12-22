const mongoose = require("mongoose");
const LocationSchema = new mongoose.Schema({
    latitude: {type: Number},
    longitude: {type: Number},
    name: {type: String},
    location_type: {type: String},
});
module.exports = mongoose.models["Location"] || mongoose.model("Location", LocationSchema);
