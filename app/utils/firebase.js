import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBoGF9giO7J1wMqe4Xn82nogKg70kAr3ng",
  authDomain: "crearapp-ef9d2.firebaseapp.com",
  projectId: "crearapp-ef9d2",
  storageBucket: "crearapp-ef9d2.appspot.com",
  messagingSenderId: "666304821358",
  appId: "1:666304821358:web:2a3677249c286156428e7f",
  measurementId: "G-S3TKPLRDV0"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

