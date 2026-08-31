/**
 * main.js
 * Lógica de la pantalla de Sign In.
 *
 * Responsabilidades:
 *  1. Si ya hay sesión activa, redirigir al dashboard correspondiente al rol.
 *  2. Validar el formulario antes del submit.
 *  3. Llamar a auth.login() y redirigir al dashboard según el rol del usuario autenticado.
 */

'use strict';

// =============================================================================
// Redirección si ya está autenticado
// =============================================================================

if (isAuthenticated()) {
  const session = getSession();
  window.location.replace(_getDashboardForRole(session.role));
}

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

    // Intentar autenticación — login() crea la sesión en sessionStorage
    const result = login(emailInput.value, passwordInput.value);

    if (!result.ok) {
      _showError(emailInput,    MESSAGES.authFailed);
      _showError(passwordInput, MESSAGES.authFailed);
      return;
    }

    // Leer el rol desde la sesión recién creada por login()
    const session = getSession();
    window.location.href = _getDashboardForRole(session.role);
  };

  const _validateEmail = (input) => {
    const value = input.value.trim();
    if (!value)                   return _showError(input, MESSAGES.emailEmpty);
    if (!EMAIL_REGEX.test(value)) return _showError(input, MESSAGES.emailInvalid);
    _clearError(input);
    return true;
  };

  const _validatePassword = (input) => {
    const value = input.value;
    if (!value)            return _showError(input, MESSAGES.passwordEmpty);
    if (value.length < 6)  return _showError(input, MESSAGES.passwordShort);
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

  return { init };

})();

// =============================================================================
// UTILIDAD: Ruta del dashboard según el rol
// =============================================================================

/**
 * Devuelve la ruta al dashboard correspondiente al rol del usuario.
 * El rol proviene siempre de la sesión autenticada, nunca de un botón.
 *
 * @param {string} role  'client' | 'lawyer' | 'administrator'
 * @returns {string}     Ruta relativa al dashboard del rol.
 */
function _getDashboardForRole(role) {
  const dashboards = {
    client:        'pages/cliente/dashboard.html',
    lawyer:        'pages/abogado/dashboard.html',
    administrator: 'pages/administrador/dashboard.html',
  };
  return dashboards[role] || dashboards.client;
}

// =============================================================================
// INICIO
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  FormValidator.init();
});
