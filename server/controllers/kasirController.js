const {db} = require('../models/connDatabase');

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
                            WHERE counter_kasir != 0 AND status != 0 AND existence = '1' AND status_kasir != 0 AND existence_kasir = '1' AND Date(waktu) = '${date}%'
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
            }
            );
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

const getNextAntrian = async (req, res, next) => {
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
            console.log(req.body)

            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            console.log("DATE",date);

            var queryUpdate = `UPDATE data_antrian SET 
                                status_kasir = 2 
                                WHERE id = ${id} AND Date(waktu) LIKE "${date}%";`
            console.log("QUERY UPDATE : ",queryUpdate);
            connection.query(queryUpdate, (err, rows) => {
                if (!err) {
                    console.log(rows);
                    //see query
                    console.log(rows.sql);
                    return;
                } else {
                    console.log(err);
                    console.log(err.sql);
                    return;
                }
            });

            var queryNext = `SELECT * FROM data_antrian WHERE       
                                status != 0 AND 
                                status_kasir = 0 AND 
                                Date(waktu) = "${date}%" AND 
                                existence = '1' 
                            ORDER BY id ASC limit 1;`
            connection.query(queryNext, (err, rows) => {
                connection.release();
                if (!err) {
                    console.log("ROWS",rows);
                    console.log("SINIII",rows[0]);
                    if(rows[0] != null){
                        rows[0].loket = loket;
                        res.send(rows[0]);
                        return;
                    }else{
                        console.log("SINI NGAB");
                        res.send(rowsBackup);
                        return;
                    }
                    return;
                } else {
                    console.log(err);
                    console.log(err.sql);
                    return;
                }
            });
            console.log("PASS THROUGH");
        });
    } catch (error) {
        console.log(error);
        return;
    }
};

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
            console.log(req.body)

            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            console.log("DATE",date);
            var today_panggil = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2)+' '+('0'+today.getHours()).slice(-2)+':'+('0'+today.getMinutes()).slice(-2)+':'+('0'+today.getSeconds()).slice(-2);
            var queryUpdateCurr =  `UPDATE data_antrian SET 
                                        status_kasir = 1, 
                                        counter_kasir = ${loket}, 
                                        waktu_panggil_kasir = "${today_panggil}", 
                                        existence_kasir = '1'  
                                    WHERE id = ${id} AND Date(waktu) LIKE "${date}%";`
            console.log("QUERY UPDATE : ",queryUpdateCurr);
            connection.query(queryUpdateCurr, (err, rows) => {
                connection.release();
                if (!err) {
                    console.log(rows);
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
};
module.exports = {
    getLastCalledAntrian,
    getNextAntrian,
    updateCurrAntrian,
};