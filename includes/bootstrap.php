<?php
/**
 * bootstrap.php
 * Punto de entrada compartido de todos los archivos PHP.
 *
 * Responsabilidades:
 *  - Cargar config.php (constantes de entorno y DB).
 *  - Inicializar la sesión.
 *  - Cargar todos los helpers compartidos.
 *
 * Uso — primera línea de cualquier endpoint o página PHP:
 *   require_once __DIR__ . '/bootstrap.php';
 *   // o desde pages/cliente/:
 *   require_once '../../includes/bootstrap.php';
 *
 * El orden de carga importa:
 *   config → session → db → helpers de respuesta → guard
 */

// Ruta absoluta a la carpeta includes/ para evitar problemas de rutas relativas
$includesDir = __DIR__;

require_once $includesDir . '/config.php';
require_once $includesDir . '/session.php';
require_once $includesDir . '/db.php';
require_once $includesDir . '/response.php';
require_once $includesDir . '/auth_guard.php';
