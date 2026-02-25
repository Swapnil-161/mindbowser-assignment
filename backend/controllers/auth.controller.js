const authService = require('../services/auth.service');

const signup = async (req, res) => {
    try {
        const user = await authService.signup(req.body);
        res.status(201).json({
            message: 'User created successfully',
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    signup,
    login,
    getMe
};
