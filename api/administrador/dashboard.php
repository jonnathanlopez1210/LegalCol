<?php
/**
 * api/administrador/dashboard.php
 * Datos del dashboard del administrador.
 *
 * Método: GET
 * Auth:   Requiere sesión activa con rol 'administrator'
 *
 * ESTADO ACTUAL: Placeholder — módulo de administrador pendiente de implementación.
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');
require_auth('administrator');

json_success([
    'message' => 'Administrator dashboard endpoint ready. Implementation pending.',
]);
