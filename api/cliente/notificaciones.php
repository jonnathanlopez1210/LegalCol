<?php
/**
 * api/cliente/notificaciones.php
 * Lista y marcado de notificaciones del cliente.
 *
 * Métodos:
 *   GET  — Lista notificaciones del cliente
 *   POST — Marca notificaciones como leídas
 *
 * Auth: Requiere sesión activa con rol 'client'
 *
 * POST Body (JSON):
 *   { "action": "mark_all_read" }
 *   { "action": "mark_read", "id": 42 }
 *
 * ESTADO ACTUAL: Placeholder — pendiente de MySQL (Fase 4).
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_auth('client');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    json_success([
        'message' => 'Notifications endpoint ready. MySQL connection pending (Phase 4).',
    ]);
}

if ($method === 'POST') {
    $body   = get_json_body();
    $action = $body['action'] ?? '';

    if (!in_array($action, ['mark_read', 'mark_all_read'], true)) {
        json_error('Invalid action. Use mark_read or mark_all_read.', 422);
    }

    // TODO Fase 4: UPDATE notifications SET is_read = 1 WHERE ...
    json_success([
        'message' => 'Notification update endpoint ready. MySQL connection pending (Phase 4).',
    ]);
}

json_error('Method not allowed.', 405);
