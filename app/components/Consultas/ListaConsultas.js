import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native'
import { Image } from "react-native-elements";
import {size} from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListaConsultas(props) {
    const { consultas, handleLoadMore, cargando } = props;
    const navigation = useNavigation();

    return (
        <View>
            { size(consultas) > 0  ? (
                <FlatList 
                    data={consultas}
                    renderItem={(consulta) => <Consulta consulta={consulta} navigation={navigation} />}
                    keyExtractor={(item,index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={handleLoadMore}
                    ListFooterComponent={<FooterList cargando={cargando} />}
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

function FooterList(props) {
    const { cargando } = props;

    if (cargando) {
        return (
            <View style={styles.loaderConsultas}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else {
        return (
            <View style={styles.notFoundConsultas}>
                <Text>No quedan consultas por cargar</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    loaderConsultas : {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    notFoundConsultas :{
        marginTop: 10,
        marginBottom: 20,
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
