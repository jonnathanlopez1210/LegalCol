/**
 * perfil.js
 * Lógica específica de la página Profile.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell(null); // perfil no está en el sidebar nav
  _hydrateProfileForm();
  _initChangePasswordLink();
  _initDropdown();
});

/**
 * Rellena el formulario de perfil con los datos de la sesión activa.
 */
function _hydrateProfileForm() {
  const session = getSession();
  if (!session) return;

  const nameDisplay = document.querySelector('.profile-avatar-card__name');
  const nameInput   = document.getElementById('profile-name');
  const emailInput  = document.getElementById('profile-email');

  if (nameDisplay) nameDisplay.textContent = session.name;
  if (nameInput)   nameInput.value = session.name;
  if (emailInput)  emailInput.value = session.email;
}

/**
 * Conecta el botón "Change" de seguridad a la página de cambio de contraseña.
 */
function _initChangePasswordLink() {
  const btn = document.querySelector('[data-nav="change-password"]');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.location.href = 'configuracion.html';
  });
}

/**
 * Maneja los dropdowns del formulario (Timezone).
 */
function _initDropdown() {
  const triggers = document.querySelectorAll('.dropdown__trigger');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!isExpanded));
      const menu = trigger.nextElementSibling;
      if (menu) {
        if (isExpanded) menu.setAttribute('hidden', '');
        else menu.removeAttribute('hidden');
      }
    });
  });

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
