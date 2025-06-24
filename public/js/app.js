// En tu app.js principal
const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  if (user) {
    // Usuario logueado
    initAppPrivada();  // Carga módulos privados
    showPrivateUI();   // Muestra interfaz privada
  } else {
    // Usuario no logueado
    initAppPublica();  // Carga módulos públicos
    showPublicUI();    // Muestra interfaz pública
  }
});