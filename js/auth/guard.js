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

/**
 * Calcula la ruta relativa a la raíz del proyecto.
 * Necesario porque las páginas internas están en /pages/rol/ (rol puede ser cliente, abogado, administrador).
 *
 * @returns {string}  e.g. '' desde index.html, '../../' desde pages/rol/
 */
function _getRootPath() {
  const path = window.location.pathname;
  
  // Contar profundidad de carpetas
  const depth = (path.match(/\//g) || []).length - 1;
  
  // Determinar si estamos dentro de pages/rol/
  const isInPages = path.includes('/pages/');
  
  if (!isInPages) {
    return '';
  }
  
  // Si estamos en pages/rol/, necesitamos subir 2 niveles para llegar a la raíz
  return '../'.repeat(2);
}

/**
 * Protege una ruta del lado del cliente.
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

(function guardRoute() {
  if (!isAuthenticated()) {
    // Calcular ruta al login desde cualquier profundidad
    const loginUrl = _getRootPath() + 'index.html';
    window.location.replace(loginUrl);
  }
})();
