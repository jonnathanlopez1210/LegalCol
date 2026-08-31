<?php
/**
 * api/auth/login.php
 * Endpoint de autenticación.
 *
 * Método:  POST
 * Body:    application/json  { "email": "...", "password": "..." }
 * Respuesta exitosa:
 *   { "ok": true, "data": { "role": "client", "name": "Johan Evelio" } }
 * Respuesta de error:
 *   { "ok": false, "error": "Invalid email or password." }
 *
 * Flujo:
 *  1. Valida que el método sea POST.
 *  2. Lee y valida el body JSON.
 *  3. Consulta el usuario en MySQL (cuando esté disponible).
 *  4. Verifica la contraseña con password_verify().
 *  5. Crea la sesión PHP con session_set_user().
 *  6. Devuelve el rol para que JavaScript redirija.
 *
 * ESTADO ACTUAL:
 *  La conexión a MySQL aún no está implementada.
 *  Este endpoint devuelve 503 hasta que la BD esté lista.
 *  La autenticación activa sigue siendo la de JavaScript + sessionStorage.
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('POST');

// ---------------------------------------------------------------------------
// Leer body
// ---------------------------------------------------------------------------
$body     = get_json_body();
$email    = trim($body['email']    ?? '');
$password = trim($body['password'] ?? '');

// ---------------------------------------------------------------------------
// Validación de campos
// ---------------------------------------------------------------------------
if (empty($email) || empty($password)) {
    json_error('Email and password are required.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Invalid email format.', 422);
}

// ---------------------------------------------------------------------------
// Autenticación (pendiente de MySQL)
// ---------------------------------------------------------------------------
// TODO Fase 4: reemplazar este bloque por consulta PDO a la tabla `users`.
//
// $pdo  = db_connect();
// $stmt = $pdo->prepare('SELECT id, name, email, password_hash, role FROM users WHERE email = ? LIMIT 1');
// $stmt->execute([strtolower($email)]);
// $user = $stmt->fetch();
//
// if (!$user || !password_verify($password, $user['password_hash'])) {
//     json_error('Invalid email or password.', 401);
// }
//
// session_set_user($user);
// json_success(['role' => $user['role'], 'name' => $user['name']]);

// Por ahora, indicar que el endpoint existe pero MySQL aún no está conectado
json_error('Authentication via PHP not yet active. Using JavaScript auth.', 503);
