/**
 * configuracion.js
 * Lógica específica de la página Change Password.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initShell(null);
  _initPasswordForm();
  _initBreadcrumb();
});

/**
 * Valida y procesa el formulario de cambio de contraseña.
 */
function _initPasswordForm() {
  const form = document.querySelector('.form[aria-label="Change password form"]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentPwd = document.getElementById('current-password');
    const confirmPwd = document.getElementById('confirm-password');
    const newPwd     = document.getElementById('new-password');

    let valid = true;

    // Validación simple de desarrollo
    if (!currentPwd.value) {
      _showFieldError(currentPwd, 'Please enter your current password.');
      valid = false;
    } else {
      _clearFieldError(currentPwd);
    }

    if (!newPwd.value || newPwd.value.length < 6) {
      _showFieldError(newPwd, 'New password must be at least 6 characters.');
      valid = false;
    } else {
      _clearFieldError(newPwd);
    }

    if (confirmPwd.value !== newPwd.value) {
      _showFieldError(confirmPwd, 'Passwords do not match.');
      valid = false;
    } else {
      _clearFieldError(confirmPwd);
    }

    if (valid) {
      // TODO: conectar con backend
      console.info('[LegalCol] Password change requested (dev mode – not persisted)');
      window.location.href = _getPagePath('perfil.html');
    }
  });
}

function _showFieldError(input, message) {
  const errorId = input.getAttribute('aria-describedby');
  const errorEl = errorId ? document.getElementById(errorId) : null;
  if (errorEl) errorEl.textContent = message;
  input.classList.add('form__input--error');
  input.setAttribute('aria-invalid', 'true');
}

function _clearFieldError(input) {
  const errorId = input.getAttribute('aria-describedby');
  const errorEl = errorId ? document.getElementById(errorId) : null;
  if (errorEl) errorEl.textContent = '';
  input.classList.remove('form__input--error');
  input.removeAttribute('aria-invalid');
}

/**
 * Conecta el breadcrumb "← Back to My Profile".
 */
function _initBreadcrumb() {
  const link = document.querySelector('.breadcrumb__link[data-nav="profile"]');
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = _getPagePath('perfil.html');
    });
  }
}
