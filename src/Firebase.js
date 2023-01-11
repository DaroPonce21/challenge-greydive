import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDB1tKj0VqlD87RFeBp9JO7faIkXAbyyFo",
  authDomain: "proy-chall.firebaseapp.com",
  projectId: "proy-chall",
  storageBucket: "proy-chall.appspot.com",
  messagingSenderId: "276514880167",
  appId: "1:276514880167:web:4c960281de39ba87d67982"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore()