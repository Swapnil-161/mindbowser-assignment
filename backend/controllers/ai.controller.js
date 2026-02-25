const aiService = require('../services/ai.service');

const improveContent = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const result = await aiService.improveContent(content);
        res.json({ improvedContent: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateSummary = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const summary = await aiService.generateSummary(content);
        res.json({ summary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const suggestTitle = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const title = await aiService.suggestTitle(content);
        res.json({ title });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const suggestTags = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }
        const tags = await aiService.suggestTags(content);
        res.json({ tags }); // Now returns array of tags
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    improveContent,
    generateSummary,
    suggestTitle,
    suggestTags
};
