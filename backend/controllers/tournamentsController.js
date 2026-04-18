/* tournamentsController.js
Handles tournament CRUD operations and activity logging */

const db = require("../db");
const logActivity = require("../utils/activityLogger");

/* Get tournaments */
exports.getTournaments = async (req, res) => {
    const active = req.query.active;

    let sql = `SELECT 
                    t.id, 
                    t.name, 
                    t.game_id, 
                    t.prize_pool, 
                    t.start_date, 
                    s.name AS status_name, 
                    t.is_active 
                FROM tournaments t
                INNER JOIN status s ON t.status_id = s.id`;

    let values = [];

    if (active == 1 || active === "true") {
        sql += " WHERE t.is_active = ?";
        values.push(1);
    }

    try {
        const [results] = await db.query(sql, values);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

/* Create tournament */
exports.createTournament = async (req, res) => {
    const { name, game_id, prize_pool, start_date, creator_id } = req.body;

    try {
        const [result] = await db.query(
            `
            INSERT INTO tournaments 
            (name, game_id, prize_pool, start_date, status_id, creator_id, is_active)
            VALUES (?, ?, ?, ?, 1, ?, 1)
            `,
            [name, game_id, prize_pool, start_date, creator_id]
        );

        const tournamentId = result.insertId;

        // Log creation activity
        await logActivity({
            user_id: creator_id,
            tournament_id: tournamentId,
            action_type: "NEW_TOURNAMENT",
            description: `New tournament created: ${name}`
        });

        res.json({ message: "Tournament created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

/* Update tournament */
exports.updateTournament = async (req, res) => {
    const { id } = req.params;
    const { name, game_id, prize_pool, start_date, status_id, is_active, editor_id } = req.body;

    try {
        await db.query(
            `
            UPDATE tournaments
            SET name = ?, game_id = ?, prize_pool = ?, start_date = ?, status_id = ?, is_active = ?
            WHERE id = ?
            `,
            [name, game_id, prize_pool, start_date, status_id, is_active, id]
        );

        // Log update activity
        await logActivity({
            user_id: editor_id,
            tournament_id: id,
            action_type: "EDIT_TOURNAMENT",
            description: `Tournament updated: ${name}`
        });

        res.json({ message: "Tournament updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};