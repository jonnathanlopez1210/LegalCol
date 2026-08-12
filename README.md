# LegalCol — Case Management Platform

Plataforma web de gestión de casos legales desarrollada como proyecto académico del SENA. Permite a clientes consultar el estado de sus casos, gestionar documentos, revisar notificaciones y administrar su perfil personal.

---

## Descripción

LegalCol es una aplicación web estática orientada al portal del cliente de un despacho jurídico. Su propósito es centralizar la información legal de cada cliente en un único lugar, permitiendo visualizar casos activos, documentos asociados, citas y acciones pendientes sin depender de comunicación por correo o llamadas.

El proyecto actualmente implementa:

- Pantalla de inicio de sesión con autenticación simulada por sesión (`sessionStorage`)
- Portal del cliente con 7 páginas independientes
- Protección de rutas del lado del cliente mediante guard
- Cierre de sesión con limpieza completa de la sesión
- Estilos compilados desde SCSS con arquitectura de componentes

> La autenticación es temporal y funciona completamente del lado del cliente. No requiere servidor ni base de datos.

---

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de todas las páginas |
| CSS3 | Estilos finales compilados (`css/main.css`) |
| Sass / SCSS | Escritura de estilos con arquitectura de componentes |
| JavaScript (ES6+) | Lógica de autenticación, navegación y componentes |
| Node.js | Entorno de ejecución para compilar Sass |
| NPM | Gestor de paquetes y scripts de construcción |
| Git | Control de versiones |
| GitHub | Repositorio remoto y colaboración del equipo |

---

## Requisitos previos

Antes de clonar y ejecutar el proyecto, asegúrate de tener instaladas las siguientes herramientas.

### Node.js y NPM

Node.js incluye NPM automáticamente. Para verificar si están instalados:

```bash
node -v
npm -v
```

Si no están instalados, descarga Node.js desde: https://nodejs.org

### Git

```bash
git --version
```

Si no está instalado, descarga Git desde: https://git-scm.com

---

## Clonar el repositorio

```bash
git clone https://github.com/jonnathanlopez1210/LegalCol.git
```

Entrar a la carpeta del proyecto:

```bash
cd LegalCol
```

---

## Instalación de dependencias

Una vez dentro de la carpeta del proyecto, instala las dependencias:

```bash
npm install
```

Este comando descarga Sass y sus dependencias internas en la carpeta `node_modules/`. Esta carpeta **no se sube al repositorio** porque está incluida en `.gitignore`. Siempre debes ejecutar `npm install` después de clonar el proyecto o después de que un compañero agregue nuevas dependencias.

---

## Scripts de NPM

El archivo `package.json` define los siguientes scripts:

### `npm run sass`

```bash
npm run sass
```

**Qué ejecuta:**
```
sass scss/main.scss css/main.css --style=compressed --no-source-map
```

**Para qué sirve:** Compila el archivo `scss/main.scss` y genera `css/main.css` en formato comprimido (optimizado para producción).

**Cuándo usarlo:** Antes de hacer commit o cuando quieras generar el CSS final listo para entrega.

---

### `npm run sass:watch`

```bash
npm run sass:watch
```

**Qué ejecuta:**
```
sass scss/main.scss css/main.css --watch --style=expanded --no-source-map
```

**Para qué sirve:** Observa cambios en los archivos SCSS en tiempo real y recompila automáticamente `css/main.css` en formato expandido (legible, útil durante desarrollo).

**Cuándo usarlo:** Durante el desarrollo. Déjalo corriendo en segundo plano mientras editas los archivos `.scss`. Termínalo con `Ctrl + C` cuando termines de trabajar.

---

## Ejecución del proyecto

El proyecto es completamente estático. No requiere servidor para ejecutarse. Sigue estos pasos después de instalar las dependencias:

### Paso 1 — Compilar los estilos

Si es la primera vez que ejecutas el proyecto, o si los archivos SCSS fueron modificados, compila el CSS:

```bash
npm run sass
```

### Paso 2 — Iniciar el modo watch (desarrollo)

Durante el desarrollo, activa el modo watch para que los estilos se actualicen automáticamente:

```bash
npm run sass:watch
```

### Paso 3 — Abrir el proyecto en el navegador

Abre el archivo `index.html` directamente en el navegador, o usa la extensión **Live Server** de Visual Studio Code para recargado automático.

### Credenciales de prueba

El proyecto incluye usuarios de desarrollo definidos en `js/auth/users.js`:

| Campo | Valor |
|---|---|
| Correo | `johan.evelio@legalcol.test` |
| Contraseña | `123456` |

| Campo | Valor |
|---|---|
| Correo | `jhondoe@email.com` |
| Contraseña | `123456` |

