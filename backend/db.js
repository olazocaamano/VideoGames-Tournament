const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "esports_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("Successfully connected to MySQL!");

module.exports = connection;