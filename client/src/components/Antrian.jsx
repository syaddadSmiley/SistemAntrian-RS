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
import bellFirstSound from '../assets/audio/new/Airport_Bell_First.mp3';
import bellSecondSound from '../assets/audio/new/Airport_Bell_Second.mp3';
import nomorUrutSound from '../assets/audio/new/nomor-urut.MP3';

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
    const [bellFirst] = useSound(bellFirstSound);
    const [bellSecond] = useSound(bellSecondSound);
    const [nomorUrut] = useSound(nomorUrutSound);

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
        }, 4500);

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
            var bellFirst = document.getElementsByName("bellFirst");
            var bellSecond = document.getElementsByName("bellSecond");
            var nomorUrut = document.getElementsByName("nomorUrut");
            // satu[0].click();
            function beginning(){
                // silahkan[0].play();
                bellFirst[0].click();
                setTimeout(() => {
                    nomorUrut[0].click();
                }, 3250);
            }
            function theEnd(){
                // silahkan[0].play();
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2000);
                }, 5500);
            }
            function theEnd2(){
                // silahkan[0].play();
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2000);
                }, 6500);
            }
            function theEnd3(){
                // silahkan[0].play();
                setTimeout(() => {
                    perawat[0].click();
                    setTimeout(() => {
                        bellSecond[0].click();
                    }, 2000);
                }, 7500);
            }

            function duaPuluh(){
                setTimeout(() => {
                    dua[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function tigaPuluh(){
                setTimeout(() => {
                    tiga[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function empatPuluh(){
                setTimeout(() => {
                    empat[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }   
            function limaPuluh(){
                setTimeout(() => {
                    lima[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function enamPuluh(){
                setTimeout(() => {
                    enam[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function tujuhPuluh(){
                setTimeout(() => {
                    tujuh[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function delapanPuluh(){
                setTimeout(() => {
                    delapan[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
            }
            function sembilanPuluh(){
                setTimeout(() => {
                    sembilan[0].click();
                    setTimeout(() => {
                        puluh[0].click();
                    }, 1000);
                }, 4500);
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
                                setTimeout(() => {
                                    satu[0].click();
                                }, 4500);
                                break;
                            case 2:
                                setTimeout(() => {
                                dua[0].click();
                                }, 4500);
                                break;
                            case 3:
                                setTimeout(() => {
                                tiga[0].click();
                                }, 4500);
                                break;
                            case 4:
                                setTimeout(() => {
                                empat[0].click();
                                }, 4500);
                                break;
                            case 5:
                                setTimeout(() => {
                                lima[0].click();
                                }, 4500);
                                break;
                            case 6:
                                setTimeout(() => {
                                enam[0].click();
                                }, 4500);
                                break;
                            case 7:
                                setTimeout(() => {
                                tujuh[0].click();
                                }, 4500);
                                break;
                            case 8:
                                setTimeout(() => {
                                delapan[0].click();
                                }, 4500);
                                break;
                            case 9:
                                setTimeout(() => {
                                sembilan[0].click();
                                }, 4500);
                                break;
                            case 10:
                                setTimeout(() => {
                                sepuluh[0].click();
                                }, 4500);
                                break;
                            case 11:
                                setTimeout(() => {
                                sebelas[0].click();
                                }, 4500);
                                break;
                            case 12:
                                setTimeout(() => {
                                    dua[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 13:
                                setTimeout(() => {
                                    tiga[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 14:
                                setTimeout(() => {
                                    empat[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 15:
                                setTimeout(() => {
                                    lima[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 16:
                                setTimeout(() => {
                                    enam[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 17:
                                setTimeout(() => {
                                    tujuh[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 18:
                                setTimeout(() => {
                                    delapan[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                                break;
                            case 19:
                                setTimeout(() => {
                                    sembilan[0].click();
                                    setTimeout(() => {
                                        belas[0].click();
                                    }, 1000);
                                }, 4500);
                            case 20:
                                duaPuluh();
                                break;
                            case 21:
                                duaPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 1000);
                                break;
                            case 22:
                                duaPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 23:
                                duaPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 24:
                                duaPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 25:
                                duaPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 26:
                                duaPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 27:
                                duaPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 28:
                                duaPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 29:
                                duaPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 30:
                                tigaPuluh();
                                break;
                            case 31:
                                tigaPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 6500);
                                break;
                            case 32:
                                tigaPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 33:
                                tigaPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 34:
                                tigaPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 35:
                                tigaPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 36:
                                tigaPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 37:
                                tigaPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 38:
                                tigaPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 39:
                                tigaPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 40:
                                empatPuluh();
                                break;
                            case 41:
                                empatPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 6500);
                                break;
                            case 42:
                                empatPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 43:
                                empatPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 44:
                                empatPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 45:
                                empatPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 46:
                                empatPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 47:
                                empatPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 48:
                                empatPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 49:
                                empatPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 50:
                                limaPuluh();
                                break;
                            case 51:
                                limaPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 6500);
                                break;
                            case 52:
                                limaPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 53:
                                limaPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 54:
                                limaPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 55:
                                limaPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 56:
                                limaPuluh();    
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 57:
                                limaPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 58:
                                limaPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 59:
                                limaPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 60:
                                enamPuluh();
                                break;
                            case 61:
                                enamPuluh();
                                setTimeout(() => {

                                    satu[0].click();
                                }, 6500);
                                break;
                            case 62:
                                enamPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 63:
                                enamPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 64:
                                enamPuluh();

                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 65:
                                enamPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 66:
                                enamPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 67:
                                enamPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();

                                }, 6500);
                                break;
                            case 68:
                                enamPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 69:
                                enamPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 70:
                                tujuhPuluh();
                                break;
                            case 71:
                                tujuhPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 6500);
                                break;
                            case 72:
                                tujuhPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 73:
                                tujuhPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 74:
                                tujuhPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 75:
                                tujuhPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 76:
                                tujuhPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 77:
                                tujuhPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 78:
                                tujuhPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 79:
                                tujuhPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 80:
                                delapanPuluh();
                                break;
                            case 81:
                                delapanPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 6500);
                                break;
                            case 82:
                                delapanPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 83:
                                delapanPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 84:
                                delapanPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 85:
                                delapanPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 86:
                                delapanPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 87:
                                delapanPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 88:
                                delapanPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 89:
                                delapanPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 90:
                                sembilanPuluh();
                                break;
                            case 91:
                                sembilanPuluh();
                                setTimeout(() => {
                                    satu[0].click();
                                }, 6500);
                                break;
                            case 92:
                                sembilanPuluh();
                                setTimeout(() => {
                                    dua[0].click();
                                }, 6500);
                                break;
                            case 93:
                                sembilanPuluh();
                                setTimeout(() => {
                                    tiga[0].click();
                                }, 6500);
                                break;
                            case 94:
                                sembilanPuluh();
                                setTimeout(() => {
                                    empat[0].click();
                                }, 6500);
                                break;
                            case 95:
                                sembilanPuluh();
                                setTimeout(() => {
                                    lima[0].click();
                                }, 6500);
                                break;
                            case 96:
                                sembilanPuluh();
                                setTimeout(() => {
                                    enam[0].click();
                                }, 6500);
                                break;
                            case 97:
                                sembilanPuluh();
                                setTimeout(() => {
                                    tujuh[0].click();
                                }, 6500);
                                break;
                            case 98:
                                sembilanPuluh();
                                setTimeout(() => {
                                    delapan[0].click();
                                }, 6500);
                                break;
                            case 99:
                                sembilanPuluh();
                                setTimeout(() => {
                                    sembilan[0].click();
                                }, 6500);
                                break;
                            case 100:
                                seratus();
                                break;

                            default:
                                break;
                        
                        
                    }
                    if(IdAntrian.current <= 11){
                        theEnd();
                    }else if(IdAntrian.current <= 20 || IdAntrian.current == 30 || IdAntrian.current == 40 || IdAntrian.current == 50 || IdAntrian.current == 60 || IdAntrian.current == 70 || IdAntrian.current == 80 || IdAntrian.current == 90 || IdAntrian.current == 100){
                        theEnd2();
                    }else if(IdAntrian.current < 90){
                        theEnd3();
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
                IdChecker.current = 0;
                IdAntrian.current = 0;
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
            // // componentWillUnmount();
            // socket.off("receiveDataClient");
            // socket.off("receiveCurrAntrian");
            // socket.off("kasir:receiveCurrAntrian");
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
                <button id="bellFirst" name="bellFirst" className="buttonhidden" onClick={bellFirst}>bellFirst</button>
                <button id="bellSecond" name="bellSecond" className="buttonhidden" onClick={bellSecond}>bellSecond</button>
                <button id="nomorUrut" name="nomorUrut" className="buttonhidden" onClick={nomorUrut}>nomorUrut</button>
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
        <div>
        {loading ? <h1>Loading....</h1> :
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
        }
    </div>

)}

export default Antrian;