const db = require('../db');

//Retrieve recent activity from the database
exports.getActivity = (req, res) => {
    let sql = "SELECT * FROM activity";

    db.query(sql, (err, results) => {
        if(err){
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    }); 
};