import React, { useState, useEffect } from "react"
import { useCallback } from "react";
import moment from 'moment';
import io from "socket.io-client";
import '../style/Antrian.css';
import '../style/bootstrap/jumbotron-narrow-monitoring.css';

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "antrian"
    }
});

function Antrian() {
    const [IdChecker, setIdChecker] = useState(0);
    const [dataAntrian, setDataAntrian] = useState({
        id: "",
        id_da: "",
        counter: "",
        waktu: "",
        status: "",
        waktu_panggil: "",
        existence: ""
    });
    const [dataAntrianKasir, setDataAntrianKasir] = useState({
        id: "",
        id_da: "",
        counter_kasir: "",
        waktu: "",
        status_kasir: "",
        waktu_panggil: "",
        existence: ""
    });

    const [errorStatus, setErrorStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loket, setLoket] = useState([]);

    var [day, setDay] = useState();
    var [time, setTime] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            // console.log(day)
            // console.log(moment().format('hh:mm:ss'));
            setTime(moment().format('hh:mm:ss'));
            console.log(IdChecker, dataAntrian.id)
            if (IdChecker !== dataAntrian.id) {
                // IdChecker = dataAntrian.id;
                setIdChecker(dataAntrian.id);
                alert("Antrian baru telah dipanggil");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        setLoading(true);

        async function getDay(){
            var dateGD = new Date();
            // var dayGD = dateGD.toLocaleString('id', {  weekday: 'long' }); //Langsung jadi Hari lho
            var dayInt = dateGD.getDay();
            if (dayInt == 0) {
                return "Minggu";
            } else if (dayInt == 1) {
                return "Senin";
            } else if (dayInt == 2) {
                return "Selasa";
            } else if (dayInt == 3) {
                return "Rabu";
            } else if (dayInt == 4) {
                return "Kamis";
            } else if (dayInt == 5) {
                return "Jumat";
            } else if (dayInt == 6) {
                return "Sabtu";
            }
        }
        getDay().then((dayx) => {
            console.log(dayx);
            setDay(dayx);
        });

        async function fetchCurrAntrianPerawat() {
            const response = await fetch("http://localhost:3001/perawat/getLastCalledAntrian");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchCurrAntrianPerawat().then((data) => {

            if(data.length === 0){
                console.log('data fetchCurrAntrian kosong');
                console.log(dataAntrian);
                setDataAntrian({
                    id: 0,
                    id_da: 0,
                    counter: 0,
                    waktu: 0,
                    status: 0,
                    waktu_panggil: 0,
                    existence: 0
                });
                console.log(dataAntrian);
                setLoading(false);
                return;
            }else{
                setDataAntrian(data[0]);
                setIdChecker(data[0].id);
                
                console.log(dataAntrian, IdChecker);
                setLoading(false);
                return;
            }
            
        });

        async function fetchCurrAntrianKasir() {  
            const response = await fetch("http://localhost:3001/kasir/getLastCalledAntrian");
            console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        }
        fetchCurrAntrianKasir().then((data) => {
            console.log(data);
            if(data.length === 0){
                console.log("data kosong");
                console.log(dataAntrianKasir);
                setDataAntrianKasir({
                    id: 0,
                    id_da: 0,
                    counter: 0,
                    waktu: 0,
                    status: 0,
                    waktu_panggil: 0,
                    existence: 0
                });
                console.log(dataAntrianKasir);
                setLoading(false);
                return;
            }else{
                setDataAntrianKasir(data[0]);
                setLoading(false);
                return;
            }
        });
        setLoading(false);
        // componentDidMount();
        return () => {
            console.log("cek123", dataAntrian, dataAntrianKasir);
            // componentWillUnmount();
            socket.off("receiveDataClient");
            socket.off("receiveCurrAntrian");
            socket.off("kasir:receiveCurrAntrian");
        }
    }, []);

    useEffect(() => {
        socket.on("receiveToUpdateAntrian" , (data) => {
            console.log("receiveToUpdateAntrian");
            console.log(data);
            setDataAntrian(data);
            dataAntrian.id = data.id;
        });

        socket.on("kasir:receiveToUpdateAntrian" , (data) => {
            console.log("kasir:receiveToUpdateAntrian");
            window.location.reload();
        });
    }, []);

    // });

    return (
        <div className="content">
            <center>
                <div className='row'>
                    <div className="brand-logo"></div>
                    <div className="col-sm">
                        <div className='brand-title'><center>RS Awal Bros Pekanbaru</center></div>
                        <div className='brand-title'><center>Antrian Skrining bla bla</center></div>
                    </div>
                    <div className="float-right" style={{marginRight: '25px', marginTop: '20px'}}>
                         <span className="brand-title" id="clock">{time} WIB</span><br />
                        <span className="brand-title">{day}</span>
                    </div>
                </div>
                <hr className="style-one" />
            </center>
            
            {
                (() => {
                    // if(loket.length === 1){
                    //     return (
                    //         <div className="col-sm-12">
                    //             <center>
                    //                 <div className='1' style={{paddingTop: '20px',paddingBottom: '20px'}}>
                    //                     <h1 style={{fontSize: '500px', fontWeight: 'bold'}}>{dataAntrian.id}</h1>
                    //                     <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                    //                         <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                    //                         SILAKAN KE PERAWAT
                    //                     </button> 
                    //                 </div>
                    //             </center>
                    //         </div>
                    //     )
                    // }else{
                        return (
                            <div className="row loket">
                            <div className="col-sm-6">
                                <center>
                                    <div className='1' style={{paddingTop: '20px',paddingBottom: '20px'}}>
                                        <h1 style={{fontSize: '400px'}}>{dataAntrian.id}</h1>
                                        <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                                            <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                                            SILAKAN KE PERAWAT
                                        </button> 
                                    </div>
                                </center>
                            </div>
                            <div className="col-sm-6">
                            <center>
                                <div className='1' style={{paddingTop: '20px',paddingBottom: '20px'}}>
                                    <h1 style={{fontSize: '400px'}}>{dataAntrianKasir.id}</h1>
                                    <button style={{fontSize: '60px', fontWeight: 'bold', background: 'green', color: 'white'}} className="btn btn-sm" type="button">
                                        <span className="glyphicon glyphicon-modal-window">&nbsp;</span>
                                        SILAKAN KE KASIR
                                    </button> 
                                </div>
                            </center>
                        </div>
                        </div>
                        )
                    // }
                })()
            }  
		
		<div className="audio">
			<audio id="in" src="<?= base_url(); ?>/assets/audio/new/in.wav"></audio>
			<audio id="out" src="<?= base_url(); ?>/assets/audio/new/out.wav"></audio>
			<audio id="suarabel" src="<?= base_url(); ?>/assets/audio/new/Airport_Bell.mp3"></audio>
			<audio id="suarabelnomorurut" src="<?= base_url(); ?>/assets/audio/new/nomor-urut.MP3"></audio>
			<audio id="suarabelsuarabelloket" src="<?= base_url(); ?>/assets/audio/new/konter.MP3"></audio>
			<audio id="belas" src="<?= base_url(); ?>/assets/audio/new/belas.MP3"></audio>
			<audio id="sebelas" src="<?= base_url(); ?>/assets/audio/new/sebelas.MP3"></audio>
			<audio id="puluh" src="<?= base_url(); ?>/assets/audio/new/puluh.MP3"></audio>
			<audio id="sepuluh" src="<?= base_url(); ?>/assets/audio/new/sepuluh.MP3"></audio>
			<audio id="ratus" src="<?= base_url(); ?>/assets/audio/new/ratus.MP3"></audio>
			<audio id="seratus" src="<?= base_url(); ?>/assets/audio/new/seratus.MP3"></audio>
			<audio id="suarabelloket1" src="<?= base_url(); ?>/assets/audio/new/1.MP3"></audio>
			<audio id="suarabelloket2" src="<?= base_url(); ?>/assets/audio/new/2.MP3"></audio>
			<audio id="suarabelloket3" src="<?= base_url(); ?>/assets/audio/new/3.MP3"></audio>
			<audio id="suarabelloket4" src="<?= base_url(); ?>/assets/audio/new/4.MP3"></audio>
			<audio id="suarabelloket5" src="<?= base_url(); ?>/assets/audio/new/5.MP3"></audio>
			<audio id="suarabelloket6" src="<?= base_url(); ?>/assets/audio/new/6.MP3"></audio>
			<audio id="suarabelloket7" src="<?= base_url(); ?>/assets/audio/new/7.MP3"></audio>
			<audio id="suarabelloket8" src="<?= base_url(); ?>/assets/audio/new/8.MP3"></audio>
			<audio id="suarabelloket9" src="<?= base_url(); ?>/assets/audio/new/9.MP3"></audio>
			<audio id="suarabelloket10" src="<?= base_url(); ?>/assets/audio/new/sepuluh.MP3"></audio>
			{/* <audio id="loket" src="<?= base_url(); ?>/assets/audio/new/loket.MP3"></audio> --> */}
			<audio id="perawat" src="<?= base_url(); ?>/assets/audio/new/silahkan_ke_perawat.MP3"></audio>
		</div>
            <div className="footer">
            <marquee behaviour="alternate"><p>RS Awal Bros Pekanbaru - Semoga Lekas Sembuh</p></marquee>
            </div>
        </div>
)}

export default Antrian;