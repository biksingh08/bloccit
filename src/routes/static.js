const express = require("express");
const staticController = require("../controllers/staticController");
const router = express.Router();

router.get("/", staticController.index);
router.get("/about", staticController.about);
router.get("/marco", staticController.about);




module.exports = router;
