const express = require("express");
const router = express.Router();
const promptController = require("../controllers/promptController");

router.get("/", promptController.getAllPrompts);
router.post("/", promptController.createPrompt);
router.get("/providers", promptController.getProviders);
router.get("/generation-configs", promptController.getGenerationConfigs);
router.get("/voices", promptController.getVoices);
router.get("/video-ratios", promptController.getVideoRatios);
router.get("/:id/status", promptController.getPromptStatus);

module.exports = router;