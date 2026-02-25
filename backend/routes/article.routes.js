const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', articleController.getAllArticles);
router.get('/my', authMiddleware, articleController.getMyArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', authMiddleware, articleController.createArticle);
router.put('/:id', authMiddleware, articleController.updateArticle);
router.delete('/:id', authMiddleware, articleController.deleteArticle);

module.exports = router;
