const db = require('../db');
const logActivity = require("../utils/activityLogger");
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT id, username, email, role_id, is_active FROM users');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    const { username, email, password, nickname } = req.body;

    const nicknameValue = nickname || username;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [existingUser] = await db.query(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            `
            INSERT INTO users (username, email, password, role_id, nickname, is_active)
            VALUES (?, ?, ?, 3, ?, 1)
            `,
            [username, email, hashedPassword, nicknameValue]
        );

        const newUserId = result.insertId;

        await logActivity({
            user_id: newUserId,
            action_type: "NEW_USER",
            description: `New user registered: ${username}`
        });

        res.json({ message: "User registered successfully" });

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
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

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

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