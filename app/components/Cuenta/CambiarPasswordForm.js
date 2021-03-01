import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import { reAuth } from "../../utils/api";
import * as firebase from "firebase";

export default function CambiarPasswordForm(props) {
    const { setMostrarModal, toastRef } = props;

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [formData, setFormData] = useState(defaultFormData());
    const [errors, setErrors] = useState({});
    const [cargando, setCargando] = useState(false);

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type] : e.nativeEvent.text
        });
    }

    const onSubmit = async() => {
        let isSetErrors = true;
        let errorsTemp = {};
        setErrors({});

        if (
            !formData.password || 
            !formData.nuevoPassword || 
            !formData.repetirNuevoPassword
        ) {
            errorsTemp = {
                password : !formData.password ? "La contraseña no puede estar vacía" : "",
                nuevoPassword : !formData.nuevoPassword ? "La contraseña no puede estar vacía" : "",
                repetirNuevoPassword : !formData.repetirNuevoPassword ? "La contraseña no puede estar vacía" : "",
            };
        } else if ( formData.nuevoPassword !== formData.repetirNuevoPassword) {
            errorsTemp = {
                nuevoPassword : "Las contraseñas no son iguales",
                repetirNuevoPassword : "Las contraseñas no son iguales",
            }
        } else if (size(formData.nuevoPassword) < 6) {
            errorsTemp = {
                nuevoPassword : "La contraseña debe tener más de 6 carácteres",
                repetirNuevoPassword : "La contraseña debe tener más de 6 carácteres",
            }
        } else {
            setCargando(true);
            await reAuth(formData.password)
            .then( async() => {
                await firebase
                    .auth()
                    .currentUser.updatePassword(formData.nuevoPassword).then(() => {
                        isSetErrors = false;
                        setCargando(false);
                        setMostrarModal(false);
                        firebase.auth().signOut();
                    }).catch((e) => {
                        errorsTemp = {
                            other : "Ha ocurrido un error al actualizar la contraseña\n"+e
                        }
                    })
            }).catch((e) => {
                errorsTemp = {
                    password : "La contraseña no es correcta\n"+e
                };
                setCargando(false);
            })
        }
        isSetErrors && setErrors(errorsTemp);
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={mostrarPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: mostrarPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setMostrarPassword(!mostrarPassword)
                }}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errors.password}
            />
            <Input 
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={mostrarPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: mostrarPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setMostrarPassword(!mostrarPassword)
                }}
                onChange={(e) => onChange(e, "nuevoPassword")}
                errorMessage={errors.nuevoPassword}
            />
            <Input 
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={mostrarPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: mostrarPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setMostrarPassword(!mostrarPassword)
                }}
                onChange={(e) => onChange(e, "repetirNuevoPassword")}
                errorMessage={errors.repetirNuevoPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={cargando}
            />
            <Text>{errors.other}</Text>
        </View>
    )
}

function defaultFormData() {
    return {
        password : "",
        nuevoPassword : "",
        repetirNuevoPassword : ""
    };
}


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
        backgroundColor: "#00a680",
    }
});