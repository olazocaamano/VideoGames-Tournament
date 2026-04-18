/* File: activityController.js
Description: Handles retrieval of system activity logs.
Combines data from users, tournaments, games, and matches
to generate a complete activity feed. 
*/

const db = require('../db');

/* Get all system activities
Returns a detailed activity feed ordered by most recent first 
*/
exports.getActivities = async (req, res) => {
    try {

        // Query activity log with related data from multiple tables
        const [rows] = await db.query(`
            SELECT 
                a.id,
                a.action_type,
                a.description,
                a.created_at,
                u.username,
                t.name AS tournament_name,
                g.game_name,
                m.round
            FROM activity a
            LEFT JOIN users u ON a.user_id = u.id
            LEFT JOIN tournaments t ON a.tournament_id = t.id
            LEFT JOIN games g ON a.game_id = g.id
            LEFT JOIN matches m ON a.match_id = m.id
            ORDER BY a.created_at DESC
        `);

        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
};