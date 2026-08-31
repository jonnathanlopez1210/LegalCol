<?php
/**
 * api/cliente/documentos.php
 * Lista y subida de documentos del cliente.
 *
 * Métodos:
 *   GET  — Lista documentos del cliente (con filtro opcional por caso)
 *   POST — Subida de un nuevo documento (multipart/form-data)
 *
 * Auth: Requiere sesión activa con rol 'client'
 *
 * GET Params: ?case_id=CS-2041  (filtro opcional)
 *
 * POST Body (multipart/form-data):
 *   file:    archivo binario
 *   case_id: ID del caso asociado
 *
 * Respuesta GET esperada (Fase 4):
 * {
 *   "ok": true,
 *   "data": {
 *     "documents": [
 *       { "id": 1, "name": "Lease_Agreement_v3.pdf", "case_id": "CS-2041",
 *         "version": 3, "size": 1400000, "uploaded_at": "2026-06-09" }
 *     ]
 *   }
 * }
 *
 * ESTADO ACTUAL: Placeholder — pendiente de MySQL (Fase 4).
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_auth('client');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // TODO Fase 4: consultar documentos desde MySQL
    json_success([
        'message' => 'Documents list endpoint ready. MySQL connection pending (Phase 4).',
    ]);
}

if ($method === 'POST') {
    // TODO Fase 4: validar $_FILES, mover al directorio uploads/, registrar en MySQL
    json_success([
        'message' => 'Document upload endpoint ready. Implementation pending (Phase 4).',
    ]);
}

json_error('Method not allowed.', 405);
