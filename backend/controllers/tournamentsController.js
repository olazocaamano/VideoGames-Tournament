const db = require("../db");
const logActivity = require("../utils/activityLogger");

exports.getTournaments = async (req, res) => {
    const active = req.query.active;

    let sql = "SELECT * FROM tournaments";
    let values = [];

    if (active == 1 || active === "true") {
        sql += " WHERE is_active = ?";
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

exports.createTournament = async (req, res) => {
    const { name, game_id, prize_pool, start_date, creator_id } = req.body;

    try {
        const [result] = await db.query(
            `
            INSERT INTO tournaments 
            (name, game_id, prize_pool, start_date, status, creator_id, is_active)
            VALUES (?, ?, ?, ?, 'open', ?, 1)
            `,
            [name, game_id, prize_pool, start_date, creator_id]
        );

        const tournamentId = result.insertId;

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

exports.updateTournament = async (req, res) => {
    const { id } = req.params;
    const { name, game_id, prize_pool, start_date, status, is_active, editor_id } = req.body;

    try {
        const [result] = await db.query(
            `
            UPDATE tournaments
            SET name = ?, game_id = ?, prize_pool = ?, start_date = ?, status = ?, is_active = ?
            WHERE id = ?
            `,
            [name, game_id, prize_pool, start_date, status, is_active, id]
        );

        await logActivity({
            user_id: editor_id,
            tournament_id: id,
            action_type: "EDIT_TOURNAMENT",
            description: `Tournament updated: ${name}`
        });

        res.json({ message: "Tournament updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};