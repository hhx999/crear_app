import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";

export default function OpcionesCuenta(props) {
    
    const { userInfo, toastRef } = props;
    const opcionesMenu = generarOpciones();
    
    return (
        <View>
            {map(opcionesMenu, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                />
            ))}
        </View>
    )
}

function generarOpciones() {
    return [
        {
            title : "Cambiar nombre y apellidos",
        },
        {
            title: "Cambiar email",
        },
        {
            title: "Cambiar contraseña",
        },
    ]
}

const styles= StyleSheet.create({});