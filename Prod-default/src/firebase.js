import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";


firebase.initializeApp({
    
    apiKey: "AIzaSyAbIs0fdjOFFiJcSrnnNC7WarU3D8HlFKA",
    authDomain: "sampleapp-919fc.firebaseapp.com",
    projectId: "sampleapp-919fc",
    storageBucket: "sampleapp-919fc.appspot.com",
    messagingSenderId: "1001941216374",
    appId: "1:1001941216374:web:60ee90552d2b2dff018357"

});

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;