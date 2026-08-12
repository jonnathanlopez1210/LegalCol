/**
 * detalle-expediente.js
 * Lógica específica de la página Case Detail.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell('my-cases');
  _initTabs();
  _initBreadcrumb();
});

/**
 * Maneja la navegación entre tabs (Overview / Documents / Timeline / Invoices).
 */
function _initTabs() {
  const tabs   = document.querySelectorAll('.tab-nav__tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Desactivar todos
      tabs.forEach((t) => {
        t.classList.remove('tab-nav__tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.setAttribute('hidden', ''));

      // Activar el seleccionado
      tab.classList.add('tab-nav__tab--active');
      tab.setAttribute('aria-selected', 'true');
      const panelId = tab.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) panel.removeAttribute('hidden');
    });
  });
}

/**
 * Conecta el breadcrumb "← Back to My Cases".
 */
function _initBreadcrumb() {
  const link = document.querySelector('.breadcrumb__link[data-nav="my-cases"]');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'expedientes.html';
    });
  }
}
