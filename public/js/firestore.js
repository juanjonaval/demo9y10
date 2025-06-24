// public/js/firestore.js

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Inicializa Firestore
const db = getFirestore();

// Función segura para obtener datos de usuario
export async function getUserData() {
  const auth = firebase.auth();
  
  if (!auth.currentUser) {
    throw new Error("Usuario no autenticado");
  }

  try {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (!userDoc.exists()) {
      throw new Error("Documento no encontrado");
    }
    return userDoc.data();
  } catch (error) {
    console.error("Error en Firestore:", error);
    throw error;
  }
}

// Función segura para guardar datos
export async function saveUserData(data) {
  const auth = firebase.auth();
  
  if (!auth.currentUser) {
    throw new Error("Acceso denegado");
  }

  try {
    await setDoc(doc(db, "users", auth.currentUser.uid), data);
  } catch (error) {
    console.error("Error guardando datos:", error);
    throw error;
  }
}