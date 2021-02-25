import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as firebase from "firebase";
import { Button } from "react-native-elements";
import Toast  from "react-native-easy-toast";
import Loading from "../../components/Loading";
import InfoUsuario from "../../components/Cuenta/InfoUsuario"

export default function CuentaRegistrada() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const toastRef = useRef();

    useEffect( () => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        }) ();
    }, []);

    return (
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUsuario userInfo={userInfo} />}
            <Text>Opciones de la cuenta</Text>
            <Button
                title="Cerrar sesión"
                buttonStyle={styles.btnCerrarSesion}
                titleStyle={styles.btnCerrarSesionText}
                onPress={ () => firebase.auth().signOut() }
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={loading} text={loadingText} />
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo : {
        width: "100%",
        backgroundColor : "#f2f2f2",
    },
    btnCerrarSesion : {
        marginTop : 30,
        borderRadius : 0,
        backgroundColor : "#fff",
        borderTopWidth : 1,
        borderTopColor : "#e3e3e3",
        borderBottomWidth : 1,
        borderBottomColor : "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10,
    },
    btnCerrarSesionText : {
        color: "#00a680",
    }
});