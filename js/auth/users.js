/**
 * users.js
 * Base de usuarios de desarrollo (mock).
 *
 * ⚠️  SOLO PARA DESARROLLO – no contiene datos reales.
 * Cuando se conecte un backend, este archivo se reemplaza por
 * una llamada a la API de autenticación. El resto de la app no cambia.
 */

'use strict';

/**
 * Lista de usuarios de prueba.
 * Las contraseñas se comparan en texto plano únicamente en modo dev.
 * En producción con backend, la contraseña nunca viaja al cliente.
 *
 * @type {Array<{id: string, name: string, email: string, password: string, role: string}>}
 */
const DEV_USERS = [
  {
    id:       'usr-001',
    name:     'Johan Evelio',
    email:    'johan.evelio@legalcol.test',
    password: '123456',
    role:     'client',
  },
  {
    id:       'usr-002',
    name:     'Jhon Doe',
    email:    'jhondoe@email.com',
    password: '123456',
    role:     'client',
  },
];

/**
 * Busca un usuario por email y contraseña.
 * Devuelve el usuario sin la contraseña, o null si no existe.
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ id: string, name: string, email: string, role: string } | null}
 */
function findUser(email, password) {
  const user = DEV_USERS.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );

  if (!user) return null;

  // Nunca exponer la contraseña fuera de este módulo
  const { password: _omit, ...safeUser } = user;
  return safeUser;
}
