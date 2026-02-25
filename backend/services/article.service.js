const { Article, User, Tag, ArticleTag, sequelize } = require('../models');
const { Op } = require('sequelize');

class ArticleService {
    async createArticle(data, authorId) {
        const { title, content, summary, category, tags } = data;

        const transaction = await sequelize.transaction();
        try {
            const article = await Article.create({
                title, content, summary, category, authorId
            }, { transaction });

            if (tags && tags.length > 0) {
                for (const tagName of tags) {
                    const [tag] = await Tag.findOrCreate({
                        where: { name: tagName.toLowerCase() },
                        transaction
                    });
                    await ArticleTag.create({
                        articleId: article.id,
                        tagId: tag.id
                    }, { transaction });
                }
            }

            await transaction.commit();
            return await this.getArticleById(article.id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getAllArticles(filters = {}) {
        const { category, search } = filters;
        const where = {};

        if (category) where.category = category;
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } }
            ];
        }

        return await Article.findAll({
            where,
            include: [
                { model: User, as: 'author', attributes: ['username'] },
                { model: Tag, through: { attributes: [] } }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async getArticleById(id) {
        return await Article.findByPk(id, {
            include: [
                { model: User, as: 'author', attributes: ['username', 'email'] },
                { model: Tag, through: { attributes: [] } }
            ]
        });
    }

    async getMyArticles(authorId) {
        return await Article.findAll({
            where: { authorId },
            include: [
                { model: Tag, through: { attributes: [] } }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async updateArticle(id, data, authorId) {
        const article = await Article.findByPk(id);
        if (!article) throw new Error('Article not found');
        if (article.authorId !== authorId) throw new Error('Unauthorized');

        const { title, content, summary, category, tags } = data;
        const transaction = await sequelize.transaction();

        try {
            await article.update({ title, content, summary, category }, { transaction });

            if (tags) {
                // Clear existing tags
                await ArticleTag.destroy({ where: { articleId: id }, transaction });

                for (const tagName of tags) {
                    const [tag] = await Tag.findOrCreate({
                        where: { name: tagName.toLowerCase() },
                        transaction
                    });
                    await ArticleTag.create({
                        articleId: id,
                        tagId: tag.id
                    }, { transaction });
                }
            }

            await transaction.commit();
            return await this.getArticleById(id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async deleteArticle(id, authorId) {
        const article = await Article.findByPk(id);
        if (!article) throw new Error('Article not found');
        if (article.authorId !== authorId) throw new Error('Unauthorized');

        await article.destroy();
        return true;
    }
}

module.exports = new ArticleService();
