import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import CambiarDisplayNameForm from "../../components/Cuenta/cambiarDisplayNameForm";

export default function OpcionesCuenta(props) {
    
    const { userInfo, toastRef, setRecargarUserInfo } = props;
    const [mostrarModal, setMostrarModal] = useState(false);
    const [renderComponente, setRenderComponente] = useState(null)

    const seleccionarComponente = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponente(
                    <CambiarDisplayNameForm
                        displayName={userInfo.displayName}
                        setMostrarModal={setMostrarModal}
                        toastRef={toastRef}
                        setRecargarUserInfo={setRecargarUserInfo}
                    />
                );
                setMostrarModal(true);
                break;
            case "email":
                setRenderComponente(
                    <Text>
                        Cambiando email
                    </Text>
                );
                setMostrarModal(true);
            break;
            case "password":
                setRenderComponente(
                    <Text>
                        Cambiando password
                    </Text>
                );
                setMostrarModal(true);
            break;
            default:
                setRenderComponente(false);
                break;
        }
    }
    const opcionesMenu = generarOpciones(seleccionarComponente);
    
    return (
        <View>
            {map(opcionesMenu, (menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight,
                    }}
                    containerStyle={styles.menuItem}
                    onPress={menu.onPress}
                />
            ))}

            {renderComponente && (
                <Modal isVisible={mostrarModal} setIsVisible={setMostrarModal} >
                    {renderComponente}
                </Modal>
            )}
        </View>
    )
}

function generarOpciones(seleccionarComponente) {
    return [
        {
            title : "Cambiar nombre y apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => seleccionarComponente("displayName")
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => seleccionarComponente("email")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => seleccionarComponente("password")
        },
    ]
}

const styles= StyleSheet.create({
    menuItem : {
        borderBottomWidth : 1,
        borderBottomColor: "#e3e3e3",
    }
});