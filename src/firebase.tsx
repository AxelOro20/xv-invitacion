import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
//import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC7TO8hIgbB2quQRQZnheo0zB4j_vvAxUc",
    authDomain: "xv-invitacion-a5f9a.firebaseapp.com",
    projectId: "xv-invitacion-a5f9a",
    storageBucket: "xv-invitacion-a5f9a.firebasestorage.app",
    messagingSenderId: "293586210969",
    appId: "1:293586210969:web:7f5b6ada7ad0b29c32e808"
  };

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Instancia de Firestore
const db = getFirestore(app);

// Conectar al emulador de Firestore si estamos en localhost
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080); // Cambia 8080 si configuraste otro puerto
}

// Exporta la instancia de Firestore
export { db };