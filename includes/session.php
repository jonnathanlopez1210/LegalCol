<?php
/**
 * session.php
 * Inicialización centralizada de la sesión PHP.
 *
 * Responsabilidades:
 *  - Configurar parámetros de seguridad de la sesión.
 *  - Llamar session_start() una única vez.
 *  - Definir helpers de sesión reutilizables.
 *
 * Debe incluirse ANTES de cualquier output HTML.
 * Todos los endpoints y páginas PHP lo incluyen al inicio.
 */

if (session_status() === PHP_SESSION_NONE) {
    // Nombre de la sesión definido en config.php
    session_name(SESSION_NAME);

    // Configuración de seguridad de la cookie de sesión
    session_set_cookie_params([
        'lifetime' => SESSION_LIFETIME,
        'path'     => '/',
        'secure'   => false,           // true en producción con HTTPS
        'httponly' => true,            // inaccesible desde JavaScript
        'samesite' => 'Strict',        // protección CSRF
    ]);

    session_start();
}

// =============================================================================
// Helpers de sesión
// =============================================================================

/**
 * Inicia la sesión del usuario tras autenticación exitosa.
 * Regenera el ID de sesión para prevenir session fixation.
 *
 * @param array $user  Datos del usuario: id, name, email, role
 * @return void
 */
function session_set_user(array $user): void {
    session_regenerate_id(true);
    $_SESSION['user'] = [
        'id'            => $user['id'],
        'name'          => $user['name'],
        'email'         => $user['email'],
        'role'          => $user['role'],
        'authenticated' => true,
        'login_at'      => date('c'),
    ];
}

/**
 * Devuelve los datos del usuario autenticado o null.
 *
 * @return array|null
 */
function session_get_user(): ?array {
    return $_SESSION['user'] ?? null;
}

/**
 * Verifica si existe una sesión válida y autenticada.
 *
 * @return bool
 */
function session_is_authenticated(): bool {
    $user = session_get_user();
    return $user !== null && ($user['authenticated'] ?? false) === true;
}

/**
 * Destruye completamente la sesión activa.
 *
 * @return void
 */
function session_destroy_user(): void {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }
    session_destroy();
}
