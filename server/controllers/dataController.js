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

/**
*
*  JavaScript string pad
*  http://www.webtoolkit.info/
*
**/

var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function pad(str, len, pad, dir) {

    if (typeof(len) == "undefined") { var len = 0; }
    if (typeof(pad) == "undefined") { var pad = ' '; }
    if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }

    if (len + 1 >= str.length) {

        switch (dir){

            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
            break;

            case STR_PAD_BOTH:
                var padlen = len - str.length;
                var right = Math.ceil( padlen / 2 );
                var left = padlen - right;
                str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
            break;

            default:
                str = str + Array(len + 1 - str.length).join(pad);
            break;

        } // switch

    }

    return str;
}

const getCetakAntrian = async (req, res, next) => {
    try {
        let tmp = new Date().getTime('siHdm');
        var today = new Date();
        var date = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date + ' ' + time;

        const reqParamId = req.params.id;
        const reqParamLoket = req.params.loket;
        // const glbData = `
        // ${String.fromCharCode(27), String.fromCharCode(97), String.fromCharCode(1)}
        // ${pad('RS Awal Bros Pekanbaru', 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // ${pad(tgl, 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // ${pad('Antrian '+reqParamLoket+' Zona 2', 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // ${String.fromCharCode(27), String.fromCharCode(33), String.fromCharCode(48)}
        // ${String.fromCharCode(27), String.fromCharCode(69), String.fromCharCode(1)}
        // ${pad('No. Antrian', 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // ${String.fromCharCode(27), String.fromCharCode(69), String.fromCharCode(0)}
        // ${String.fromCharCode(27), String.fromCharCode(33), String.fromCharCode(32)}
        // ${pad(reqParamId, 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // ${String.fromCharCode(27), String.fromCharCode(33), String.fromCharCode(0)}
        // ${pad('Silahkan Menunggu Antriannya', 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // ${pad('Terima Kasih', 35, " ", STR_PAD_BOTH), pad('',1," ", STR_PAD_RIGHT), "\n"}
        // `
        // let RSAB = pad('RS Awal Bros Pekanbaru', 35, " ", STR_PAD_BOTH);
        // let padRight = pad('', 1, " ", STR_PAD_RIGHT);
        let glbData = ""
        glbData += String.fromCharCode(27) + String.fromCharCode(97) + String.fromCharCode(1)
        glbData += ''+pad('RS Awal Bros Pekanbaru', 35, " ", STR_PAD_BOTH)+pad('',1," ", STR_PAD_RIGHT)+ " \n"
        glbData += '' +pad(dateTime, 35, " ", STR_PAD_BOTH)+pad('',1," ", STR_PAD_RIGHT)+ " \n"
        glbData += '' +pad('Antrian Zona 2', 35, " ", STR_PAD_BOTH)+pad('',1," ", STR_PAD_RIGHT)+ " \n"
        glbData += String.fromCharCode(27)+ String.fromCharCode(33)+ String.fromCharCode(48)
        glbData += String.fromCharCode(27)+ String.fromCharCode(69)+ String.fromCharCode(1)
        glbData += pad('No. Antrian', 35, " ", STR_PAD_BOTH)+pad('',1," ", STR_PAD_RIGHT)+ " \n"
        glbData += String.fromCharCode(27)+ String.fromCharCode(69)+ String.fromCharCode(0)
        glbData += String.fromCharCode(27)+ String.fromCharCode(33)+ String.fromCharCode(32)
        glbData += pad(reqParamId, 35, " ", STR_PAD_BOTH)+ pad('',1," ", STR_PAD_RIGHT)+ " \n"
        glbData += String.fromCharCode(27)+ String.fromCharCode(33)+ String.fromCharCode(0)
        glbData += pad('Silahkan Menunggu Antrian', 35, " ", STR_PAD_BOTH)+ pad('',1," ", STR_PAD_RIGHT)+ " \n"
        glbData += pad('Terima Kasih', 35, " ", STR_PAD_BOTH)+ pad('',1," ", STR_PAD_RIGHT)+ " \n"

        console.log(glbData);
        await res.writeHead(200, {
            'Content-Type': 'application/x-download',
            'Content-Disposition': 'inline; filename=antrian' + tmp + '.glb',
            'Cache-Control': 'private, max-age=0, must-revalidate',
            'Pragma': 'public',
        });
        res.end(glbData);
    } catch (error) {
        console.log(error);
        return;
    }
};

module.exports = {
    getLastCalledAntrian,
    getLastAntrian,
    addAntrian,
    getCetakAntrian,
}
// Path: server\routes\dataAntrian.js