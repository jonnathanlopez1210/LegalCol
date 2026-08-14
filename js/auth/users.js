

'use strict';

/**
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
    name:     'Jonnathan Lopez',
    email:    'jonnathanlopez@legalcol.test',
    password: '123456',
    role:     'client',
  },
];

/**
 
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
