const db = require('../db');
const logActivity = require("../utils/activityLogger");

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
    const { username, email, password, role_id } = req.body;

    const nickname = req.body.nickname || username;

    try {
        const [result] = await db.query(
            `
            INSERT INTO users (username, email, password, role_id, nickname, is_active)
            VALUES (?, ?, ?, ?, ?, 1)
            `,
            [username, email, password, role_id, nickname]
        );

        const newUserId = result.insertId;

        await logActivity({
            user_id: newUserId,
            action_type: role_id === 1 ? "NEW_ADMIN" : "NEW_USER",
            description: role_id === 1
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
            `SELECT 
                u.id, 
                u.username, 
                r.role_name 
            FROM users u
            INNER JOIN roles r ON u.role_id = r.id
            WHERE u.username = ? AND u.password = ?`,

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