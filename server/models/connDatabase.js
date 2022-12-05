const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: 'basement',
    database: 'socketnode'
});

exports.db = db;