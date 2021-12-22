const router = require("express").Router();
const weatherController = require("../Controllers/WeatherController");

// GET ALL WEATHER TYPES
router.get("/getAllWeatherTypes", weatherController.getAllWeatherTypes);

module.exports = router;
