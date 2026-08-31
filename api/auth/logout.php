<?php
/**
 * api/auth/logout.php
 * Endpoint de cierre de sesión.
 *
 * Método:  POST
 * Respuesta:
 *   { "ok": true, "data": { "message": "Session closed." } }
 *
 * Destruye la sesión PHP completamente.
 * El frontend también limpia sessionStorage tras recibir la respuesta.
 *
 * ESTADO ACTUAL:
 *  Funcional en cuanto se active la sesión PHP.
 *  Cuando auth.js llame a este endpoint, también borrará sessionStorage.
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('POST');

if (session_is_authenticated()) {
    session_destroy_user();
}

json_success(['message' => 'Session closed.']);
