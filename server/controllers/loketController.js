const { query } = require('express');
const { db } = require('../models/connDatabase');

const getLoket = async (req, res, next) => {
    try {
        db.getConnection((err, connection) => {
            if (err){
                console.log(err);
                return res.status(500).json({
                    message: 'Error connecting to database',
                    error: err
                });
            };
            console.log(`Connected as ID: ${connection.threadId}`);
            connection.query('SELECT * FROM client_antrian', (err, rows) => {
                connection.release();
                if (!err) {
                    res.send(rows);
                } else {
                    console.log(err);
                    return;
                }
            });
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

module.exports = {
    getLoket,
}