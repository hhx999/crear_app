import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FormularioRegistro from "../../components/Cuenta/FormularioRegistro"

export default function Registro() {

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/img/logo_principal.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.viewForm}>
                <FormularioRegistro/>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewForm : {
        marginRight: 40,
        marginLeft: 40,
    },
});