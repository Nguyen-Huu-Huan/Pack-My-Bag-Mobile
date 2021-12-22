const router = require("express").Router();
const locationController = require("../Controllers/LocationController");

// ADD ITEM
router.post("/addItem", locationController.addItem);

// REMOVE ITEM
router.post("/removeItem", locationController.removeItem);

//GET ALL ITEMS
router.get("/getAllItems", locationController.getAllItems);

module.exports = router;
