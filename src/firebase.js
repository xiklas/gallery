// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Deine Firebase-Konfigurationsdetails, die du in Schritt 1 erhalten hast
const firebaseConfig = {
    apiKey: "AIzaSyC2VeXZ2zl1WS3OvB0XwI0qdoeEkYaUa_c",
    authDomain: "theprojectindex-8b645.firebaseapp.com",
    projectId: "theprojectindex-8b645",
    storageBucket: "theprojectindex-8b645.appspot.com",
    messagingSenderId: "117584606387",
    appId: "1:117584606387:web:7c4af917f4089ab93d2cc6",
    measurementId: "G-JH8RTQL2MK"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Firebase Storage initialisieren
const storage = getStorage(app);

export { storage };
