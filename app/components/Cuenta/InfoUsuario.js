import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";

export default function InfoUsuario(props) {
  const { userInfo } = props;
  return (
    <View style={styles.viewUsuarioInfo}>
      <Avatar
        rounded
        size="large"
        showEditButton
        containerStyle={styles.usuarioInfoAvatar}
      />
      <View>
          <Text style={styles.displayName}>
              Usuario Test
          </Text>
          <Text>
              mail@mail.com
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
