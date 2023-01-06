// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore, collection, addDoc, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtmsMV9bWy-IdBfbpPeswb34HefzwGxao",
  authDomain: "spottedabafg.firebaseapp.com",
  projectId: "spottedabafg",
  storageBucket: "spottedabafg.appspot.com",
  messagingSenderId: "537622954350",
  appId: "1:537622954350:web:d3a629ac2b84af8da2017f",
  measurementId: "G-F5LYHSW16J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

window.auth = auth;
window.app = app;
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
window.signInWithEmailAndPassword = signInWithEmailAndPassword;
window.signOut = signOut;
window.onAuthStateChanged = onAuthStateChanged;
window.doc = doc;
window.getDoc = getDoc;
window.setDoc = setDoc;
