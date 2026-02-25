const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');
const aiRoutes = require('./routes/ai.routes');
const articleRoutes = require('./routes/article.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/articles', articleRoutes);

// Database Sync & Server Start
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
