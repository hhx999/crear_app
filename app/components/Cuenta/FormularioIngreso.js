import React, { useState} from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { validarEmail} from "../../utils/validaciones"
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading"


export default function FormularioIngreso (props) {

    const { toastRef } = props;
    const navigation = useNavigation();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue);
    const [loading, setLoading] = useState(false)

    const onChange = (e , type) => {
        setFormData({
            ...formData,
            [type] : e.nativeEvent.text
        })
        console.log(e.nativeEvent.text);
        console.log(type);
    }

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password) ) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else if (!validarEmail(formData.email)) {
            toastRef.current.show("El email no es válido");
        } else {
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(formData.email,formData.password)
                .then( () => {
                    setLoading(false);
                    navigation.navigate("cuenta");  
                })
                .catch( () => {
                    setLoading(false);
                    toastRef.current.show("Contraseña incorrecta");
                })
        }
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electrónico"
                containerStyle={styles.inputForm}
                onChange={(e) => onChange(e, "email")}
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
                onChange={(e) => onChange(e, "password")}
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
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Iniciando sesión..."/>
        </View>
    )
}

function defaultFormValue() {
    return {
        email : "",
        password : "",
    }
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