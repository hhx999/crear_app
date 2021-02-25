import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import DefaultAvatar from "../../../assets/img/avatar-default.jpg"

export default function InfoUsuario(props) {
  const { userInfo: { photoUrl, displayName, email }, 
        } = props;

  return (
    <View style={styles.viewUsuarioInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        containerStyle={styles.usuarioInfoAvatar}
        source={ photoUrl ? {uri : photoUrl} : DefaultAvatar }
      />
      <View>
          <Text style={styles.displayName}>
              {displayName ? displayName : "Anonimous"}
          </Text>
          <Text>
              {email ? email : "Cuenta con red social"}
          </Text>
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
  displayName : {
    paddingBottom: 5,
    fontWeight: "bold",
  },
});
