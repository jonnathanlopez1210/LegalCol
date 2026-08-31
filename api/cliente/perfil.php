<?php
/**
 * api/cliente/perfil.php
 * Lectura y actualización del perfil del cliente.
 *
 * Métodos:
 *   GET  — Devuelve datos del perfil del usuario autenticado
 *   POST — Actualiza nombre, teléfono y zona horaria
 *
 * Auth: Requiere sesión activa con rol 'client'
 *
 * POST Body (JSON):
 *   { "name": "Johan Evelio", "phone": "+1 555 000 0000", "timezone": "ET" }
 *
 * Respuesta GET esperada (Fase 4):
 * {
 *   "ok": true,
 *   "data": {
 *     "id": 1, "name": "Johan Evelio", "email": "...",
 *     "phone": "+1 555 012 3456", "timezone": "ET"
 *   }
 * }
 *
 * ESTADO ACTUAL: Placeholder — pendiente de MySQL (Fase 4).
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_auth('client');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Por ahora devuelve los datos de la sesión PHP activa
    $user = session_get_user();
    json_success([
        'id'    => $user['id'],
        'name'  => $user['name'],
        'email' => $user['email'],
        'role'  => $user['role'],
        // phone y timezone vendrán de MySQL en Fase 4
    ]);
}

if ($method === 'POST') {
    $body = get_json_body();

    // Validación básica
    $name     = trim($body['name']     ?? '');
    $phone    = trim($body['phone']    ?? '');
    $timezone = trim($body['timezone'] ?? '');

    if (empty($name)) {
        json_error('Name is required.', 422);
    }

    // TODO Fase 4: UPDATE users SET name = ?, phone = ?, timezone = ? WHERE id = ?
    json_success([
        'message' => 'Profile update endpoint ready. MySQL connection pending (Phase 4).',
    ]);
}

json_error('Method not allowed.', 405);
