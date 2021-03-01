import React, {useState} from "react";
import { StyleSheet, View,  } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { validarEmail } from "../../utils/validaciones";
import { reAuth } from "../../utils/api";


export default function CambiarEmailForm(props) {
    const { email, setMostrarModal, toastRef, setRecargarUserInfo } = props;
    const [formData, setFormData] = useState(defaultFormValue());
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const [errors, setErrors] = useState({});
    const [cargando, setCargando] = useState(false);

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type] : e.nativeEvent.text
        });
    };

    const onSubmit = () => {
        setErrors({});
        if(!formData.email || email === formData.email) {
            setErrors({
                email: "El email no ha cambiado",
            });
        } else if (!validarEmail(formData.email)) {
            setErrors({
                email : "Formato de email incorrecto",
            });
        } else if (!formData.password) {
            setErrors({
                password : "La contraseña no puede estar vacia"
            });
        } else {
            setCargando(true);
            reAuth(formData.password).then( res => {
                firebase.auth()
                    .currentUser.updateEmail(formData.email)
                    .then(() => {
                        setCargando(false);
                        setRecargarUserInfo(true);
                        toastRef.current.show("Email actualizado correctamente");
                        setMostrarModal(false);
                    })
                    .catch(( e ) => {
                        console.log(e);
                        setErrors({
                            email : "Error al actualizar el email\n"+e,
                        });
                        setCargando(false);
                    })
            }).catch(() => {
                setCargando(false);
                setErrors({
                    password : "La contraseña es incorrecta",
                });
            })
        }
        console.log(formData);
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Correo electrónico..."
                containerStyle={styles.input}
                defaultValue={email || ""}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2",
                }}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={mostrarPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: mostrarPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setMostrarPassword(!mostrarPassword),
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Button
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={cargando}
            />
        </View>
    )
}

function defaultFormValue() {
    return {
        email: "",
        password: ""
    }
};


const styles = StyleSheet.create({
    view : {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input : {
        marginBottom: 10,
    },
    btnContainer : {
        marginTop: 20,
        width: "95%",
    },
    btn : {
        backgroundColor: "#00a680"
    }
});