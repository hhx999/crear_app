import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import CuentaRegistrada from "./CuentaRegistrada";
import CuentaNoRegistrada from "./CuentaNoRegistrada";
import Loading from "../../components/Loading";



export default function Cuenta(){
    const [login, setLogin] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            !user ? setLogin(false) : setLogin(true); 
        })
    }, []);

    if(login === null) return <Loading isVisible={true} text="Cargando"/>;
     

    return login ? <CuentaRegistrada/> : <CuentaNoRegistrada/>;
}