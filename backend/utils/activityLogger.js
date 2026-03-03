const db = require("../db");

const logActivity = async ({
    user_id,
    tournament_id = null,
    game_id = null,
    match_id = null,
    action_type,
    description
}) => {
    try {
        await db.query(`
            INSERT INTO activity
            (user_id, tournament_id, game_id, match_id, action_type, description, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
            `, [user_id, tournament_id, game_id, match_id, action_type, description]);
    } catch (err) {
        console.error("Activity log error: ", err);
    }
};

module.exports = logActivity;