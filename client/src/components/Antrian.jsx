import React, { useState, useEffect, useReducer, useRef} from "react"
import { useCallback } from "react";
import moment from 'moment';
import io from "socket.io-client";
import '../style/Antrian.css';
import '../style/bootstrap/jumbotron-narrow-monitoring.css';
import {Howl, Howler} from 'howler';
import useSound from 'use-sound';

import satu from '../assets/audio/new/1.MP3';
import dua from '../assets/audio/new/2.MP3';
import tiga from '../assets/audio/new/3.MP3';
import empat from '../assets/audio/new/4.MP3';
import lima from '../assets/audio/new/5.MP3';
import enam from '../assets/audio/new/6.MP3';
import tujuh from '../assets/audio/new/7.MP3';
import delapan from '../assets/audio/new/8.MP3';
import sembilan from '../assets/audio/new/9.MP3';
// import puluh from ' ../assets/audio/new/puluh.MP3';
import ratus from '../assets/audio/new/ratus.MP3';
import ribu from '../assets/audio/new/ribu.MP3';
import sebelas from '../assets/audio/new/sebelas.MP3';
import sepuluh from '../assets/audio/new/sepuluh.MP3';
import seratus from '../assets/audio/new/seratus.MP3';
import silahkan from '../assets/audio/new/silahkan_ke_perawat.MP3';

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "antrian"
    }
});

const audoClips = [
    {sound: satu, label: 'satu'},
    {sound: dua, label: 'dua'},
    {sound: tiga, label: 'tiga'},
    {sound: empat, label: 'empat'},
    {sound: lima, label: 'lima'},
    {sound: enam, label: 'enam'},
    {sound: tujuh, label: 'tujuh'},
    {sound: delapan, label: 'delapan'},
    {sound: sembilan, label: 'sembilan'},
    // {sound: puluh, label: 'puluh'},
    {sound: ratus, label: 'ratus'},
    {sound: ribu, label: 'ribu'},
    {sound: sebelas, label: 'sebelas'},
    {sound: sepuluh, label: 'sepuluh'},
    {sound: seratus, label: 'seratus'},
    {sound: silahkan, label: 'silahkan'},
]

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

function Antrian() {

    // const [IdChecker, setIdChecker] = useState(0);
    let IdChecker = useRef(0);
    // const [IdAntrian, setIdAntrian] = useReducer(reducer, 0);
    let IdAntrian = useRef(0);
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

    const [satu] = useSound('../assets/audio/new/1.MP3');
    const [dua] = useSound('../assets/audio/new/2.MP3');
    const [tiga] = useSound('../assets/audio/new/3.MP3');
    const [empat] = useSound('../assets/audio/new/4.MP3');
    const [lima] = useSound('../assets/audio/new/5.MP3');
    const [enam] = useSound('../assets/audio/new/6.MP3');
    const [tujuh] = useSound('../assets/audio/new/7.MP3');
    const [delapan] = useSound('../assets/audio/new/8.MP3');
    const [sembilan] = useSound('../assets/audio/new/9.MP3');
    const [sepuluh] = useSound('../assets/audio/new/sepuluh.MP3');
    // const [sebelas] = useSound(sebelas);
    const [belas] = useSound('../assets/audio/new/belas.MP3');
    
    const [puluh] = useSound('../assets/audio/new/puluh.MP3');

    useEffect(() => {
        const interval = setInterval(() => {
            
            // console.log(day)
            // console.log(moment().format('hh:mm:ss'));
            setTime(moment().format('hh:mm:ss'));
            console.log(IdChecker, IdAntrian.current)
            // dispa
            // async function fetchCurrAntrianPerawat() {
            //     const response = await fetch("http://localhost:3001/perawat/getLastCalledAntrian");
            //     console.log(response);
            //     const data = await response.json();
            //     console.log(data);
            //     return data;
            // }
            // fetchCurrAntrianPerawat().then((data) => {
            //     if(data.id > dat)
            // perawat.apply(this, audoClips);
            if (IdChecker.current !== IdAntrian.current) {
                // IdChecker = dataAntrian.id;
                IdChecker.current = dataAntrian.id;
                
                // usePlaySound(dataAntrian.id);
                if(IdAntrian.current === 1){
                    satu();
                }else if(IdAntrian.current === 2){
                    dua();
                }else if(IdAntrian.current === 3){
                    tiga();
                }else if(IdAntrian.current === 4){
                    empat();
                }else if(IdAntrian.current === 5){
                    lima();
                }else if(IdAntrian.current === 6){
                    enam();
                }else if(IdAntrian.current === 7){
                    tujuh();
                }else if(IdAntrian.current === 8){
                    delapan();
                }else if(IdAntrian.current === 9){
                    sembilan();
                }else if(IdAntrian.current === 10){
                    sepuluh();
                }else if(IdAntrian.current === 11){
                    sebelas();
                }else if(IdAntrian.current === 12){
                    dua();
                    belas();
                }else if(IdAntrian.current === 13){
                    tiga();
                    belas();
                }else if(IdAntrian.current === 14){
                    empat();
                    belas();
                }else if(IdAntrian.current === 15){
                    lima();
                    belas();
                }else if(IdAntrian.current === 16){
                    enam();
                    belas();
                }else if(IdAntrian.current === 17){
                    tujuh();
                    belas();
                }else if(IdAntrian.current === 18){
                    delapan();
                    belas();
                }else if(IdAntrian.current === 19){
                    sembilan();
                    belas();
                }else if(IdAntrian.current === 20){
                    dua();
                    puluh();
                }else if(IdAntrian.current === 21){
                    dua();
                    puluh();
                    satu();
                }
                // alert("Antrian baru telah dipanggil");
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
                // setIdChecker(data[0].id);
                IdChecker.current = data[0].id;
                // setIdAntrian(data[0].id);
                IdAntrian.current = data[0].id;
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
            // setIdAntrian(data.id);
            IdAntrian.current = data.id;
        });

        socket.on("kasir:receiveToUpdateAntrian" , (data) => {
            console.log("kasir:receiveToUpdateAntrian");
            window.location.reload();
        });
    }, []);

    const PerawatPlay = () => {
        const [play] = useSound(silahkan);
        const [perawat] = useSound(silahkan);
        return <button onClick={perawat}>Perawat</button>
    }

    // });

    return (
        <div className="content">
            {PerawatPlay()}
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
			<audio id="suarabel" src="<?= base_url(); ?>/assets/audio/new/Airport_Bell.MP3"></audio>
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
			<audio id="perawat" src="../assets/audio/new/silahkan_ke_perawat.MP3"></audio>
		</div>
            <div className="footer">
            <marquee behaviour="alternate"><p>RS Awal Bros Pekanbaru - Semoga Lekas Sembuh</p></marquee>
            </div>
        </div>
)}

export default Antrian;