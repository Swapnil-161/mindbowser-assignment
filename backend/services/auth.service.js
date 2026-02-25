const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
    async signup(userData) {
        const { username, email, password } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return user;
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return { user, token };
    }

    async getUserById(id) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
    }
}

module.exports = new AuthService();
