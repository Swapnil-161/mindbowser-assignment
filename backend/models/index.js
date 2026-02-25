const User = require('./User');
const Article = require('./Article');
const Tag = require('./Tag');
const sequelize = require('../config/database');

// User - Article (One-to-Many)
User.hasMany(Article, { foreignKey: 'authorId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

// Article - Tag (Many-to-Many via ArticleTags)
const ArticleTag = sequelize.define('ArticleTag', {}, { timestamps: false });

Article.belongsToMany(Tag, { through: ArticleTag, foreignKey: 'articleId' });
Tag.belongsToMany(Article, { through: ArticleTag, foreignKey: 'tagId' });

module.exports = {
    sequelize,
    User,
    Article,
    Tag,
    ArticleTag
};
