import React, { useState, useEffect, useReducer, useRef} from "react"
import { useCallback } from "react";
import moment from 'moment';
import io from "socket.io-client";
import '../style/Antrian.css';
import '../style/bootstrap/jumbotron-narrow-monitoring.css';
import {Howl, Howler} from 'howler';
import useSound from 'use-sound';

import satuSound from '../assets/audio/new/1.MP3';
import duaSound from '../assets/audio/new/2.MP3';
import tigaSound from '../assets/audio/new/3.MP3';
import empatSound from '../assets/audio/new/4.MP3';
import limaSound from '../assets/audio/new/5.MP3';
import enamSound from '../assets/audio/new/6.MP3';
import tujuhSound from '../assets/audio/new/7.MP3';
import delapanSound from '../assets/audio/new/8.MP3';
import sembilanSound from '../assets/audio/new/9.MP3';
import ratusSound from '../assets/audio/new/ratus.MP3';
import ribuSound from '../assets/audio/new/ribu.MP3';
import sebelasSound from '../assets/audio/new/sebelas.MP3';
import sepuluhSound from '../assets/audio/new/sepuluh.MP3';
import seratusSound from '../assets/audio/new/seratus.MP3';
import silahkanSound from '../assets/audio/new/silahkan_ke_perawat.MP3';
import belasSound from '../assets/audio/new/belas.MP3';
import puluhSound from '../assets/audio/new/puluh.MP3';

