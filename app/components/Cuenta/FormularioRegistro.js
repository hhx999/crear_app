import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail} from "../../utils/validaciones"
import { isEmpty, size } from "lodash";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
const db = firebase.firestore(firebaseApp);


export default function FormularioRegistro(props) {
    const { toastRef } = props;

    const [ mostrarPassword , setMostrarPassword  ] = useState(false);
    const [mostrarRepeatPassword, setMostrarRepeatPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () => {
        if( isEmpty(formData.email) || 
            isEmpty(formData.password || 
            isEmpty(formData.repeatPassword))
            )
        {
            //console.log("Todos los campos son obligatorios");
            toastRef.current.show("Todos los campos son obligatorios");
        } else if(!validarEmail(formData.email)) {
            toastRef.current.show("Email no válido");
        } else if(formData.password !== formData.repeatPassword) {
            toastRef.current.show("Las contraseñas deben ser iguales");
        } else if (size(formData.password) < 6) {
            toastRef.current.show("La contraseña debe ser mayor a 6 carácteres");
        }
        else {
            setLoading(true);
            firebase
                .auth()
                .createUserWithEmailAndPassword(formData.email, formData.password)
                .then(res => {
                    console.log("Creando usuario en tabla...");
                    addInfoUser(res);
                })
                .catch(err => {
                    setLoading(false);
                    toastRef.current.show("El email ya está en uso."+err);
                });
        }
    };
    const onChange = (e, type) => {
        setFormData({ 
            ...formData,
            [type] : e.nativeEvent.text
        });
    };

    const addInfoUser = async(data) => {
        db.collection("users").doc(data.user.uid)
            .set({
                uid: data.user.uid,
                email: data.user.email,
                rol: 'usuario'
            })
            .then(() => {
                console.log("OK");
                setLoading(false);
                navigation.navigate("cuenta");
            }).catch((e) => {
                setLoading(false);
                toastRef.current.show("Error al agregar el usuario a la tabla.\n");
            });
    }

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                onChange={ e => onChange(e, "email")}
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
                onChange={ e => onChange(e, "password")}
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
                onChange={ e => onChange(e, "repeatPassword")}
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
                onPress={onSubmit}
            />
            <Loading isVisible={loading} text="Creando cuenta..."  />
        </View>
    )
}

function defaultFormValue() {
    return {
        email : "",
        password : "",
        repeatPassword : "",
    }
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