import React, {useState, useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import DropDownPicker from 'react-native-dropdown-picker';
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AgregarConsulta(props) {
    const { toastRef, setCargando, navigation } = props;
    const [nombreConsulta, setNombreConsulta] = useState("");
    const [descripcionConsulta, setDescripcionConsulta] = useState("");
    const [area, setArea] = useState(null);
    const [areas, setAreas] = useState([]);
    const [agencia, setAgencia] = useState(null);
    const [agencias, setAgencias] = useState([]);

    useEffect(() => {
        db.collection("areas")
            .get()
            .then((res) => {
                res.forEach((doc) => {
                    const data = { "label" : doc.data().nombre, value: doc.id}
                    setAreas(areas => [...areas, data]);
                });
            });
        db.collection("agencias")
            .get()
            .then((res) => {
                res.forEach((doc) => {
                    const data = { "label" : doc.data().nombre, value: doc.id}
                    setAgencias(agencias => [...agencias, data]);
                });
            });
    }, []);
    const enviarConsulta = () => {
        if(!nombreConsulta || !descripcionConsulta) {
            toastRef.current.show("Todos los campos del formulario son obligatorios");
        } else {
            setCargando(true);
            const user = firebase.auth().currentUser;
            db.collection("consultas")
                .add({
                    idUser: db.collection('users').doc(user.email),
                    uid: user.uid,
                    idArea: area.id,
                    idAgencia: agencia.id,
                    titulo : nombreConsulta,
                    descripcion : descripcionConsulta,
                    rating: 0,
                    createAt: new Date(),
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
                areas={areas}
                setArea={setArea}
                agencias={agencias}
                setAgencia={setAgencia}
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
    const { setNombreConsulta, setDescripcionConsulta,areas, setArea, agencias, setAgencia } = props;

    console.log("formadd");
    console.log(areas);

    return (
        <View style={styles.viewForm}>
            <Input 
                placeholder="Titulo de consulta"
                containerStyle={styles.input}
                onChange={(e) => {
                    setNombreConsulta(e.nativeEvent.text)
                }}
            />
            <DropDownPicker
                    placeholder="Elegí tu agencia más cercana..."
                    items={agencias}
                    containerStyle={{height: 60}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setAgencia({
                        id: item.value,
                        name: item.label
                    })}
                />
            <DropDownPicker
                    items={areas}
                    placeholder="Elegí el área relacionada a tu consulta..."
                    containerStyle={{height: 60}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setArea({
                        id: item.value,
                        name: item.label
                    })}
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