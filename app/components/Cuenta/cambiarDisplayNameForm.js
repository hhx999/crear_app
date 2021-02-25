import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function CambiarDisplayNameForm(props) {
    const {displayName, setMostrarModal, toastRef, setRecargarUserInfo} = props;
    const [nuevoDisplayName, setNuevoDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
        setError(null);
        if(!nuevoDisplayName) {
            setError("El nombre no puede estar vacío");
        } else if (displayName === nuevoDisplayName) {
            setError("El nombre no puede ser igual al actual");
        } else {
            setLoading(true);
            const update = {
                displayName : nuevoDisplayName,
            }
            firebase
                .auth()
                .currentUser.updateProfile(update)
                .then(() => {
                    setLoading(false);
                    setRecargarUserInfo(true);
                    setMostrarModal(false);
                })
                .catch(() =>{
                    setError("Error al actualizar el nombre");
                    setLoading(false);
                });
        }
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Nombre y apellido"
                onChange={ e => setNuevoDisplayName(e.nativeEvent.text)}
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2",
                }}
                defaultValue={displayName && displayName}
                errorMessage={error}
            />
            <Button 
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10,

    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
    },
    btn: {
        backgroundColor: "#00a680",
    }
});