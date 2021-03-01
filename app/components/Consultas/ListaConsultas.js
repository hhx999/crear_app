import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { } from "react-native-elements";
import {size} from "lodash";
import { Touchable } from 'react-native';

export default function ListaConsultas(props) {
    const { consultas } = props;

    return (
        <View>
            { size(consultas) > 0  ? (
                <FlatList 
                    data={consultas}
                    renderItem={(consulta) => <Consulta consulta={consulta} />}
                    keyExtractor={(item,index) => index.toString()}
                />
            ) : (
                <View style={styles.loaderConsultas}>
                    <ActivityIndicator size="large" color="#00a680"/>
                    <Text>Cargando consultas</Text>
                </View>
            )}
        </View>
    )
}

function Consulta(props) {
    const {consulta} = props;
    const { titulo, descripcion } = consulta.item;
    console.log(consulta);

    const goConsulta = ( ) => {
        console.log("Hola");
    }

    return (
        <TouchableOpacity onPress={goConsulta}>
            <View style={styles.viewConsulta}>
               <View style={styles.viewAreaImage}>
                   <Image 
                        resizeMethod="auto"
                        PlaceholderContent={<ActivityIndicator color="#00a680" />}
                        source={require("../../../assets/img/default-constructor.jpg")}
                        style={styles.imgArea}
                   />
                </View>
                <View>
                    <Text style={styles.tituloConsulta}>{titulo}</Text>
                    <Text style={styles.descripcionConsulta}>{descripcion.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loaderConsultas : {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    viewConsulta : {
        flexDirection: "row",
        margin: 10,
    },
    viewAreaImage : {
        marginRight: 15,
    },
    imgArea : {
        width: 80,
        height: 80,
    },
    tituloConsulta : {
        fontWeight: "bold",
    },
    descripcionConsulta : {
        paddingTop: 5,
        color: "grey",
        width: 300,
    }
})
