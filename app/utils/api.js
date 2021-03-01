import * as firebase from "firebase";

export function reAuth(password) {
    const user = firebase.auth().currentUser;
    const credenciales = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );

    return user.reauthenticateWithCredential(credenciales); 
}