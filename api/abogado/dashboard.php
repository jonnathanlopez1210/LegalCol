<?php
/**
 * api/abogado/dashboard.php
 * Datos del dashboard del abogado.
 *
 * Método: GET
 * Auth:   Requiere sesión activa con rol 'lawyer'
 *
 * ESTADO ACTUAL: Placeholder — módulo de abogado pendiente de implementación.
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');
require_auth('lawyer');

json_success([
    'message' => 'Lawyer dashboard endpoint ready. Implementation pending.',
]);
