<?php
/**
 * config.example.php
 * Plantilla de configuración para nuevos entornos.
 *
 * USO:
 *   1. Copiar este archivo: cp config.example.php config.php
 *   2. Reemplazar los valores con los datos reales del entorno.
 *   3. config.php está en .gitignore — nunca se sube al repositorio.
 */

// =============================================================================
// Base de datos
// =============================================================================
define('DB_HOST',    'localhost');
define('DB_PORT',    '3306');
define('DB_NAME',    'legalcol');
define('DB_USER',    'tu_usuario_aqui');
define('DB_PASS',    'tu_contraseña_aqui');
define('DB_CHARSET', 'utf8mb4');

// =============================================================================
// Aplicación
// =============================================================================
define('APP_NAME',    'LegalCol');
define('APP_VERSION', '1.0.0');

// Entorno: 'development' | 'production'
define('APP_ENV', 'development');

if (APP_ENV === 'development') {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', 0);
    error_reporting(0);
}

// =============================================================================
// Sesiones
// =============================================================================
define('SESSION_NAME',     'legalcol_session');
define('SESSION_LIFETIME', 3600);
