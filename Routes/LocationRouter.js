const router = require("express").Router();
const locationController = require("../Controllers/LocationController");

// ADD LOCATION
router.post("/add", locationController.addLocation);

// REMOVE LOCATION
router.post("/remove/:locationID", locationController.removeLocation);

//EDIT LOCATION
router.post("/edit/:locationID", locationController.editLocation);

//GET ALL LOCATIONS
router.get("/getAllLocations", locationController.getAllLocations);

module.exports = router;
