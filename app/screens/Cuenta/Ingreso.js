import React, {useRef, useState} from "react";
import { StyleSheet, View, Text, Image, ScrollView, Button } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
const db = firebase.firestore(firebaseApp);

import FormularioIngreso from "../../components/Cuenta/FormularioIngreso";
import RegistroGoogle from "../../components/Cuenta/RegistroGoogle";

export default function Ingreso() {
    const toastRef = useRef();
    const navigation = useNavigation();
    
    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/logo_principal.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewContainer}>
                <FormularioIngreso toastRef={toastRef}/>
                <CrearCuenta/>
            </View>
            <Divider style={styles.divider}/>
            <Text>Ingreso con redes sociales</Text>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <RegistroGoogle/>
        </ScrollView>
    )
}

function CrearCuenta(props) {
    
    const navigation = useNavigation();

    return (
        <Text style={styles.textRegistro}>
            ¿Todavía no tenés tu cuenta?{" "}
            <Text 
                onPress={ () => navigation.navigate("registro")}
                style={styles.btnRegistro}>
                Registrate
            </Text> 
        </Text>
    )
}


const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewContainer : {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegistro : {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegistro : {
        color: "#00a680",
        fontWeight: "bold",
    },
    divider : {
        backgroundColor: "#00a680",
        margin: 40,
    }
});