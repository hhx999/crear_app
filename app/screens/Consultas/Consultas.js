import React, {useEffect, useState, useCallback} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

import ListaConsultas from "../../components/Consultas/ListaConsultas";

const db = firebase.firestore(firebaseApp);

export default function Consultas(props) {
    const { navigation } = props;

    const [usuario, setUsuario] = useState(null)
    const [consultas, setConsultas] = useState([]);
    const [totalConsultas, setTotalConsultas] = useState(0);
    const [startConsultas, setStartConsultas] = useState(null);
    const [cargando, setCargando] = useState(false);
    const limitConsultas = 10;

    console.log(consultas);

    useEffect(() => {
        firebase
            .auth().onAuthStateChanged((userInfo) => {
                setUsuario(userInfo);
            });
    }, []);

    useFocusEffect(
        useCallback(() => {
            db.collection("consultas")
            .get()
            .then((snap) => {
                setTotalConsultas(snap.size);
            });
            
            const resultConsultas = [];

            db.collection("consultas")
                .orderBy("createAt", "desc")
                .limit(limitConsultas)
                .get()
                .then((res) => {
                    setStartConsultas(res.docs[res.docs.length - 1]);
                    res.forEach((doc) => {
                        const consulta = doc.data();
                        consulta.id = doc.id;
                        resultConsultas.push(consulta);   
                    });
                    setConsultas(resultConsultas);
                });
        }, [])
    );
    
    

    const handleLoadMore = () => {
        const resultConsultas = [];
        consultas.length < totalConsultas && setCargando(true);
        db.collection("consultas").orderBy("createdAt","desc")
            .startAfter(startConsultas.data().createAt)
            .limit(limitConsultas)
            .get()
            .then((res) => {
                if(res.docs.length > 0) {
                    setStartConsultas(res.docs[res.docs.length - 1])
                } else {
                    setCargando(false);
                }

                res.forEach(() => {
                    const consulta = doc.data();
                    consulta.id = doc.id;
                    resultConsultas.push(consulta);
                });

                setConsultas([...consultas, ...resultConsultas])
            })
    }

    return (
        <View style={styles.viewBody}>
            <ListaConsultas 
                consultas={consultas}
                handleLoadMore={handleLoadMore}
                cargando={cargando}
            />
            { usuario && (
                <Icon
                    reverse
                    type="material-community"
                    name="forum"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={() => navigation.navigate("agregar-consulta")}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody : {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer : {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor:"black",
        shadowOffset:{ width: 2, height: 2 },
        shadowOpacity: 0.5,
    }
});