> Estos datos son exclusivamente para desarrollo. Nunca deben usarse en producción.

---

## Estructura del proyecto

```
LegalCol/
│
├── css/
│   └── main.css                  # CSS compilado (generado por Sass, no editar directamente)
│
├── js/
│   ├── auth/
│   │   ├── auth.js               # Gestión de sesión con sessionStorage
│   │   ├── guard.js              # Protección de rutas (redirige al login si no hay sesión)
│   │   └── users.js              # Usuarios de prueba para desarrollo
│   ├── components/
│   │   └── shell.js              # Inyecta navbar y sidebar en todas las páginas del dashboard
│   ├── pages/
│   │   ├── dashboard.js          # Lógica de la página Dashboard
│   │   ├── expedientes.js        # Lógica de la página My Cases
│   │   ├── detalle-expediente.js # Lógica del detalle de un caso
│   │   ├── documentos.js         # Lógica de la página Documents
│   │   ├── perfil.js             # Lógica de la página Profile
│   │   ├── notificaciones.js     # Lógica de la página Notifications
│   │   └── configuracion.js      # Lógica de Change Password
│   └── main.js                   # Lógica de la pantalla de Sign In
│
├── pages/
│   └── cliente/
│       ├── dashboard.html        # Vista principal del cliente
│       ├── expedientes.html      # Lista de casos
│       ├── detalle-expediente.html # Detalle de un caso
│       ├── documentos.html       # Gestión de documentos
│       ├── perfil.html           # Perfil del usuario
│       ├── notificaciones.html   # Notificaciones
│       └── configuracion.html    # Cambio de contraseña
│
├── scss/
│   ├── abstracts/
│   │   ├── _index.scss           # Re-exportación de variables y mixins
│   │   ├── _variables.scss       # Tokens de diseño (colores, tipografía, espaciado)
│   │   └── _mixins.scss          # Mixins reutilizables (breakpoints, flexbox, etc.)
│   ├── base/
│   │   ├── _reset.scss           # Reset de estilos globales
│   │   └── _typography.scss      # Clases de utilidad tipográfica
│   ├── components/               # 21 archivos de componentes SCSS (BEM)
│   ├── layout/
│   │   ├── _auth.scss            # Layout de la pantalla de login
│   │   └── _dashboard.scss       # Layout del shell de la aplicación
│   └── main.scss                 # Punto de entrada principal de Sass
│
├── index.html                    # Página de inicio de sesión (raíz del proyecto)
├── package.json                  # Configuración de NPM y scripts
├── package-lock.json             # Versiones exactas de dependencias
└── .gitignore                    # Archivos y carpetas excluidos del repositorio
```

---

## Dependencias

El proyecto solo tiene dependencias de desarrollo. No tiene dependencias de producción (`dependencies`).

### `devDependencies`

| Paquete | Versión | Descripción |
|---|---|---|
| `sass` | `^1.99.0` | Compilador Dart Sass para procesar archivos `.scss` |

---

## Flujo de trabajo con Git y GitHub

### Estructura de ramas

```
main
├── jonnathan
├── johan
├── juan
└── david
```

- **`main`** contiene la versión estable y revisada del proyecto.
- **Cada integrante trabaja exclusivamente en su propia rama.**
- No se realizan cambios directamente sobre `main`.
- Los cambios se integran mediante Pull Request.

---

## Comandos Git del flujo de trabajo

### 1. Clonar el repositorio

```bash
git clone https://github.com/jonnathanlopez1210/LegalCol.git
cd LegalCol
```

### 2. Actualizar información del repositorio remoto

```bash
git fetch origin
```

`git fetch` descarga los cambios del repositorio remoto sin aplicarlos a tu rama local. Úsalo para ver qué cambios existen antes de integrarlos.

```bash
git pull origin main
```

`git pull` descarga y aplica directamente los cambios de `main` a tu rama local. Úsalo cuando quieras actualizar tu rama con los cambios más recientes.

### 3. Crear una rama de trabajo

Siempre crea tu rama a partir de `main` actualizado:

```bash
git checkout main
git pull origin main
git checkout -b nombre-rama
```

También puedes usar la sintaxis moderna:

```bash
git switch main
git pull origin main
git switch -c nombre-rama
```

### 4. Ver ramas disponibles

```bash
git branch
```

### 5. Ver el estado de los cambios

```bash
git status
```

### 6. Preparar los cambios para commit

```bash
git add .
```

### 7. Crear un commit

Usa una convención de commits descriptiva:

