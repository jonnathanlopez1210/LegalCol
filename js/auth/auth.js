/**
 * auth.js
 * Gestión de sesión con sessionStorage.
 *
 * Responsabilidades:
 *  - Iniciar sesión y guardar sesión en sessionStorage.
 *  - Cerrar sesión y limpiar sessionStorage.
 *  - Leer la sesión activa.
 *  - Verificar si existe una sesión válida.
 *
 * Cuando se conecte un backend:
 *  - Reemplazar `_authenticateLocally()` por una llamada fetch() a la API.
 *  - El resto de la app (guard.js, páginas) no necesita cambios.
 */

'use strict';

const SESSION_KEY = 'legalcol_session';

/**
 * Intenta autenticar al usuario con email y contraseña.
 * Utiliza la base de datos de desarrollo (users.js).
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ ok: boolean, error?: string }}
 */
function login(email, password) {
  const user = findUser(email, password);

  if (!user) {
    return { ok: false, error: 'Invalid email or password.' };
  }

  const session = {
    id:              user.id,
    name:            user.name,
    email:           user.email,
    role:            user.role,
    authenticated:   true,
    loginAt:         new Date().toISOString(),
  };

  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { ok: true };
}

/**
 * Cierra la sesión activa.
 * Elimina todos los datos de sessionStorage y redirige al login.
 */
function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = _getRootPath() + 'index.html';
}

/**
 * Devuelve la sesión activa o null si no existe.
 *
 * @returns {{ id, name, email, role, authenticated, loginAt } | null}
 */
function getSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session || !session.authenticated) return null;
    return session;
  } catch {
    return null;
  }
}

/**
 * Devuelve true si hay una sesión válida activa.
 *
 * @returns {boolean}
 */
function isAuthenticated() {
  return getSession() !== null;
}

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
