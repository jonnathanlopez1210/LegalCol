/**
 * shell.js
 * Inyecta y gestiona el shell compartido: navbar + sidebar.
 * Se carga en todas las páginas internas del cliente.
 *
 * Responsabilidades:
 *  1. Renderizar el HTML de navbar y sidebar (evita duplicación en cada HTML).
 *  2. Hidratar el nombre/rol del usuario desde la sesión.
 *  3. Marcar el nav-item activo con aria-current.
 *  4. Conectar el botón Sign out al módulo auth.logout().
 *  5. Conectar navegación de la navbar (notificaciones, perfil).
 *  6. Calcular rutas relativas para páginas según el rol del usuario.
 */

'use strict';

// ---------------------------------------------------------------------------
// HTML del shell compartido
// ---------------------------------------------------------------------------

const SHELL_HTML_BASE = `
  <header class="navbar" role="banner">
    <div class="logo" aria-label="LegalCol">
      <span class="logo__icon" aria-hidden="true"></span>
      <span class="logo__name">LegalCol</span>
    </div>

    <div class="navbar__search">
      <label class="visually-hidden" for="global-search">Search cases, clients, documents</label>
      <div class="search-input">
        <span class="search-input__icon" aria-hidden="true"></span>
        <input
          class="search-input__field"
          type="search"
          id="global-search"
          name="global-search"
          placeholder="Search cases, clients, documents..."
          autocomplete="off"
        />
      </div>
    </div>

    <nav class="role-switcher" aria-label="Switch portal role">
      <button class="role-switcher__btn role-switcher__btn--active" aria-pressed="true">Client</button>
      <button class="role-switcher__btn" aria-pressed="false">Lawyer</button>
      <button class="role-switcher__btn" aria-pressed="false">Admin</button>
    </nav>

    <div class="navbar__actions">
      <button class="navbar__notifications" aria-label="View notifications">
        <span class="navbar__notifications-icon" aria-hidden="true"></span>
      </button>
      <button class="navbar__user" aria-label="User menu">
        <span class="avatar avatar--sm" aria-hidden="true"></span>
        <span class="navbar__user-info">
          <span class="navbar__user-name">–</span>
          <span class="navbar__user-role">Client</span>
        </span>
      </button>
    </div>
  </header>

  <div class="dashboard-layout">
    <aside class="sidebar" aria-label="Client portal navigation">
      <p class="sidebar__label">Client Portal</p>
      <nav class="sidebar__nav" aria-label="Main navigation">
`;

const SHELL_HTML_END = `
      </nav>
      <button class="sidebar__signout" type="button">
        <span class="sidebar__signout-icon" aria-hidden="true"></span>
        <span class="sidebar__signout-text">Sign out</span>
      </button>
    </aside>
    <main class="dashboard-content" id="main-content">
`;

// El cierre del shell se añade al final del body
const SHELL_HTML_CLOSE = `
    </main>
  </div>
`;

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Inyecta el shell en el DOM y lo inicializa.
 * Debe llamarse antes de DOMContentLoaded para evitar el flash de contenido sin estilos,
 * o con DOMContentLoaded si el contenido de la página ya está en el #page-content.
 *
 * @param {string} activePage  'dashboard' | 'my-cases' | 'documents' | null
 */
function initShell(activePage) {
  _renderShell();
  _hydrateUser();
  _setActiveNavItem(activePage);
  _initSignOut();
  _initNotificationsLink();
  _initUserMenuLink();
}

// ---------------------------------------------------------------------------
// Renderizado del shell
// ---------------------------------------------------------------------------

/**
 * Envuelve el contenido existente del body con el shell (navbar + sidebar).
 * Añade la clase .app al body para aplicar el layout global.
 */
function _renderShell() {
  const body = document.body;

  // Aplicar clase de layout global al body
  body.classList.add('app');

  // Extrae el contenido actual del body (el contenido de la página)
  const pageContent = body.innerHTML;

  // Construir el HTML completo del shell
  const shellFull = SHELL_HTML_BASE + _getSidebarLinks() + SHELL_HTML_END;
  
  // Reemplaza el body con el shell + contenido
  body.innerHTML = shellFull + pageContent + SHELL_HTML_CLOSE;
}

// ---------------------------------------------------------------------------
// Hidratación del usuario
// ---------------------------------------------------------------------------

function _hydrateUser() {
  const session = getSession();
  if (!session) return;

  const nameEl = document.querySelector('.navbar__user-name');
  const roleEl = document.querySelector('.navbar__user-role');

  if (nameEl) nameEl.textContent = session.name;
  if (roleEl) roleEl.textContent =
    session.role.charAt(0).toUpperCase() + session.role.slice(1);
}

// ---------------------------------------------------------------------------
// Nav item activo
// ---------------------------------------------------------------------------

