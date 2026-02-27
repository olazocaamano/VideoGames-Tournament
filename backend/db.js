//Conection to MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "esports_db"
});

connection.connect((err) => {
    if(err){
        console.error('Error connecting to the DB: ' + err.stack);
        return
    }
    console.log('Successfully connected to MySQL!');
});

module.exports = connection;