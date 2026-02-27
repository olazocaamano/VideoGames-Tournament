const db = require('../db');

//Get all games from the database
exports.getGames = (req, res) => {
    const sql = 'SELECT * FROM games';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
};