import React, { useState} from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-google-app-auth";
import * as firebase from "firebase";
import { firebaseApp } from "../../utils/firebase";
const db = firebase.firestore(firebaseApp);


export default function RegistroGoogle (props) {

    const { toastRef } = props;
    const navigation = useNavigation();
    const [cargando, setCargando] = useState(false);

    const inicioSesionGoogle = async () => {

        console.log("LoginScreen.js 6 | loggin in");
            try {
              setCargando(true);
              const result = await Google.logInAsync({
                androidClientId: `901357151855-js20vpfo4tefvq3qieesn7f6adoj9dtd.apps.googleusercontent.com`,
                scopes: ['profile', 'email'],
              });
        
              if (result.type === "success") {
                // Then you can use the Google REST API
                const credential = firebase.auth.GoogleAuthProvider.credential( //Set the tokens to Firebase
                    result.idToken,
                    result.accessToken
                  );
                  firebase.auth()
                    .signInWithCredential(credential)
                    .then( async res => {
                      const existe = await db.collection('users').doc(res.user.email).get();

                      if(!existe.exists ) {
                          await db.collection('users').doc(res.user.email).set({
                              uid: res.user.uid,
                              email: res.user.email,
                              rol: 'usuario'
                          })
                      }
                      setCargando(false);
                      navigation.navigate("cuenta");
                    })
                    .catch((error) => {
                      console.log(error);
                    });
              } else {
                return { cancelled: true };
              }
            } catch (error) {
              console.log("LoginScreen.js 19 | error with login", error);
            }
    }

    return (
        <View >
            <Button
                title="Ingresar con GOOGLE"
                onPress={inicioSesionGoogle}
                loading={cargando}
            />
        </View>
    )
}


const styles = StyleSheet.create({})   