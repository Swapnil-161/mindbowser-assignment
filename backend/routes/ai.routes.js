const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/improve', authMiddleware, aiController.improveContent);
router.post('/summary', authMiddleware, aiController.generateSummary);
router.post('/suggest-title', authMiddleware, aiController.suggestTitle);
router.post('/suggest-tags', authMiddleware, aiController.suggestTags);

module.exports = router;
