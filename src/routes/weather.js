const express = require("express");
const router = express.Router()
const wrapperController = require('@/middleware/wrapperController')
const weatherController = require('../controllers/weather')

router.get("/", wrapperController(weatherController.notify))
router.get("/:flight", wrapperController(weatherController.getByFlight));


module.exports = router;
