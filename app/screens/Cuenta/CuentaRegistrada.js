import React from "react";
import { View, Text, Button } from "react-native";
import * as firebase from "firebase";

export default function CuentaRegistrada() {
    return (
        <View>
            <Text>
                Cuenta Registrada
            </Text>
            <Button title="Cerrar sesión" onPress={ () => firebase.auth().signOut } />
        </View>
    )
}