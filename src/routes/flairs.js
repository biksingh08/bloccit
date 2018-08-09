const express = require("express");
const validation = require("./validation");
const router = express.Router();

const flairController = require("../controllers/flairController")

router.get("/topics/:topicId/flairs/new", flairController.new);

router.get("/topics/:topicId/flairs/:id", flairController.show);

router.get("/topics/:topicId/flairs/:id/edit", flairController.edit);

router.post("/topics/:topicId/flairs/create", validation.validateFlairs, flairController.create);

router.post("/topics/:topicId/flairs/:id/update", validation.validateFlairs, flairController.update);

router.post("/topics/:topicId/flairs/:id/destroy", flairController.destroy);

module.exports = router;
