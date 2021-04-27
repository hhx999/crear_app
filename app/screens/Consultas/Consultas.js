import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListaConsultas from "../../components/Consultas/ListaConsultas";

const db = firebase.firestore(firebaseApp);

export default function Consultas(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [totalConsultas, setTotalConsultas] = useState(0);
  const [startConsultas, setStartConsultas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const limitConsultas = 10;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      console.log(firebase.auth().currentUser.uid);
      db.collection("consultas")
        .where('uid','==',firebase.auth().currentUser.uid)
        .get()
        .then((snap) => {
          setTotalConsultas(snap.size);
        });

      const resultConsultas = [];

      db.collection("consultas")
        .where('uid','==',firebase.auth().currentUser.uid)
        .limit(limitConsultas)
        .get()
        .then((response) => {
          setStartConsultas(response.docs[response.docs.length - 1]);

          response.forEach((doc) => {
            const consulta = doc.data();
            consulta.id = doc.id;
            resultConsultas.push(consulta);
          });
          setConsultas(resultConsultas);
        });
    }, [])
  );

  const handleLoadMore = () => {
    const resultConsultas = [];
    consultas.length < totalConsultas && setIsLoading(true);

    db.collection("Consultas")
      .where('uid','==',firebase.auth().currentUser.uid)
      .orderBy("createAt", "desc")
      .startAfter(startConsultas.data().createAt)
      .limit(limitConsultas)
      .get()
      .then((response) => {
        if (response.docs.length > 0) {
          setStartConsultas(response.docs[response.docs.length - 1]);
        } else {
          setIsLoading(false);
        }

        response.forEach((doc) => {
          const consulta = doc.data();
          consulta.id = doc.id;
          resultConsultas.push(consulta);
        });

        setConsultas([...consultas, ...resultConsultas]);
      });
  };

  return (
    <View style={styles.viewBody}>
      <ListaConsultas
        consultas={consultas}
        handleLoadMore={handleLoadMore}
        isLoading={isLoading}
      />

      {user && (
        <View style={styles.btnContainer}>
          <Text
            color="#00a680"
            style={{backgroundColor: "#0074bb", color: "white", paddingVertical: 20,
            paddingHorizontal: 20, borderRadius: 40}}
            onPress={() => navigation.navigate("agregar-consulta")}
          >Envianos tu consulta</Text>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});