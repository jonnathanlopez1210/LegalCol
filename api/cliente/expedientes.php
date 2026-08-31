<?php
/**
 * api/cliente/expedientes.php
 * Lista de casos del cliente autenticado.
 *
 * Método: GET
 * Auth:   Requiere sesión activa con rol 'client'
 * Params: ?status=all|active|closed  (filtro opcional)
 *
 * Respuesta esperada (Fase 4):
 * {
 *   "ok": true,
 *   "data": {
 *     "cases": [
 *       {
 *         "id": "CS-2041",
 *         "title": "Property Dispute — Maple St.",
 *         "type": "Real Estate",
 *         "status": "in_progress",
 *         "progress": 65,
 *         "lawyer": "A. Whitfield",
 *         "deadline": "2026-06-24"
 *       },
 *       ...
 *     ]
 *   }
 * }
 *
 * ESTADO ACTUAL: Placeholder — pendiente de MySQL (Fase 4).
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');
require_auth('client');

// TODO Fase 4:
// $pdo    = db_connect();
// $user   = session_get_user();
// $status = $_GET['status'] ?? 'all';
// $sql    = 'SELECT ... FROM cases WHERE client_id = ? ...';

json_success([
    'message' => 'Expedientes endpoint ready. MySQL connection pending (Phase 4).',
]);
