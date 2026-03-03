const db = require('../db');
const logActivity = require("../utils/activityLogger");

exports.getUsers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM users');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const [result] = await db.query(
            `
            INSERT INTO users (username, email, password, role, is_active)
            VALUES (?, ?, ?, ?, 1)
            `,
            [username, email, password, role]
        );

        const newUserId = result.insertId;

        await logActivity({
            user_id: newUserId,
            action_type: role === "admin" ? "NEW_ADMIN" : "NEW_USER",
            description: role === "admin"
                ? `New administrator added: ${username}`
                : `New user registered: ${username}`
        });

        res.json({ message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [results] = await db.query(
            'SELECT id, username, role FROM users WHERE username = ? AND password = ?',
            [username, password]
        );

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        res.json({ message: 'Login successful', user: results[0] });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};