const mysql = require('mysql');

const db = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test-socket'
});

exports.db = db;