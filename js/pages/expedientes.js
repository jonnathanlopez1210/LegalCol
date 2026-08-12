/**
 * expedientes.js
 * Lógica específica de la página My Cases (Expedientes).
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell('my-cases');
  _initFilterTabs();
  _initCaseRowNavigation();
});

/**
 * Maneja los botones de filtro All / Active / Closed.
 */
function _initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('filter-tab--active');
        t.setAttribute('aria-pressed', 'false');
      });
      tab.classList.add('filter-tab--active');
      tab.setAttribute('aria-pressed', 'true');
    });
  });
}

/**
 * Permite hacer clic en una fila de la tabla para ir al detalle del caso.
 */
function _initCaseRowNavigation() {
  const rows = document.querySelectorAll('.data-table__row[data-nav="case-detail"]');

  rows.forEach((row) => {
    row.addEventListener('click', () => {
      window.location.href = 'detalle-expediente.html';
    });

    // Accesibilidad: tecla Enter también navega
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') window.location.href = 'detalle-expediente.html';
    });
  });
}
