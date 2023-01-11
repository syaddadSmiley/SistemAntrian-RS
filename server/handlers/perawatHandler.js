const e = require("express");

module.exports = (io, socket) => {
   const {database} = require("../config/helpers")

    const createOrder = function (payload) {
      const socket = this; // hence the 'function' above, as an arrow function will not work
      console.log("tessWVDDDDDDD");
    };
  
    const readOrder = function (orderId, callback) {
      console.log("readOrder", orderId, callback);
    };

    const ns_nextAntrian = function (payload){
      console.log('WWWWWWWxxx',payload);

      var today = new Date();
      var date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0'+today.getDate()).slice(-2);
      console.log("DATE",date);

      var queryUpdateCurr = `UPDATE data_antrian SET status = 2 WHERE id = ${payload.id} AND Date(waktu) LIKE "${date}%";`
      database.query(queryUpdateCurr, function(err, result){
        if(err){
          console.log("ERROR",err);
          return;
        }else{
          console.log("RESULTqueryUpdateCurr\n\n", result);
        }
      });

      
      var queryNext = `SELECT * FROM data_antrian WHERE status = 0 AND Date(waktu) = "${date}%" ORDER BY id ASC limit 1;`;
      database.query(queryNext, function(err, result){    
        if(err){
          console.log("ERROR",err);
          return;
        }else{
          socket.emit("receiveCurrentAntrian", result);
          console.log("RESULTqueryNext\n\n", result);
          socket.broadcast.emit("receiveCurrentAntrian", result);
        }
      });
    };

  //   socket.on("nurse:nextAntrian", (data) => {
  //     console.log('WWWWWWW',data);
  //     var today = new Date();
  //         var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //         console.log(date);

  //     var queryUpdateCurr = `UPDATE data_antrian SET status = 2 WHERE id = ${data.id} AND Date(waktu) LIKE "${date}%";`
  //     accessDatabase(queryUpdateCurr, '', '').then((result) => {
  //         console.log("Result: " + result, "\n\n"); 
  //         return
  //     }).catch((err) => {
  //         console.log("Error: " + err);
  //         socket.emit("receiveCurrAntrian", {"Error":err});
  //         return;
  //     });
      
  //     var queryNext = `SELECT * FROM data_antrian WHERE status = 0 AND Date(waktu) = "${date}%" ORDER BY id ASC limit 1;`;
  //     accessDatabase(queryNext, 'receiveCurrAntrian', 'receiveCurrAntrian').then((result) => {
  //         console.log("Result: " + result, "\n\n");
  //         return
  //     }).catch((err) => {
  //         console.log("Error: " + err);
  //         socket.emit("receiveCurrAntrian", {"Error":err});
  //         return;
  //     });

  // });
    
    socket.on("nurse:nextAntrian", ns_nextAntrian);
    socket.on("order:create", createOrder);
    socket.on("order:read", readOrder);
}