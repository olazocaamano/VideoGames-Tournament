const db = require('../db');

//Get all users
exports.getUsers = (req, res) => {
    const sql = 'SELECT * FROM user';

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(results);
    });
};

exports.login = (req, res) => {
    const {username, password} = req.body;

    const sql = 'SELECT id, username, role FROM user WHERE username = ? ADN password = ?';

    db.query(sql, [username, password], (err, results) => {
        if(err){
            return status(500).json({ error: 'Database error'});
        }

        if(results.length === 0){
            return res.status(401).json({ error: 'Invalid credentials'});
        }

        res.json({ message: 'Login successful', user: results[0] });
    });
};