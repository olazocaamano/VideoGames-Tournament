const db = require("../db");

//Get Tournaments from the database
exports.getTournaments = (req, res) => {
    const active = req.query.active;

    let sql = "SELECT * FROM tournaments";
    let values = [];

    if(active == 1 || active === "true"){
        sql += " WHERE is_active = ?";
        values.push(1);
    }

    db.query(sql, values, (err, results) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
};