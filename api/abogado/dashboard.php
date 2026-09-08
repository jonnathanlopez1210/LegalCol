<?php
/**
 * api/abogado/dashboard.php
 * Datos del dashboard del abogado.
 *
 * Método: GET
 * Auth:   Requiere sesión activa con rol 'lawyer'
 *
 * Helpers reales usados (confirmados en includes/):
 *   - db_connect()         -> includes/db.php, retorna la instancia PDO singleton
 *   - require_method()     -> includes/response.php
 *   - require_auth('lawyer') -> includes/auth_guard.php (verifica sesión + rol,
 *                                 redirige con header Location si falla)
 *   - session_get_user()   -> includes/session.php, retorna ['id','name','email','role',...]
 *   - json_success() / json_error() -> includes/response.php
 */

require_once __DIR__ . '/../../includes/bootstrap.php';

require_method('GET');
require_auth('lawyer');

try {
    $pdo = db_connect();

    $usuario   = session_get_user();
    $abogadoId = $usuario['id'] ?? null;

    if (!$abogadoId) {
        json_error('No se pudo identificar al abogado en la sesión actual.', 401);
    }

    // ── 1. KPI: total de expedientes activos asignados al abogado ──────────
    $stmt = $pdo->prepare("
        SELECT COUNT(*) AS total
        FROM expedientes
        WHERE abogado_id = :abogadoId
          AND activo = 1
    ");
    $stmt->execute([':abogadoId' => $abogadoId]);
    $totalExpedientes = (int) $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // ── 2. KPI: expedientes del abogado agrupados por estado ────────────────
    $stmt = $pdo->prepare("
        SELECT
            ee.id     AS estado_id,
            ee.nombre AS estado_nombre,
            COUNT(e.id) AS total
        FROM estados_expediente ee
        LEFT JOIN expedientes e
            ON e.estado_id   = ee.id
           AND e.abogado_id  = :abogadoId
           AND e.activo      = 1
        GROUP BY ee.id, ee.nombre
        ORDER BY ee.id ASC
    ");
    $stmt->execute([':abogadoId' => $abogadoId]);
    $expedientesPorEstado = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ── 3. KPI: total de documentos subidos en expedientes del abogado ─────
    $stmt = $pdo->prepare("
        SELECT COUNT(d.id) AS total
        FROM documentos d
        INNER JOIN expedientes e ON e.id = d.expediente_id
        WHERE e.abogado_id = :abogadoId
    ");
    $stmt->execute([':abogadoId' => $abogadoId]);
    $totalDocumentos = (int) $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // ── 4. KPI: procesos activos vinculados a expedientes del abogado ──────
    $stmt = $pdo->prepare("
        SELECT COUNT(p.id_procesos) AS total
        FROM procesos p
        INNER JOIN expedientes e ON e.id = p.id_expedientes
        WHERE e.abogado_id = :abogadoId
          AND e.activo     = 1
    ");
    $stmt->execute([':abogadoId' => $abogadoId]);
    $procesosActivos = (int) $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // ── 5. Expedientes recientes asignados al abogado ───────────────────────
    $stmt = $pdo->prepare("
        SELECT
            e.id,
            e.numero_expediente,
            e.titulo,
            e.fecha_actualizacion,
            ee.nombre AS estado,
            c.nombre  AS cliente_nombre
        FROM expedientes e
        INNER JOIN estados_expediente ee ON ee.id = e.estado_id
        LEFT JOIN cliente c ON c.id_expedientes = e.id
        WHERE e.abogado_id = :abogadoId
          AND e.activo     = 1
        ORDER BY e.fecha_actualizacion DESC
        LIMIT 5
    ");
    $stmt->execute([':abogadoId' => $abogadoId]);
    $expedientesRecientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // ── 6. Últimos documentos cargados en expedientes del abogado ──────────
    $stmt = $pdo->prepare("
        SELECT
            d.id,
            d.nombre_archivo,
            d.fecha_subida,
            e.numero_expediente,
            e.titulo  AS expediente_titulo,
            u.nombre  AS subido_por
        FROM documentos d
        INNER JOIN expedientes e ON e.id = d.expediente_id
        LEFT JOIN usuarios u     ON u.id = d.usuario_id
        WHERE e.abogado_id = :abogadoId
        ORDER BY d.fecha_subida DESC
        LIMIT 5
    ");
    $stmt->execute([':abogadoId' => $abogadoId]);
    $documentosRecientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    json_success([
        'kpis' => [
            'total_expedientes'      => $totalExpedientes,
            'expedientes_por_estado' => $expedientesPorEstado,
            'total_documentos'       => $totalDocumentos,
            'procesos_activos'       => $procesosActivos,
        ],
        'expedientes_recientes' => $expedientesRecientes,
        'documentos_recientes'  => $documentosRecientes,
    ]);

} catch (PDOException $e) {
    // No exponer detalles internos del error de BD al cliente
    json_error('Error al consultar la información del dashboard.', 500);
} catch (Throwable $e) {
    json_error('Ocurrió un error inesperado al procesar la solicitud.', 500);
}
?>