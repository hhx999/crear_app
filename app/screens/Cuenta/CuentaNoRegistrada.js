import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";

export default function CuentaNoRegistrada(){
    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image 
                source={require("../../../assets/img/user-guest.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Consulta tu perfil CREAR</Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <View style={styles.btnPrimaryView}>
                <Button 
                    buttonStyle={styles.btnPrimary}
                    containerStyle={styles.btnPrimaryContainer}
                    title="Ver perfil"
                    onPress={ () => console.log("Click")}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewBody : {
        marginLeft : 30,
        marginRight : 30,
    },
    image : {
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    title : {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
    },
    description : {
        textAlign: "center",
        marginBottom: 20,
    },
    btnPrimary : {
        backgroundColor: "#00a680",
    },
    btnPrimaryContainer : {
        width: "70%",
    },
    btnPrimaryView : {
        flex: 1,
        alignItems: "center",
    }
});