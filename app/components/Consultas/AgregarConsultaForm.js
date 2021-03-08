import React, {useState} from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AgregarConsulta(props) {
    const { toastRef, setCargando, navigation } = props;
    const [nombreConsulta, setNombreConsulta] = useState("");
    const [descripcionConsulta, setDescripcionConsulta] = useState("");

    const enviarConsulta = () => {
        if(!nombreConsulta || !descripcionConsulta) {
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        } else {
            setCargando(true);
            db.collection("consultas")
                .add({
                    titulo : nombreConsulta,
                    descripcion : descripcionConsulta,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid,
                })
                .then(() => {
                    console.log("OK");
                    setCargando(false);
                    navigation.navigate("consultas");
                }).catch((e) => {
                    console.log(e);
                    setCargando(false);
                    toastRef.current.show("Error al enviar la consulta.\n"+e);
                });
        }
    }

    return (
        <ScrollView>
            <FormAdd
                setNombreConsulta={setNombreConsulta}
                setDescripcionConsulta={setDescripcionConsulta}
            />
            <Button 
                title="Enviar consulta"
                onPress={enviarConsulta}
                buttonStyle={styles.btnAgregarConsulta}
            />
        </ScrollView>
    )
}

function FormAdd(props) {
    const { setNombreConsulta, setDescripcionConsulta } = props;

    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Titulo de consulta"
                containerStyle={styles.input}
                onChange={(e) => {
                    setNombreConsulta(e.nativeEvent.text)
                }}
            />
            <Input
                placeholder="Escriba su consulta"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => {
                    setDescripcionConsulta(e.nativeEvent.text)
                }}
            />
        </View>   
    )
}

const styles = StyleSheet.create({
    scrollView : {
        height : "100%",
    },
    viewForm : {
        marginLeft: 10,
        marginRight: 10,
    },
    input : {
        marginBottom: 10,
    },
    textArea : {
        height : 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnAgregarConsulta : {
        backgroundColor: "#00a680",
        margin: 20,
    }
});