<?php
/**
 * response.php
 * Helpers para respuestas JSON estandarizadas de la API.
 *
 * Responsabilidades:
 *  - Establecer los headers correctos para todas las respuestas JSON.
 *  - Proveer una estructura de respuesta consistente en todos los endpoints.
 *  - Terminar la ejecución después de enviar la respuesta.
 *
 * Uso en endpoints:
 *   json_success(['user' => $user]);
 *   json_error('Invalid credentials', 401);
 *
 * Estructura de respuesta exitosa:
 *   { "ok": true, "data": { ... } }
 *
 * Estructura de respuesta de error:
 *   { "ok": false, "error": "mensaje" }
 */

/**
 * Envía una respuesta JSON exitosa y termina la ejecución.
 *
 * @param array  $data    Datos a incluir en la respuesta.
 * @param int    $status  Código HTTP (default 200).
 * @return never
 */
function json_success(array $data = [], int $status = 200): never {
    _send_json(['ok' => true, 'data' => $data], $status);
}

/**
 * Envía una respuesta JSON de error y termina la ejecución.
 *
 * @param string $message  Mensaje de error legible.
 * @param int    $status   Código HTTP (default 400).
 * @return never
 */
function json_error(string $message, int $status = 400): never {
    _send_json(['ok' => false, 'error' => $message], $status);
}

/**
 * Verifica que el método HTTP del request sea el esperado.
 * Si no coincide, responde con 405 Method Not Allowed.
 *
 * @param string $method  'GET' | 'POST' | 'PUT' | 'DELETE'
 * @return void
 */
function require_method(string $method): void {
    if ($_SERVER['REQUEST_METHOD'] !== strtoupper($method)) {
        json_error('Method not allowed.', 405);
    }
}

/**
 * Lee y parsea el body JSON del request.
 * Útil para endpoints que reciben datos desde fetch().
 *
 * @return array  Datos parseados o array vacío si el body no es JSON válido.
 */
function get_json_body(): array {
    $raw = file_get_contents('php://input');
    if (empty($raw)) return [];

    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

/**
 * Función interna: establece headers y envía el JSON.
 *
 * @param array $payload
 * @param int   $status
 * @return never
 */
function _send_json(array $payload, int $status): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');

    // Prevenir caché en respuestas de la API
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');

    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
