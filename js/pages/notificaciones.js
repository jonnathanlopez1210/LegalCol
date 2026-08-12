/**
 * notificaciones.js
 * Lógica específica de la página Notifications.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell(null); // notificaciones no está en el sidebar nav
  _initMarkAllRead();
});

/**
 * Marca todas las notificaciones como leídas.
 */
function _initMarkAllRead() {
  const markAllBtn = document.querySelector('[data-action="mark-all-read"]');
  if (!markAllBtn) return;

  markAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const unread = document.querySelectorAll('.notification-item--unread');
    unread.forEach((item) => {
      item.classList.remove('notification-item--unread');
      const dot = item.querySelector('.notification-item__dot');
      if (dot) dot.classList.add('notification-item__dot--read');
    });
  });
}
