<?php
/**
 * api/auth/session.php
 * Devuelve los datos de la sesión PHP activa.
 *
 * Método:  GET
 * Respuesta con sesión activa:
 *   { "ok": true, "data": { "id": 1, "name": "...", "email": "...", "role": "client" } }
 * Respuesta sin sesión:
 *   { "ok": false, "error": "No active session." }
 *
 * Uso:
 *  JavaScript llama a este endpoint para obtener los datos del usuario
 *  sin depender de sessionStorage.
 *  Reemplaza a getSession() de auth.js cuando PHP esté activo.
 *
 * ESTADO ACTUAL:
 *  Funcional. Responde con 401 si no hay sesión PHP.
 *  Cuando auth.js migre a PHP, shell.js usará este endpoint
 *  para hidratar el nombre y rol del usuario en la navbar.
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');

if (!session_is_authenticated()) {
    json_error('No active session.', 401);
}

$user = session_get_user();

json_success([
    'id'    => $user['id'],
    'name'  => $user['name'],
    'email' => $user['email'],
    'role'  => $user['role'],
]);
