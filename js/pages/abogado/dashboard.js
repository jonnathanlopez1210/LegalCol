/**
 * dashboard.js
 * Lógica específica de la página Dashboard del abogado.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell('dashboard');
  
  // Hidrata el saludo con el nombre del usuario
  const session = getSession();
  if (session) {
    const titleEl = document.querySelector('#dashboard-title');
    if (titleEl) {
      titleEl.textContent = `Bienvenido, ${session.name}`;
    }
  }
});
