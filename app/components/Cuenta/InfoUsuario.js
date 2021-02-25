import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import DefaultAvatar from "../../../assets/img/avatar-default.jpg";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUsuario(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setLoading,
    setLoadingText,
  } = props;

  const cambiarAvatar = async () => {
    const resultadoPermiso = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    const resultadoPermisoCamara =
      resultadoPermiso.permissions.mediaLibrary.status;

    if (resultadoPermisoCamara === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galería");
    } else {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (resultado.cancelled) {
        toastRef.current.show("Cerraste la selección de imagen");
      } else {
        subirImagen(resultado.uri)
          .then(() => {
            actualizarImagenUrl();
            console.log(props.photoUrl);
          })
          .catch((e) => {
            console.log(e);
            toastRef.current.show("Error al actualizar el avatar");
          });
      }
    }
  };

  const subirImagen = async (uri) => {
    setLoadingText("Subiendo imagen");
    setLoading(true);

    const respuesta = await fetch(uri);
    const blob = await respuesta.blob();
  
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };


  const actualizarImagenUrl = () => {
      firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then( async (response) => {
            const update = {
                photoURL: response,
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Hubo un error al cargar la imagen");
        });
  };


  return (
    <View style={styles.viewUsuarioInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        onEditPress={cambiarAvatar}
        containerStyle={styles.usuarioInfoAvatar}
        source={photoURL ? { uri: photoURL } : DefaultAvatar}
      />
      <View>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anonimous"}
        </Text>
        <Text>{email ? email : "Cuenta con red social"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUsuarioInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  usuarioInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    paddingBottom: 5,
    fontWeight: "bold",
  },
});
