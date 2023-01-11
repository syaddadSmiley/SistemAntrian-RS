const { query } = require('express');
const { db } = require('../models/connDatabase');
const { connect } = require('../routes/dataAntrian');

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

            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            console.log("DATE",date);
            var query = `SELECT * FROM data_antrian 
                            WHERE Date(waktu) = '${date}%' AND counter != 0 AND status != 0
                            ORDER BY id DESC LIMIT 1 `;
            console.log("QUERY : ",query);
            connection.query(query, (err, rows) => {
                connection.release();
                if (!err) {
                    console.log(rows);
                    //see query
                    console.log(rows.sql);
                    res.send(rows);
                } else {
                    console.log(err);
                    console.log(err.sql);
                    return;
                }
            });
        });
    } catch (error) {
        console.log(error);
        return;
    }
}

const getNextAntrian = async (req, res, next) => {
    var idAfterGet = 0;
    var rowsBackup = req.body.rowsBackup;
    console.log("rowsbackup",rowsBackup);
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

            var id = req.body.id;
            var loket = req.body.loket;
            console.log(req.body);

            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2)+"%";
            console.log("DATE",date);

            var queryUpdate = `UPDATE data_antrian 
                                SET status = 2 
                                WHERE id = ? AND Date(waktu) LIKE ?%;`
            console.log("QUERY UPDATE : ",queryUpdate);
            connection.query('UPDATE data_antrian SET status = 2, existence = \'1\' WHERE id = ? AND Date(waktu) LIKE ?;', [id, date], (err, rows) => {
                if (!err) {
                    console.log("ROWS", rows);
                    //see query
                    console.log(rows.sql);
                    return;
                } else {
                    console.log(err);
                    console.log(err.sql);
                    return;
                }
            });
            console.log("SAMPAI SINI 223");
            var query = `SELECT * FROM data_antrian
                            WHERE status = 0 AND Date(waktu) = "?%"
                            ORDER BY id ASC LIMIT 1 `;
            console.log("QUERY : ",query);
            connection.query('SELECT * FROM data_antrian WHERE status = 0 AND Date(waktu) = ? ORDER BY id ASC LIMIT 1', [date], (err, rows) => {
                // connection.release();
                if (!err) {
                    console.log("ROWS",rows);
                    //see query
                    console.log("SINIII",rows[0]);
                    if(rows[0] != null){
                        rows[0].loket = loket;
                        res.send(rows[0]);
                    }else{
                        console.log("SINI NGAB");
                        res.send(rowsBackup);
                    }
                    return;
                } else {    
                    console.log(err);
                    console.log(err.sql);
                    return;
                }
                
            });

            // var today = new Date();
            // var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            // console.log("DATE",date);
            // var today_panggil = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            // var queryUpdateCurr = `UPDATE data_antrian 
            //                     SET status = 1, 
            //                         counter = ${loket}, 
            //                         waktu_panggil = "${today_panggil}", 
            //                         existence = '1'  
            //                     WHERE id = ${idAfterGet} AND Date(waktu) LIKE "${date}%";`
            // connection.query(queryUpdateCurr, (err, rows) => {
            //     connection.release();
            //     if (!err) {
            //         console.log("ROWS", rows);
            //         //see query
            //         console.log(rows.sql);
            //         return;
            //     } else {
            //         console.log(err);
            //         console.log(err.sql);
            //         return;
            //     }
            // });


            
            console.log("PASS TROUGH")
        });
    } catch (error) {
        console.log("IYAKAH", error);
        return;
    }
}

const updateCurrAntrian = async (req, res, next) => {
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

            var id = req.body.id;
            var loket = req.body.loket;
            console.log(req.body);

            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            console.log("DATE",date);
            var today_panggil = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            var queryUpdateCurr = `UPDATE data_antrian 
                                SET status = 1, 
                                    counter = ${loket}, 
                                    waktu_panggil = "${today_panggil}", 
                                    existence = '1'  
                                WHERE id = ${id} AND Date(waktu) LIKE "${date}%";`
            connection.query(queryUpdateCurr, (err, rows) => {
                connection.release();
                if (!err) {
                    console.log("ROWS", rows);
                    //see query
                    console.log(rows.sql);
                    res.send(rows);
                    return;
                } else {
                    console.log(err);
                    console.log(err.sql);
                    return;
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error Internal Server',
            error: error
        });
        return;
    }
}

module.exports = {
    getLastCalledAntrian,
    getNextAntrian,
    updateCurrAntrian,
};