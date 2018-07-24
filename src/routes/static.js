const express = require("express");
const staticController = require("../controllers/staticController");
const router = express.Router();

router.get("/", staticController.index);

router.get("/marco", (req, res, next) => {
  res.send("polo");
});

module.exports = router;
