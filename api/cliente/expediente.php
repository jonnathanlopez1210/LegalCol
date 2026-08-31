<?php
/**
 * api/cliente/expediente.php
 * Detalle de un caso específico del cliente.
 *
 * Método: GET
 * Auth:   Requiere sesión activa con rol 'client'
 * Params: ?id=CS-2041  (requerido)
 *
 * Respuesta esperada (Fase 4):
 * {
 *   "ok": true,
 *   "data": {
 *     "case": {
 *       "id": "CS-2041",
 *       "title": "Property Dispute — Maple St.",
 *       "status": "in_progress",
 *       "progress": 65,
 *       "stages": ["Filed", "Discovery", "Hearing", "Resolved"],
 *       "current_stage": "Hearing",
 *       "lawyer": { "name": "A. Whitfield", "specialty": "Real Estate" },
 *       "deadlines": [...],
 *       "documents": [...],
 *       "timeline": [...],
 *       "invoices": [...]
 *     }
 *   }
 * }
 *
 * ESTADO ACTUAL: Placeholder — pendiente de MySQL (Fase 4).
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');
require_auth('client');

$caseId = trim($_GET['id'] ?? '');

if (empty($caseId)) {
    json_error('Case ID is required. Use ?id=CS-2041', 422);
}

// TODO Fase 4:
// $pdo  = db_connect();
// $user = session_get_user();
// Verificar que el caso pertenece al cliente autenticado (seguridad)
// $stmt = $pdo->prepare('SELECT * FROM cases WHERE id = ? AND client_id = ? LIMIT 1');

json_success([
    'message' => 'Expediente detail endpoint ready. MySQL connection pending (Phase 4).',
    'case_id' => $caseId,
]);
