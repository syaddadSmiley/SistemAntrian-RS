const bodyParser = require("body-parser");
// import perawatRoutes from "./routes/perawatRoutes.js";
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const mysql = require('mysql');

const {database} = require('./config/helpers');
const { query } = require('express');
const { callbackify } = require('util');
const { isGeneratorFunction } = require('util/types');
const { exec } = require("child_process");


const dataRoutes = require('./routes/dataAntrian');
const loketRoutes = require('./routes/loketRoutes');
const perawatRoutes = require('./routes/perawatRoutes');
const kasirRoutes = require('./routes/kasirRoutes');

// const nurseOrderHandlers = require("./handlers/perawatHandler")

//Setting up server
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        accessControlAllowOrigin: '*',
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS']
    },
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// const onConnection = (socket) => {
//     socket.on("order:create", createOrder);
//     socket.on("tesRead", readOrder);
// }

// io.on("connection", onConnection)
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
io.on("connection", (socket) => {
    function accessDatabase(query, toSocket, toBroadcast){
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'test-socket'
            });
            console.log("QUERYY : ",query);
            connection.query(query, function (error, results, fields) {
                if (error) {
                    console.log("accesDatabase : ", error);
                    return error;
                }
                if(toSocket){
                    socket.emit(toSocket, results);
                }
                if(toBroadcast){
                    socket.broadcast.emit(toBroadcast, results);
                }
                resolve(results);
                connection.end();
            });
        });
    }
    
    console.log(`${socket.client.conn.listenerCount()} New client connected : ${socket.id} \nTime: ${new Date().toLocaleString()}\nIp Address: ${socket.handshake.address}\nTransport: ${socket.handshake.query.nama}\nUser-agent: ${socket.handshake.headers['user-agent'].slice(0, 50)}\n`);

    socket.on("sendData", (data) => {
        console.log("test", data);
        socket.broadcast.emit("receiveData", data);
    });

    socket.on("askCurrAntrian", (data) => {
        console.log("data", data)

        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
        console.log("DATE",date);
        var query = `SELECT * FROM data_antrian 
                        WHERE Date(waktu) = '${date}%' AND counter != 0 AND status != 0
                        ORDER BY id ASC LIMIT 1 `;

        // var result = accessDatabase(query, "receiveCurrAntrian","receiveCurrAntrian");
        accessDatabase(query, "receiveCurrAntrian","receiveCurrAntrian").then((result) => {
            console.log("dari function askCurrAntrian", result);
            console.log("Result: " + result);
        }).catch((err) => {
            console.log("Error: " + err);
            socket.emit("receiveCurrAntrian", {"Error":err});
        });
    });

    socket.on("kasir:askCurrAntrian", (data) => {
        console.log("data", data)

        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
        console.log("DATE",date);
        var query = `SELECT * FROM data_antrian
                        WHERE Date(waktu) = '${date}%' AND counter_kasir != 0 AND status != 0 AND existence = '1' AND status_kasir != 0 AND existence_kasir = '1'
                        ORDER BY id ASC LIMIT 1 `;

        accessDatabase(query, "kasir:receiveCurrAntrian","kasir:receiveCurrAntrian").then((result) => {
            console.log("dari function kasir:askcurrAntrian", result);
            console.log("Result: " + result);
        }).catch((err) => {
            console.log("Error: " + err);
            socket.emit("kasir:receiveCurrAntrian", {"Error":err});
        });
    });

    socket.on("askDataClient", (data) => {
        console.log("data", data)  
        var sql = `SELECT * FROM client_antrian ORDER BY id ASC`;
        accessDatabase(sql, "receiveDataClient", "receiveDataClient").then((result) => {
            console.log("RESULT", result, "\n\n");
        }).catch((err) => {
            console.log("ERROR", err);
            socket.emit("receiveDataClient", {"Error":err});
            return;
        });
    });

    socket.on("askNextAntrian", (data) => {
        console.log('WWWWWWW',data);
        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
        console.log("DATE",date);

        if(data.message == "setCurrStatus=2"){
            var queryUpdateCurr = `UPDATE data_antrian SET status = 2 WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
            accessDatabase(queryUpdateCurr, '', '').then((result) => {
                console.log("Result: " + result, "\n\n"); 
                return
            }).catch((err) => {
                console.log("Error: " + err);
                socket.emit("receiveNextAntrian", {"Error":err});
                return;
            });
        }
        
        
        var queryNext = `SELECT * FROM data_antrian WHERE status = 0 AND Date(waktu) = "${date}%" ORDER BY id ASC limit 1;`;
        accessDatabase(queryNext, 'receiveNextAntrian', 'receiveNextAntrian').then((result) => {
            console.log("Result: " + result, "\n\n");
            return
        }).catch((err) => {
            console.log("Error: " + err);
            socket.emit("receiveNextAntrian", {"Error":err});
            return;
        });

    });

    socket.on("kasir:askNextAntrian", (data) => {
        console.log('WWWWWWW',data);
        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);

        if (data.message == "setCurrStatus=2"){
            var queryUpdateCurr = `UPDATE data_antrian SET status_kasir = 2 WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
            accessDatabase(queryUpdateCurr, '', '').then((result) => {
                console.log("Result: " + result, "\n\n");
                return
            }).catch((err) => {
                console.log("Error: " + err);
                socket.emit("kasir:receiveCurrAntrian", {"Error":err});
                return;
            });
        }
        

        var queryNext = `SELECT * FROM data_antrian WHERE status != 0 AND status_kasir = 0 AND Date(waktu) = "${date}%" AND existence = '1' ORDER BY id ASC limit 1;`;
        accessDatabase(queryNext, 'kasir:receiveNextAntrian', 'kasir:receiveNextAntrian').then((result) => {
            console.log("Result: " + result, "\n\n");
            return
        }).catch((err) => {
            console.log("Error: " + err);
            socket.emit("kasir:receiveNextAntrian", {"Error":err});
            return;
        });

    });

    socket.on("askToBroadcast", (data) => {
        console.log("dari AskToBroadcast", data);
        socket.broadcast.emit(data.toBroadcast, data.data)
    });

    socket.on("changeStatusAntrian", (data) => {
        console.log("CHANGEEEEEEEE prwt", data);
        if (data.counter === 0){
            console.log('KENAPAA')
            return;
        }else{
            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            console.log("DATE",date);
            var today_panggil = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            var queryUpdateCurr = `UPDATE data_antrian SET status = 1, counter = ${data.counter}, waktu_panggil = "${today_panggil}", existence = '1'  WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
            accessDatabase(queryUpdateCurr, '', '');
        }
    });

    socket.on("kasir:changeStatusAntrian", (data) => {
        console.log("CHANGEEEEEEEE kasir", data);
        if (data.counter === 0){
            console.log('KENAPAA')
            return;
        }else{
            var today = new Date();
            var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
            console.log("DATE",date);
            var today_panggil = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            var queryUpdateCurr = `UPDATE data_antrian SET status_kasir = 1, counter_kasir = ${data.counter}, waktu_panggil_kasir = "${today_panggil}", existence_kasir = '1'  WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
            accessDatabase(queryUpdateCurr, '', '');
        }
    });

    socket.on("changeNoExistence", (data) => {
        console.log("data Existence", data);
        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
        console.log("DATE",date);

        if (data.message == "kasirNoExistence"){
            var queryUpdateCurr = `UPDATE data_antrian SET existence_kasir = '0' WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
            accessDatabase(queryUpdateCurr, '', '').then((result) => {
                console.log("Result: " + result, "\n\n");
                return
            }).catch((err) => {
                console.log("Error: " + err);
                socket.emit("kasir:receiveCurrAntrian", {"Error":err});
                return;
            });

        }else{
            var queryUpdateCurr = `UPDATE data_antrian SET existence = '0' WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
            accessDatabase(queryUpdateCurr, '', '').then((result => {
                console.log("Result: " + result, "\n\n");
                return
            })).catch((err) =>{
                console.log("Error: " + err);
                socket.emit("receiveCurrAntrian", {"Error":err});
                return;
            });
        }
    });

    socket.on("cetak:askLastAntrian", (data) => {
        console.log("cetak:askLastAntrian", data);
        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
        var queryLast = `SELECT * FROM data_antrian WHERE Date(waktu) = "${date}%" ORDER BY id DESC limit 1;`;
        accessDatabase(queryLast, 'cetak:receiveLastAntrian', 'cetak:receiveLastAntrian').then((result) => {
            console.log("Result AskLastAntrian: " + result, "\n\n");
            return
        }).catch((err) => {
            console.log("Error: " + err);
            socket.emit("cetak:receiveLastAntrian", {"Error":err});
            return;
        });
    });

    socket.on("cetak:addAntrian", (data) => {
        console.log("cetak:addAntrian", data);
        var today = new Date();
        var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
        var today_waktu = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
        var nextId = data.lastId + 1;
        console.log("NEXT ID", nextId);
        var queryAdd = `INSERT INTO data_antrian (id, counter, counter_kasir, status, status_kasir, waktu, waktu_panggil, waktu_panggil_kasir, existence, existence_kasir) VALUES (${nextId}, 0, 0, 0, 0, '${today_waktu}', "0000-00-00 00:00:00", "0000-00-00 00:00:00", '0', '0');`;
        accessDatabase(queryAdd, 'cetak:receiveAddAntrian', 'cetak:receiveAddAntrian').then((result) => {
            console.log("Result AddAntrian: " + result, "\n\n");
            return
        }).catch((err) => {
            console.log("Error: " + err);
            socket.emit("cetak:receiveAddAntrian", {"Error":err});
            return;
        });
    });

    socket.on("askToUpdateAntrian", (data) => {
        socket.broadcast.emit("receiveToUpdateAntrian", data);
    });
    socket.on("kasir:askToUpdateAntrian", (data) => {
        socket.broadcast.emit("kasir:receiveToUpdateAntrian", data);
    });

    socket.on("sendUlangiPanggilan", (data) => {
        socket.broadcast.emit("receiveUlangiPanggilan", data);
    });
    socket.on("kasir:sendUlangiPanggilan", (data) => {
        socket.broadcast.emit("kasir:receiveUlangiPanggilan", data);
    });

        
});


// program().then();
app.use(bodyParser.json());

app.use('/antrian', dataRoutes);
app.use('/loket', loketRoutes);
app.use('/perawat', perawatRoutes);
app.use('/kasir', kasirRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.all("*", (req, res) => {
    res.send("Page Not Found, CARI YANG LAIN HAIAA");
});

server.listen(3001, 'localhost', () => {
    console.log('Server running on port 3001');
})





