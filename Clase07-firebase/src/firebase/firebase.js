import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebaseConfig: configuración de tu proyecto Firebase
// Estos datos los obtenés desde la consola de Firebase cuando creás un proyecto
// Firebase los usa para saber a qué proyecto conectarse
const firebaseConfig = {
  apiKey: "AIzaSyB_DCajogvsL9Dc-JABRBrhR2DRr7SgIsE",
  authDomain: "e-commerce-47b9d.firebaseapp.com",
  projectId: "e-commerce-47b9d",
  storageBucket: "e-commerce-47b9d.firebasestorage.app",
  messagingSenderId: "198792624290",
  appId: "1:198792624290:web:8fa2f7de52b60635d27ffb",
};

// initializeApp: inicializa Firebase con la configuración de tu proyecto
// app: es la instancia de Firebase, el "punto de entrada" para usar todos los servicios
// (Firestore, Authentication, Storage, etc.)
// La exportamos para usarla en otros archivos (como db.js)
export const app = initializeApp(firebaseConfig);
