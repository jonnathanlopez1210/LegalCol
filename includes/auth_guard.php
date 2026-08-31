<?php
/**
 * auth_guard.php
 * Protección de rutas del lado del servidor.
 *
 * Responsabilidades:
 *  - Verificar que existe una sesión PHP válida antes de entregar la página.
 *  - Verificar opcionalmente que el rol del usuario sea el requerido.
 *  - Redirigir al login si la verificación falla.
 *
 * Uso en páginas PHP protegidas (primera línea del archivo, antes de todo output):
 *
 *   require_once '../../includes/bootstrap.php';
 *   require_auth();                    // solo verifica sesión
 *   require_auth('client');            // verifica sesión + rol
 *   require_auth(['client', 'lawyer']); // verifica sesión + uno de varios roles
 *
 * Cuando se conecte el backend completo, este archivo protege realmente la ruta:
 * el navegador recibe una redirección HTTP antes de ver cualquier HTML.
 */

/**
 * Verifica la sesión y el rol. Redirige al login si no pasa.
 *
 * @param string|string[]|null $requiredRole  Rol(es) permitidos. null = cualquier autenticado.
 * @return void
 */
function require_auth(string|array|null $requiredRole = null): void {
    if (!session_is_authenticated()) {
        _redirect_to_login();
        return;
    }

    if ($requiredRole !== null) {
        $user  = session_get_user();
        $roles = is_array($requiredRole) ? $requiredRole : [$requiredRole];

        if (!in_array($user['role'], $roles, true)) {
            // Sesión válida pero rol incorrecto — redirigir a su propio dashboard
            _redirect_to_dashboard($user['role']);
            return;
        }
    }
}

/**
 * Calcula la ruta al login desde cualquier nivel de carpetas.
 * Se basa en la profundidad real del archivo que llama a require_auth().
 *
 * @return void
 */
function _redirect_to_login(): void {
    // Calcular cuántos niveles subir para llegar a la raíz
    $root = _get_root_url();
    header('Location: ' . $root . 'index.php');
    exit;
}

/**
 * Redirige al dashboard correspondiente al rol del usuario.
 *
 * @param string $role
 * @return void
 */
function _redirect_to_dashboard(string $role): void {
    $root = _get_root_url();

    $dashboards = [
        'client'        => 'pages/cliente/dashboard.php',
        'lawyer'        => 'pages/abogado/dashboard.php',
        'administrator' => 'pages/administrador/dashboard.php',
    ];

    $target = $dashboards[$role] ?? $dashboards['client'];
    header('Location: ' . $root . $target);
    exit;
}

/**
 * Detecta la URL raíz del proyecto dinámicamente.
 * Funciona tanto en localhost como en subdirectorios.
 *
 * @return string  URL base con barra final, e.g. 'http://localhost/LegalCol/'
 */
function _get_root_url(): string {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host     = $_SERVER['HTTP_HOST'] ?? 'localhost';

    // Calcular la ruta raíz del proyecto comparando DOCUMENT_ROOT con __DIR__
    $docRoot    = rtrim($_SERVER['DOCUMENT_ROOT'] ?? '', '/');
    $scriptPath = rtrim(dirname(dirname(__FILE__)), '/'); // sube desde includes/ a la raíz

    $basePath = str_replace($docRoot, '', $scriptPath);
    $basePath = rtrim($basePath, '/') . '/';

    return $protocol . '://' . $host . $basePath;
}
