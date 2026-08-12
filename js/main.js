/**
 * main.js
 * Lógica de la pantalla de Sign In.
 *
 * Responsabilidades:
 *  1. Si ya hay sesión activa, redirigir al dashboard.
 *  2. Gestionar el selector visual de rol (demo buttons).
 *  3. Validar el formulario antes del submit.
 *  4. Llamar a auth.login() y redirigir al dashboard si es exitoso.
 */

'use strict';

// =============================================================================
// Redirección si ya está autenticado
// =============================================================================

if (isAuthenticated()) {
  window.location.replace('pages/cliente/dashboard.html');
}

// =============================================================================
// MÓDULO: Role Selector
// =============================================================================

const RoleSelector = (() => {

  const ACTIVE_CLASS   = 'btn--primary';
  const INACTIVE_CLASS = 'btn--secondary';

  const init = () => {
    const roleButtons = document.querySelectorAll('.form__demo .btn');
    if (!roleButtons.length) return;

    roleButtons.forEach((btn) => {
      btn.addEventListener('click', () => _setActive(btn, roleButtons));
    });
  };

  const _setActive = (activeBtn, allButtons) => {
    allButtons.forEach((btn) => {
      const isActive = btn === activeBtn;
      btn.classList.toggle(ACTIVE_CLASS,   isActive);
      btn.classList.toggle(INACTIVE_CLASS, !isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
  };

  return { init };

})();

// =============================================================================
// MÓDULO: FormValidator + Auth
// =============================================================================

const FormValidator = (() => {

  const MESSAGES = {
    emailEmpty:    'Please enter your email address.',
    emailInvalid:  'Please enter a valid email address.',
    passwordEmpty: 'Please enter your password.',
    passwordShort: 'Password must be at least 6 characters.',
    authFailed:    'Invalid email or password.',
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const init = () => {
    const form = document.querySelector('.form');
    if (!form) return;

    form.addEventListener('submit', _handleSubmit);

    // Limpiar errores mientras el usuario escribe
    form.querySelectorAll('.form__input').forEach((input) => {
      input.addEventListener('input', () => _clearError(input));
    });
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    const emailInput    = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const emailValid    = _validateEmail(emailInput);
    const passwordValid = _validatePassword(passwordInput);

    if (!emailValid || !passwordValid) return;

    // Intentar autenticación
    const result = login(emailInput.value, passwordInput.value);

    if (!result.ok) {
      _showError(emailInput,    MESSAGES.authFailed);
      _showError(passwordInput, MESSAGES.authFailed);
      return;
    }

    // Determinar destino según el rol del botón seleccionado
    const submitter = e.submitter
      || document.querySelector('.form__demo .btn--primary');
    const role = submitter ? submitter.value : 'client';

    _redirectAfterLogin(role);
  };

  const _validateEmail = (input) => {
    const value = input.value.trim();
    if (!value)                      return _showError(input, MESSAGES.emailEmpty);
    if (!EMAIL_REGEX.test(value))    return _showError(input, MESSAGES.emailInvalid);
    _clearError(input);
    return true;
  };

  const _validatePassword = (input) => {
    const value = input.value;
    if (!value)              return _showError(input, MESSAGES.passwordEmpty);
    if (value.length < 6)   return _showError(input, MESSAGES.passwordShort);
    _clearError(input);
    return true;
  };

  const _showError = (input, message) => {
    const errorEl = document.getElementById(input.getAttribute('aria-describedby'));
    if (errorEl) errorEl.textContent = message;
    input.classList.add('form__input--error');
    input.setAttribute('aria-invalid', 'true');
    return false;
  };

  const _clearError = (input) => {
    const errorEl = document.getElementById(input.getAttribute('aria-describedby'));
    if (errorEl) errorEl.textContent = '';
    input.classList.remove('form__input--error');
    input.removeAttribute('aria-invalid');
  };

  /**
   * Redirige al dashboard del rol correspondiente.
   * Cuando existan dashboards por rol, expandir este switch.
   *
   * @param {string} role
   */
  const _redirectAfterLogin = (role) => {
    // Por ahora todos los roles van al dashboard del cliente
    window.location.href = 'pages/cliente/dashboard.html';
  };

  return { init };

})();

// =============================================================================
// INICIO
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  RoleSelector.init();
  FormValidator.init();
});
