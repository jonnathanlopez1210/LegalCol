<?php
/**
 * api/cliente/dashboard.php
 * Datos del dashboard del cliente.
 *
 * Método: GET
 * Auth:   Requiere sesión activa con rol 'client'
 *
 * Respuesta esperada (Fase 4):
 * {
 *   "ok": true,
 *   "data": {
 *     "stats": {
 *       "active_cases":    2,
 *       "pending_actions": 3,
 *       "next_appointment": "2026-06-24T10:00:00",
 *       "outstanding_balance": 1240.00
 *     },
 *     "recent_cases":     [...],
 *     "pending_actions":  [...],
 *     "recent_documents": [...],
 *     "appointments":     [...]
 *   }
 * }
 *
 * ESTADO ACTUAL: Placeholder — pendiente de MySQL (Fase 4).
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');
require_auth('client');

// TODO Fase 4: implementar consultas PDO reales.
// $pdo  = db_connect();
// $user = session_get_user();
// ... SELECT FROM cases, documents, appointments WHERE client_id = $user['id']

json_success([
    'message' => 'Dashboard endpoint ready. MySQL connection pending (Phase 4).',
]);
