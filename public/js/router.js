// public/js/router.js

const auth = firebase.auth();

// Mapeo de rutas públicas
const publicRoutes = {
  '/login': () => showLoginForm(),
  '/register': () => showRegisterForm(),
  '/': () => showPublicHome()
};

// Mapeo de rutas privadas
const privateRoutes = {
  '/dashboard': () => loadDashboard(),
  '/profile': () => loadProfile(),
  '/private': () => loadPrivateHome()
};

function handleRouting() {
  const path = window.location.hash.substr(1) || '/';
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Usuario logueado → Rutas privadas
      if (privateRoutes[path]) {
        privateRoutes[path]();
      } else {
        privateRoutes['/private'](); // Ruta privada por defecto
      }
    } else {
      // Usuario no logueado → Rutas públicas
      if (publicRoutes[path]) {
        publicRoutes[path]();
      } else {
        publicRoutes['/']; // Ruta pública por defecto
      }
    }
  });
}

// Inicialización
window.addEventListener('load', handleRouting);
window.addEventListener('hashchange', handleRouting);