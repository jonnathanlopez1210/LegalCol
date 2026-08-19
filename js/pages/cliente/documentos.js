/**
 * documentos.js
 * Lógica específica de la página Documents.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell('documents');
  _initDropzone();
  _initDropdown();
});

/**
 * Maneja el estado visual del dropzone (drag over / drag leave).
 */
function _initDropzone() {
  const dropzone = document.querySelector('.dropzone');
  if (!dropzone) return;

  ['dragenter', 'dragover'].forEach((evt) => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add('dropzone--active');
    });
  });

  ['dragleave', 'drop'].forEach((evt) => {
    dropzone.addEventListener(evt, () => {
      dropzone.classList.remove('dropzone--active');
    });
  });
}

/**
 * Maneja la apertura/cierre del dropdown "Filter by case".
 */
function _initDropdown() {
  const triggers = document.querySelectorAll('.dropdown__trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isExpanded));

      const menu = trigger.nextElementSibling;
      if (menu) {
        if (isExpanded) {
          menu.setAttribute('hidden', '');
        } else {
          menu.removeAttribute('hidden');
        }
      }
    });
  });

  // Cerrar dropdowns al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      triggers.forEach((trigger) => {
        trigger.setAttribute('aria-expanded', 'false');
        const menu = trigger.nextElementSibling;
        if (menu) menu.setAttribute('hidden', '');
      });
    }
  });
}
