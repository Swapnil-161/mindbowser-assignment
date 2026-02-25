const articleService = require('../services/article.service');

const createArticle = async (req, res) => {
    try {
        const article = await articleService.createArticle(req.body, req.user.id);
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleService.getAllArticles(req.query);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getArticleById = async (req, res) => {
    try {
        const article = await articleService.getArticleById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article not found' });
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyArticles = async (req, res) => {
    try {
        const articles = await articleService.getMyArticles(req.user.id);
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const article = await articleService.updateArticle(req.params.id, req.body, req.user.id);
        res.json(article);
    } catch (error) {
        const status = error.message === 'Unauthorized' ? 403 : 400;
        res.status(status).json({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        await articleService.deleteArticle(req.params.id, req.user.id);
        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        const status = error.message === 'Unauthorized' ? 403 : 404;
        res.status(status).json({ message: error.message });
    }
};

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    getMyArticles,
    updateArticle,
    deleteArticle
};
