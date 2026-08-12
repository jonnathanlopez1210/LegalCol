/**
 * guard.js
 * Protección de rutas del lado del cliente.
 *
 * Debe incluirse como primer script en todas las páginas protegidas.
 * Si no hay sesión válida, redirige inmediatamente al login.
 *
 * Uso en páginas protegidas:
 *   <script src="../../js/auth/users.js"></script>
 *   <script src="../../js/auth/auth.js"></script>
 *   <script src="../../js/auth/guard.js"></script>
 *
 * Cuando se conecte un backend:
 *  - Reemplazar isAuthenticated() por una verificación de token JWT/cookie.
 *  - Este archivo en sí no necesita cambios estructurales.
 */

'use strict';

(function guardRoute() {
  if (!isAuthenticated()) {
    // Calcular ruta al login desde cualquier profundidad
    const isInSubfolder = window.location.pathname.includes('/pages/');
    const loginUrl = isInSubfolder ? '../../index.html' : 'index.html';
    window.location.replace(loginUrl);
  }
})();