function _setActiveNavItem(activePage) {
  if (!activePage) return;

  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach((item) => {
    const nav = item.getAttribute('data-nav');
    const isActive = nav === activePage;

    item.classList.toggle('nav-item--active', isActive);
    if (isActive) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });
}

// ---------------------------------------------------------------------------
// Sign out
// ---------------------------------------------------------------------------

function _initSignOut() {
  const btn = document.querySelector('.sidebar__signout');
  if (!btn) return;
  btn.addEventListener('click', () => logout());
}

// ---------------------------------------------------------------------------
// Navegación navbar
// ---------------------------------------------------------------------------

function _initNotificationsLink() {
  const btn = document.querySelector('.navbar__notifications');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.location.href = _getPagePath('notificaciones.html');
  });
}

function _initUserMenuLink() {
  const btn = document.querySelector('.navbar__user');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.location.href = _getPagePath('perfil.html');
  });
}

// ---------------------------------------------------------------------------
// Generación de enlaces del sidebar
// ---------------------------------------------------------------------------

const _getSidebarLinks = (() => {
  // Cache para los enlaces por rol
  const linksCache = {};
  
  return () => {
    // Si ya calculamos los enlaces, usar cache
    if (Object.keys(linksCache).length > 0) {
      const session = getSession();
      const userRole = session ? session.role : 'client';
      return linksCache[userRole] || linksCache['client'];
    }
    
    // Obtener el rol de la sesión
    const session = getSession();
    const userRole = session ? session.role : 'client';
    
    // Definir enlaces por rol
    const roleLinks = {
      client: [
        { href: _getPagePath('dashboard.html'), dataNav: 'dashboard', text: 'Dashboard' },
        { href: _getPagePath('expedientes.html'), dataNav: 'my-cases', text: 'My Cases' },
        { href: _getPagePath('documentos.html'), dataNav: 'documents', text: 'Documents' }
      ],
      lawyer: [
        { href: _getPagePath('dashboard.html'), dataNav: 'dashboard', text: 'Dashboard' },
        { href: _getPagePath('expedientes.html'), dataNav: 'my-cases', text: 'Mis Expedientes' },
        { href: _getPagePath('documentos.html'), dataNav: 'documents', text: 'Documentos' }
      ],
      administrator: [
        { href: _getPagePath('dashboard.html'), dataNav: 'dashboard', text: 'Dashboard' },
        { href: _getPagePath('expedientes.html'), dataNav: 'my-cases', text: 'Expedientes' },
        { href: _getPagePath('documentos.html'), dataNav: 'documents', text: 'Documentos' }
      ]
    };
    
    // Generar HTML para el rol actual
    const roleLinksData = roleLinks[userRole] || roleLinks['client'];
    const linksHtml = roleLinksData.map(link => 
      `<a class="nav-item" href="${link.href}" data-nav="${link.dataNav}">
        <span class="nav-item__icon" aria-hidden="true"></span>
        <span class="nav-item__text">${link.text}</span>
      </a>`
    ).join('');
    
    // Guardar en cache
    Object.keys(roleLinks).forEach(role => {
      linksCache[role] = roleLinks[role].map(l => 
        `<a class="nav-item" href="${_getPagePath(l.dataNav === 'dashboard' ? 'dashboard.html' : l.dataNav === 'my-cases' ? 'expedientes.html' : 'documentos.html')}" data-nav="${l.dataNav}">
          <span class="nav-item__icon" aria-hidden="true"></span>
          <span class="nav-item__text">${l.text}</span>
        </a>`
      ).join('');
    });
    
    return linksHtml;
  };
})();

// ---------------------------------------------------------------------------
// Generación de rutas
// ---------------------------------------------------------------------------

/**
 * Calcula la ruta relativa a una página según el rol del usuario.
 * Detecta el rol actual desde la sesión o desde la URL.
 * 
 * Roles soportados:
 * - client:      pages/cliente/...
 * - lawyer:      pages/abogado/...
 * - administrator: pages/administrador/...
 *
 * @param {string} pageName  Nombre del archivo (e.g. 'perfil.html')
 * @returns {string}         Ruta relativa (e.g. 'pages/cliente/perfil.html')
 */
function _getPagePath(pageName) {
  // Obtener el rol de la sesión
  const session = getSession();
  const userRole = session ? session.role : 'client'; // Default a 'client'
  
  // Determinar el directorio del rol
  const roleDirectory = {
    client: 'cliente',
    lawyer: 'abogado',
    administrator: 'administrador'
  }[userRole] || 'cliente';
  
  // Determinar si estamos dentro de pages/rol/
  const path = window.location.pathname;
  const isInPages = path.includes('/pages/');
  
  if (!isInPages) {
    // Desde index.html o carpetas raíz
    return `pages/${roleDirectory}/${pageName}`;
  }
  
  // Desde pages/rol/ -> necesitamos apuntar a pages/rol/
  return `../${roleDirectory}/${pageName}`;
}
