import React, { useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";


export default function FormularioIngreso () {

    const [mostrarPassword, setMostrarPassword] = useState(false);

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electrónico"
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
                secureTextEntry={!mostrarPassword}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ mostrarPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={styles.iconRight}
                        onPress={() => setMostrarPassword(!mostrarPassword)}
                    />
                }
            />
            <Button
                title="Ingresar"
                containerStyle={styles.btnContainerIngreso}
                buttonStyle={styles.btnIngreso}
            />
        </View>
    )
}

const styles = StyleSheet.create( {
    formContainer : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainerIngreso : {
        marginTop : 20,
        width: "95%",

    },
    btnIngreso : {
        backgroundColor: "#00a680",
    },
    iconRight : {
        color: "#c1c1c1",
    }

})