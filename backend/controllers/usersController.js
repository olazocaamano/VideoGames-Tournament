/* usersController.js
Handles user management including registration, login, and retrieval of users and players */

const db = require('../db');
const logActivity = require("../utils/activityLogger");
const bcrypt = require('bcrypt');

/* Get all users */
exports.getUsers = async (req, res) => {
    try {
        const [results] = await db.query(
            'SELECT id, username, email, role_id, is_active FROM users'
        );

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

/* Register new user */
exports.register = async (req, res) => {
    const { username, email, password, nickname } = req.body;

    // Default nickname if not provided
    const nicknameValue = nickname || username;

    try {
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if user already exists
        const [existingUser] = await db.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user (role_id = 3 = player)
        const [result] = await db.query(
            `
            INSERT INTO users (username, email, password, role_id, nickname, is_active)
            VALUES (?, ?, ?, 3, ?, 1)
            `,
            [username, email, hashedPassword, nicknameValue]
        );

        const newUserId = result.insertId;

        // Log registration activity
        await logActivity({
            user_id: newUserId,
            action_type: "NEW_USER",
            description: `New user registered: ${username}`
        });

        res.json({ message: "User registered successfully" });

    } catch (err) {
        // Handle duplicate entry error
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

/* Login user */
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Get user with role information
        const [results] = await db.query(
            `SELECT 
                u.id, 
                u.username, 
                u.password,
                r.role_name 
            FROM users u
            INNER JOIN roles r ON u.role_id = r.id
            WHERE u.username = ?`,
            [username]
        );

        // Validate user exists
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user session data
        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                role_name: user.role_name
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};

/* Get players only */
exports.getPlayers = async (req, res) => {
    try {
        const sql = `
            SELECT 
                u.id, 
                u.username, 
                u.nickname, 
                u.email, 
                u.role_id,
                u.is_active,
                r.role_name 
            FROM users u
            INNER JOIN roles r ON u.role_id = r.id
            WHERE r.role_name = 'player'
        `;

        const [results] = await db.query(sql);
        res.json(results);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error fetching players" });
    }
};