const socket = io.connect("http://localhost:3001/", {
    query: {
        nama: "antrian"
    }
});

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

    const sekarang = () => {
        var puluh = document.getElementsByName("puluh");
        var dua = document.getElementsByName("dua");
        var satu = document.getElementsByName("satu");

        dua[0].click();
        setTimeout(() => {
            // puluh[0].click();
            console.log("first");
            setTimeout(() => {
                console.log("second");
            }, 5000);
        }, 3000);

    }

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
            var perawat = document.getElementsByName("perawat");
            var satu = document.getElementsByName("satu");
            var dua = document.getElementsByName("dua");
            var tiga = document.getElementsByName("tiga");
            var empat = document.getElementsByName("empat");
            var lima = document.getElementsByName("lima");
            var enam = document.getElementsByName("enam");
            var tujuh = document.getElementsByName("tujuh");
            var delapan = document.getElementsByName("delapan");
            var sembilan = document.getElementsByName("sembilan");
            var puluh = document.getElementsByName("puluh");
            var ratus = document.getElementsByName("ratus");
            var ribu = document.getElementsByName("ribu");
            var sebelas = document.getElementsByName("sebelas");
            var sepuluh = document.getElementsByName("sepuluh");
            var seratus = document.getElementsByName("seratus");
            var belas = document.getElementsByName("belas");
            // satu[0].click();
            function beginning(){
                // silahkan[0].play();
                setTimeout(() => {
                    perawat[0].play();
                }, 500);
            }
            // perawat[0].click();
            // x.items().next().value[1].click();
            // x.keys().next().value[1].click();
            // x.values().next().value[1].click();
            // console.log(x);
            if (IdChecker.current !== IdAntrian.current) {
                // IdChecker = dataAntrian.id;
                beginning();
                IdChecker.current = dataAntrian.id;
                if (IdAntrian.current !== 0){
                        switch(IdAntrian.current){
                            case 1:
                                satu[0].click();
                                break;
                            case 2:
                                dua[0].click();
                                break;
                            case 3:
                                tiga[0].click();
                                break;
                            case 4:
                                empat[0].click();
                                break;
                            case 5:
                                lima[0].click();
                                break;
                            case 6:
                                enam[0].click();
                                break;
                            case 7:
                                tujuh[0].click();
                                break;
                            case 8:
                                delapan[0].click();
                                break;
                            case 9:
                                sembilan[0].click();
                                break;
                            case 10:
                                sepuluh[0].click();
                                break;
                            case 11:
                                sebelas[0].click();
                                break;
                            case 12:
                                dua[0].click();
                                belas[0].click();
                                break;
                            case 13:
                                tiga[0].click();
                                belas[0].click();
                                break;
                            case 14:
                                empat[0].click().then(() => {
                                    belas[0].click();
                                });
                                break;
                            case 15:
                                lima[0].click();
                                belas[0].click();
                                break;
                            case 16:
                                enam[0].click();
                                setTimeout(() => {
                                    belas[0].click();
                                }, 1000);
                                break;
                            case 17:
                                tujuh[0].click();
                                setTimeout(() => {
                                    belas[0].click();
                                }, 3000);
                                break;
                            case 18:
                                delapan[0].click();
                                setTimeout(() => {
                                    belas[0].click();
                                }, 3000);
                                break;
                            case 19:
                                sembilan[0].click();
                                belas[0].click();
                                break;
                            case 20:
                                dua[0].click();
                                setTimeout(() => {
                                    puluh[0].click();
                                }, 2000);
                                break;
                            case 21:
                                dua[0].click();
                                setTimeout(() => {
                                    puluh[0].click();
                                }, 2000);
                                setTimeout(() => {
                                    satu[0].click();
                                }, 1800);
                                break;
                            case 22:
                                dua[0].click();
                                puluh[0].click();
                                dua[0].click();
                                break;
                            case 23:
                                dua[0].click();
                                puluh[0].click();
                                tiga[0].click();
                                break;
                            case 24:
                                dua[0].click();
                                puluh[0].click();
                                empat[0].click();
                                break;
                            case 25:
                                dua[0].click();
                                puluh[0].click();
                                lima[0].click();
                                break;
                            default:
                                break;
                        
                        
                    }
                }
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
        // const [play] = useSound(silahkan);
        const [perawat] = useSound(silahkanSound);
        const [satu] = useSound(satuSound);
        const [dua] = useSound(duaSound);
        const [tiga] = useSound(tigaSound);
        const [empat] = useSound(empatSound);
        const [lima] = useSound(limaSound);
        const [enam] = useSound(enamSound);
        const [tujuh] = useSound(tujuhSound);
        const [delapan] = useSound(delapanSound);
        const [sembilan] = useSound(sembilanSound);
        const [sepuluh] = useSound(sepuluhSound);
        const [sebelas] = useSound(sebelasSound);
        const [belas] = useSound(belasSound);
        const [puluh] = useSound(puluhSound);
        const [ratus] = useSound(ratusSound);
        const [seratus] = useSound(seratusSound);

        return (
            <div className="audioPanggilan">
                <button id="sekarang" name="sekarang" className="buttonhidden" onClick={sekarang}>Sekarang</button>
                <button id="perawat" name="perawat" className="buttonhidden" onClick={perawat}>Perawat</button>
                <button id="satu" name="satu" className="buttonhidden" onClick={satu}>satu</button>
                <button id="dua" name="dua" className="buttonhidden" onClick={dua}>dua</button>
                <button id="tiga" name="tiga" className="buttonhidden" onClick={tiga}>tiga</button>
                <button id="empat" name="empat" className="buttonhidden" onClick={empat}>empat</button>
                <button id="lima" name="lima" className="buttonhidden" onClick={lima}>lima</button>
                <button id="enam" name="enam" className="buttonhidden" onClick={enam}>enam</button>
                <button id="tujuh" name="tujuh" className="buttonhidden" onClick={tujuh}>tujuh</button>
                <button id="delapan" name="delapan" className="buttonhidden" onClick={delapan}>delapan</button>
                <button id="sembilan" name="sembilan" className="buttonhidden" onClick={sembilan}>sembilan</button>
                <button id="sepuluh" name="sepuluh" className="buttonhidden" onClick={sepuluh}>sepuluh</button>
                <button id="sebelas" name="sebelas" className="buttonhidden" onClick={sebelas}>sebelas</button>
                <button id="puluh" name="puluh" className="buttonhidden" onClick={puluh}>puluh</button>
                <button id="belas" name="belas" className="buttonhidden" onClick={belas}>belas</button>
                <button id="seratus" name="seratus" className="buttonhidden" onClick={seratus}>seratus</button>
                <button id="ratus" name="ratus" className="buttonhidden" onClick={ratus}>ratus</button>
            </div>   
        )
    }

    // const inputElement = useRef()

    // const playAntrian = (id) => {
    //     perawat({volume: 10});
        
    //     return(
    //     <div className="audioPanggilan">
    //         {/* <button id="satu" name="satu" onClick={satu} ref={inputElement}></button> */}
    //     </div>    
    //     )
    // }

    return (
        <div className="content">
            {PerawatPlay()}
            {/* {playAntrian()} */}
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
			{/* <audio id="perawat" onClick={playPerawat} onCanPlay={ () => { document.getElementById('perawat').play(); } } src="../assets/audio/new/perawat.MP3"></audio> */}
		</div>
            <div className="footer">
            <marquee behaviour="alternate"><p>RS Awal Bros Pekanbaru - Semoga Lekas Sembuh</p></marquee>
            </div>
        </div>
)}

export default Antrian;