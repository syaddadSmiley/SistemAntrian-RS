const { query } = require('express');
const { db } = require('../models/connDatabase');
const getLastCalledAntrian = async (req, res, next) => {
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
            id = "1";
            connection.query('SELECT * FROM data_antrian WHERE id = ?', [id], (err, rows) => {
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

const getLastAntrian = async (req, res, next) => {
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
            var today = new Date();
            var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)+'%';
            console.log(date)
            connection.query('SELECT * FROM data_antrian where Date(waktu) = ? ORDER BY id DESC LIMIT 1', [date] ,  (err, rows) => {
                // `SELECT * FROM data_antrian WHERE Date(waktu) = "${date}%" ORDER BY id DESC limit 1;`
                connection.release();
                if (!err) {
                    console.log(rows);
                    //see query
                    console.log(rows.sql);
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

const addAntrian = async (req, res, next) => {
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
            var today = new Date();
            var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            console.log(dateTime);
            console.log(req.body)
            // var queryAdd = `INSERT INTO data_antrian (id, counter, counter_kasir, status, status_kasir, waktu, waktu_panggil, waktu_panggil_kasir, existence, existence_kasir) VALUES (${nextId}, 0, 0, 0, 0, '${today_waktu}', "0000-00-00 00:00:00", "0000-00-00 00:00:00", '0', '0');`;
            connection.query('INSERT INTO data_antrian (id, counter, counter_kasir, status, status_kasir, waktu, waktu_panggil, waktu_panggil_kasir, existence, existence_kasir) VALUES (?, 0, 0, 0, 0, ?, "0000-00-00 00:00:00", "0000-00-00 00:00:00", "0", "0");', [req.body.lastId+1,dateTime], (err, rows) => {
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
    getLastCalledAntrian,
    getLastAntrian,
    addAntrian,
}
// Path: server\routes\dataAntrian.js