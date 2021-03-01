import React, { useState, useRef } from "react";
import {  View, Text} from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AgregarConsultaForm from "../../components/Consultas/AgregarConsultaForm"


export default function AgregarConsulta(props) {
    const { navigation } = props;
    const [cargando, setCargando] = useState(false);
    const toastRef = useRef();

    return (
        <View>
            <AgregarConsultaForm 
                toastRef={toastRef}
                setCargando={setCargando}
                navigation={navigation}
            />
            <Toast
                ref={toastRef}
                position="center"
                opacity={0.9}
            />
            <Loading 
                isVisible={cargando}
                text="Enviando consulta"
            />
        </View>
    )
}