```bash
git commit -m "feat: agregar módulo de expedientes"
git commit -m "fix: corregir validación del formulario de login"
git commit -m "style: ajustar espaciado en la navbar"
git commit -m "refactor: reorganizar módulos de autenticación"
git commit -m "docs: actualizar README con instrucciones de instalación"
git commit -m "chore: actualizar dependencias de desarrollo"
```

**Tipos de commit:**

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad o pantalla |
| `fix` | Corrección de un error |
| `style` | Cambios de estilos CSS/SCSS sin lógica |
| `refactor` | Mejora de código sin cambiar comportamiento |
| `docs` | Cambios en documentación |
| `chore` | Tareas de mantenimiento (dependencias, configuración) |

### 8. Subir cambios al repositorio remoto

La primera vez que subes una rama nueva:

```bash
git push -u origin nombre-rama
```

El flag `-u` establece la rama remota como seguimiento predeterminado. A partir de ese momento puedes usar simplemente:

```bash
git push
```

---

## Pull Request

El flujo completo para integrar cambios a `main` es:

```
Actualizar main
      ↓
Crear o usar tu rama personal
      ↓
Realizar los cambios
      ↓
git add .
      ↓
git commit -m "tipo: descripción"
      ↓
git push
      ↓
Crear Pull Request en GitHub (desde tu rama → main)
      ↓
Revisión por otro integrante del equipo
      ↓
Merge a main
```

Cada integrante crea el Pull Request desde su rama personal hacia `main` en GitHub.

---

## Actualizar tu rama antes de continuar trabajando

Antes de continuar con nuevas tareas, sincroniza tu rama con los cambios que ya fueron integrados a `main`:

```bash
git checkout main
git pull origin main
git checkout nombre-rama
git merge main
```

Si hay conflictos, Git te indicará qué archivos resolver. Después de resolverlos:

```bash
git add .
git commit -m "chore: merge main en nombre-rama"
```

---

## Solución de problemas comunes

### `npm install` falla o tarda demasiado

- Verifica tu conexión a internet.
- Asegúrate de estar dentro de la carpeta del proyecto (`cd LegalCol`).
- Si hay errores de permisos en Windows, abre la terminal como administrador.

### La carpeta `node_modules` no existe

Ejecuta `npm install`. Nunca se sube al repositorio porque está en `.gitignore`.

### Los estilos no se aplican en el navegador

- Verifica que existe el archivo `css/main.css`. Si no existe, ejecuta `npm run sass`.
- Asegúrate de que el HTML carga `css/main.css` y no un archivo `.scss` directamente.

### Sass reporta errores al compilar

- Revisa la terminal para ver el archivo y la línea exacta del error.
- Verifica que todos los parciales estén importados en `scss/main.scss`.
- Asegúrate de que cada archivo `.scss` de componente tenga `@use '../abstracts' as *;` al inicio.

### El login redirige al dashboard sin ingresar credenciales

Si ya existe una sesión activa en `sessionStorage`, el login redirige automáticamente. Para empezar desde cero, abre las herramientas de desarrollo del navegador (`F12`) → pestaña **Application** → **Session Storage** → elimina la clave `legalcol_session`.

### Accedo directamente a una página del dashboard y me redirige al login

Esto es el comportamiento esperado. El `guard.js` protege todas las páginas internas. Debes iniciar sesión primero desde `index.html`.

### Conflictos al hacer `git merge main`

- Abre los archivos marcados con conflicto (`<<<<<<`, `======`, `>>>>>>`).
- Decide qué versión conservar.
- Guarda el archivo, ejecuta `git add .` y luego `git commit`.

### No puedo hacer push a `main` directamente

Correcto. `main` está protegida. Debes crear un Pull Request desde tu rama personal.

---

## Reglas importantes para el equipo

1. **No trabajar directamente sobre `main`.** Siempre usa tu rama personal.
2. **Cada integrante trabaja exclusivamente en su propia rama.**
3. **Mantén tu rama actualizada** con `git merge main` antes de continuar trabajando.
4. **Los commits deben ser descriptivos.** Usa la convención de tipos definida arriba.
5. **No subas `node_modules`** al repositorio. Está en `.gitignore` por una razón.
6. **No subas archivos `.env`** ni ningún archivo con información sensible.
7. **Crea un Pull Request** antes de integrar tus cambios a `main`.
8. **Revisa el Pull Request** de tus compañeros antes de aprobar el merge.
9. **No modifiques configuraciones del proyecto** (como `scss/main.scss`, `package.json` o la estructura de carpetas) sin comunicarlo al equipo primero.
10. **Ejecuta `npm run sass`** antes de hacer commit si modificaste archivos SCSS, para asegurarte de que `css/main.css` esté actualizado.

---

## Licencia

Actualmente no se ha definido una licencia para este proyecto.
