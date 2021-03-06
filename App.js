import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox } from "react-native";
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from "./app/utils/firebase";
import * as firebase from "firebase";
import { decode, encode } from "base-64";

LogBox.ignoreLogs(["Setting a timer"]);
console.disableYellowBox = true;

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

export default function App() {
  return <Navigation/>
}


