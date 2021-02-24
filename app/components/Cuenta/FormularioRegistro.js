import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function FormularioRegistro() {

    const [ mostrarPassword , setMostrarPassword  ] = useState(false);

    const [mostrarRepeatPassword, setMostrarRepeatPassword] = useState(false)

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={mostrarPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ mostrarPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={styles.iconRight}
                        onPress={() => setMostrarPassword(!mostrarPassword)}
                    />
                }
            />
            <Input
                placeholder="Repetir contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={mostrarRepeatPassword ? false : true}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={mostrarRepeatPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={styles.iconRight}
                        onPress = { () => setMostrarRepeatPassword(!mostrarRepeatPassword)}
                    />
                }
            />
            <Button
                title="Unirse"
                containerStyle={styles.btnContainerRegistro}
                buttonStyle={styles.btnRegistro}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 30,
    },
    btnContainerRegistro: {
        marginTop: 20,
        width: "95%",
    },
    btnRegistro: {
        backgroundColor: "#00a680"
    },
    iconRight: {
        color: "#c1c1c1",
    },

});