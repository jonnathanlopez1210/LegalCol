<?php
/**
 * db.php
 * Conexión PDO a MySQL — patrón Singleton.
 *
 * Responsabilidades:
 *  - Proveer una única instancia de PDO reutilizable en toda la aplicación.
 *  - Configurar el modo de errores y el charset correctamente.
 *  - Centralizar la cadena de conexión para que solo se cambie en config.php.
 *
 * Uso:
 *   $pdo = db_connect();
 *   $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
 *
 * Cuando se conecte MySQL:
 *  - Ajustar DB_HOST, DB_NAME, DB_USER, DB_PASS en includes/config.php.
 *  - El resto de la aplicación no necesita cambios.
 */

/**
 * Devuelve la instancia PDO singleton.
 * La conexión se crea en el primer llamado y se reutiliza después.
 *
 * @return PDO
 * @throws RuntimeException  Si la conexión falla.
 */
function db_connect(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            DB_HOST,
            DB_PORT,
            DB_NAME,
            DB_CHARSET
        );

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            // En producción no exponer el mensaje de error
            if (APP_ENV === 'development') {
                throw new RuntimeException('DB connection failed: ' . $e->getMessage());
            }
            throw new RuntimeException('Database connection error.');
        }
    }

    return $pdo;
}
