import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Rating, Button } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import Loading from "../../components/Loading";

const db = firebase.firestore(firebaseApp);

export default function Consulta(props) {
    const { navigation, route} = props;
    const {id, name} = route.params;
    const [consulta, setConsulta] = useState(null);
    const [respuesta, setRespuesta] = useState({})
    const [rating, setRating] = useState(0);

    console.log(consulta);

    navigation.setOptions({title : name});

    useEffect(() => {
        db.collection('consultas')
            .doc(id)
            .get()
            .then((res) => {
                const data = res.data();
                data.id = res.id;
                setConsulta(data);
                setRating(data.rating);
                db.collection('respuestas')
                .doc(res.data().idRespuesta)
                .get()
                .then((res) => {
                    const dataRes = res.data();
                    dataRes.id = res.id;
                    setRespuesta(dataRes);
                });
            });
        
    }, []);

    if(consulta == null) return <Loading isVisible={true} text='Cargando consulta...'></Loading>
    return (
        <View style={styles.viewBody}>
            <TitleConsulta
                titulo={consulta.titulo}
                descripcion={consulta.descripcion}
                rating={consulta.rating}
            ></TitleConsulta>
            <Text style={{color: "#76b72a",paddingBottom:20}}>Agencia CREAR Bariloche</Text>
            <Text style={{fontWeight: "bold"}}>Respuesta:</Text>
            <Text>
            {respuesta.descripcion ? respuesta.descripcion : "Todavía no hay respuesta"}
            </Text>
            {respuesta.descripcion ? (
                <>
                    <View style={{ flexDirection: "row", padding: 15}}>
                        <Rating
                                style={styles.rating}
                                imageSize={40}
                                startingValue={parseFloat(consulta.rating)}
                        ></Rating>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Button
                            title="Calificar"
                            containerStyle={{marginTop: 20,
                            width: "90%",backgroundColor: "#00a680"}}
                        />
                    </View>
                </>
            ): <Text></Text>}
        </View>
    )
}

function TitleConsulta(props) {
    const {titulo, descripcion, rating} = props;
    
    return (
        <View style={styles.viewTitleConsulta}>
            <View style={{ flexDirection: "row"}}>
                <Text style={styles.titleConsulta}>
                    {titulo}
                </Text>
            </View>
                <Text style={{ color: "#ccc", position:"absolute", right: 10}}>Administración</Text>
            
            <View style={{padding: 15}}>
                <Text style={styles.descripcionConsulta}>
                    {descripcion}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    viewTitleConsulta: {
        padding: 15,
    },
    titleConsulta: {
        fontSize: 20,
        fontWeight: "bold",
    },
    descripcionConsulta: {
        marginTop: 5,
        color: "gray",
    },
    rating: {
        position: "absolute",
        right: 0,
    }
})
