# NASA Juan Fernando Orjuela Samaca

> Aplicación de exploración espacial construida con React 19, TypeScript y las APIs públicas de la NASA.

**WEB desplegada en Vercel:** [https://nasa-fv73nwetf-juan-fernando-s-projects-0bbd0c58.vercel.app](https://nasa-fv73nwetf-juan-fernando-s-projects-0bbd0c58.vercel.app)

**Repositorio:** [https://github.com/JuanFernandoo/nasa-ado](https://github.com/JuanFernandoo/nasa-ado)

---

## Tabla de contenidos

- [Descripción general](#descripción-general)
- [Módulos](#módulos)
- [Arquitectura](#arquitectura)
- [Decisiones técnicas](#decisiones-técnicas)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y configuración](#instalación-y-configuración)
- [Variables de entorno](#variables-de-entorno)
- [Scripts disponibles](#scripts-disponibles)
- [Testing](#testing)
- [Rendimiento](#rendimiento)
- [Accesibilidad](#accesibilidad)
- [Seguridad](#seguridad)
- [Stencil Web Components](#stencil-web-components)
- [Notas sobre las APIs](#notas-sobre-las-apis)
- [Tradeoffs](#tradeoffs)
- [Mejoras futuras](#mejoras-futuras)

---

## Descripción general

NASA Juan Orjuela es una  exploración espacial que integra cuatro APIs públicas de la NASA en un solo producto. Construida con estándares de producción: arquitectura basada en features, TypeScript estricto, validación de schemas en runtime y una suite de tests completa.

---

## Módulos

| Ruta | Módulo | Descripción |
|---|---|---|
| `/apod` | Imagen de la nasa del día | Galería con filtros por rango de fechas, búsqueda por texto y modal de imagen  |
| `/mars` | Marte | Explorador por rover, fecha terrestre o Sol, filtro de cámara y favoritos persistentes |
| `/neo` | Objetos cercanos a la Tierra | Tabla de asteroides con ordenamiento por distancia/velocidad/diámetro y filtro de peligrosos |
| `/epic` | Imagenes EPIC de la tierra | Imágenes de la Tierra en color natural desde un satelite por fecha |
| `/favorites` | Favoritos de Marte | Galería de fotos del rover marte guardadas, con opción de limpiar todo |
| `/stencil` | Demo de Componentes | Librería de Web Components construida con Stencil.js e integrada en React |

---

## Arquitectura

### Arquitectura basada en features

Cada módulo es autónomo con su propia capa de API, componentes, hooks, schemas y tipos. Esto permite la evolución independiente de cada feature y una separación clara de responsabilidades.

```
src/
├── app/              # Router, providers, rutas lazy
├── features/
│   ├── apod/         # Módulo APOD — api, components, hooks, schemas, types
│   ├── mars/         # Módulo Mars Rover + store de favoritos
│   ├── neo/          # Módulo asteroides NeoWs
│   ├── epic/         # Módulo imágenes EPIC
│   └── stencil-demo/ # Página de demo de Web Components
├── shared/
│   ├── components/
│   │   ├── ui/       # UI reutilizable — Skeleton, ErrorPage, EmptyState
│   │   ├── layout/   # Navbar, RootLayout
│   │   └── wc/       # Wrappers React para los Web Components de Stencil
│   ├── hooks/        # useDebounce
│   └── utils/        # cn(), date.utils
├── lib/
│   ├── axios.ts      # Instancias Axios con interceptores
│   ├── env.ts        # Variables de entorno validadas con Zod
│   ├── endpoints.ts  # URLs base centralizadas de las APIs
│   └── query-client.ts # Configuración de React Query con backoff exponencial
├── store/            # Stores globales de Zustand
└── types/            # Declaraciones TypeScript globales
```

### Manejo de estado

**Estado del servidor** — React Query gestiona todos los datos de las APIs: caché, refetch en segundo plano, estados de carga/error y deduplicación de requests. El caché se configura por módulo según la volatilidad de los datos (1h para APOD, 10min para Marte).

**Estado del cliente** — Zustand gestiona el estado de la UI y los favoritos de Mars. El store de favoritos usa el middleware `persist` para sincronización automática con localStorage.

### Capa de API

Todos los clientes HTTP están centralizados en `src/lib/axios.ts`. Cada cliente tiene interceptores de error que normalizan los errores HTTP (429, 403, 5xx) en instancias tipadas de `Error`. La API key se inyecta globalmente mediante un interceptor de request — nunca se hardcodea en el código de los features.

### Validación de schemas

Cada respuesta de API se valida en runtime con Zod antes de entrar a la aplicación. Los tipos se infieren directamente de los schemas (`z.infer<typeof schema>`) — sin declaraciones de tipos duplicadas.

---

## Decisiones técnicas

### React Query en lugar de useEffect + fetch

`useEffect` para fetching introduce condiciones de carrera, memory leaks al desmontar componentes y gestión manual de estados de carga/error. React Query maneja todo esto automáticamente con una API declarativa, caché inteligente e integración con AbortController mediante el parámetro `signal`.

### Zustand en lugar de Redux Toolkit

Redux Toolkit agrega ~15KB al bundle. Para las necesidades de estado cliente de esta aplicación (favoritos + estado de UI), Zustand proporciona la misma seguridad de TypeScript con ~1KB y una API mínima. 

### Tailwind CSS en lugar de CSS Modules

Tailwind elimina el cambio de contexto entre archivos TSX y CSS para estilos a nivel de componente. CSS Modules son preferibles para librerías de componentes aislados, por eso los Web Components de Stencil usan CSS puro con custom properties.

### Axios en lugar de fetch nativo

Axios proporciona interceptores de request/response para inyección global de la API key, manejo consistente de errores en todos los requests, configuración de timeout y una integración más limpia.

### Zod para validación en runtime

Las APIs públicas de la NASA ocasionalmente devuelven campos nulos o cambian la forma de sus respuestas. Zod valida cada respuesta antes de que entre a la app, proporcionando un límite de error claro en la capa de API en lugar de un crash silencioso en un componente.

---

## Stack tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| React | 19 | Librería de UI |
| TypeScript | 6 | Tipado estático estricto |
| Vite | 8 | Build tool y servidor de desarrollo |
| React Query | 5 | Gestión de estado del servidor |
| Zustand | 5 | Gestión de estado del cliente |
| React Router | 7 | Enrutamiento con lazy loading |
| Tailwind CSS | 4 | Estilos utility-first |
| Axios | 1.16 | Cliente HTTP con interceptores |
| Zod | 4 | Validación de schemas en runtime |
| Vitest | 4 | Test runner |
| Testing Library | 16 | Tests de componentes e integración |
| MSW | 2 | Mocking de APIs en tests |
| Stencil | 4 | Librería de Web Components |
| Husky + lint-staged | — | Pre-commit hooks |
| ESLint + Prettier | — | Linting y formateo |

---

## Instalación y configuración

### Prerequisitos

- Node.js 20 LTS o superior
- npm 10+

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanFernandoo/nasa-ado.git
cd nasa-ado
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env
```

Abre `.env` y agrega tu API key de la NASA:

```env
VITE_NASA_API_KEY=api_de_la_NASA
VITE_NASA_BASE_URL=https://api.nasa.gov
```
### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app corre en [http://localhost:5173](http://localhost:5173)

---

## Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `VITE_NASA_API_KEY` | Sí | API key de la NASA obtenida en api.nasa.gov |

Las variables se validan al iniciar la app con Zod — si `VITE_NASA_API_KEY` está ausente o vacía, la app lanza un error descriptivo antes de realizar cualquier llamada a la API.

---

## Scripts disponibles

```bash
# Desarrollo
npm run dev           # Inicia el servidor de desarrollo en localhost:5173
npm run build         # Verificación TypeScript + build de producción
npm run preview       # Preview del build de producción localmente

# Calidad de código
npm run lint          # ESLint con reglas TypeScript estrictas
npm run lint:fix      # ESLint con corrección automática
npm run format        # Formateo Prettier en todos los archivos

# Testing
npm run test          # Vitest en modo watch
npm run test:run      # Ejecuta todos los tests una vez
npm run test:ui       # Interfaz visual de Vitest en el navegador
npm run test:coverage # Reporte de cobertura de tests
```

---

## Testing

### Estrategia

Los tests se enfocan en **comportamiento, no en implementación**. Cada test responde: "¿esto funciona correctamente desde la perspectiva del usuario?"

MSW (Mock Service Worker) intercepta los requests HTTP a nivel de red — los tests nunca dependen de la API real de la NASA, del rate limit ni de la conectividad a internet.

### Cobertura

```
Archivos de test: 7
Tests:            60 pasando

├── tests/unit/
│   ├── date.utils.test.ts       (8 tests)  — Funciones utilitarias puras
│   ├── favorites.store.test.ts  (9 tests)  — Comportamiento del store Zustand
│   └── neo.api.test.ts          (6 tests)  — Transformación de datos de la API
│
├── tests/components/
│   ├── ApodCard.test.tsx        (10 tests) — Renderizado, interacciones, a11y
│   └── AsteroidTable.test.tsx   (8 tests)  — Tabla, ordenamiento, estado vacío
│
└── tests/integration/
    └── apod.flow.test.tsx       (15 tests) — Flujo completo de usuario: carga,
                                              búsqueda, modal, estados de error
```

### Ejecutar tests

```bash
# Ejecutar todos los tests
npm run test:run

# Ejecutar una suite específica
npm run test:run -- tests/unit
npm run test:run -- tests/components
npm run test:run -- tests/integration

# Modo watch durante el desarrollo
npm run test

# Interfaz visual
npm run test:ui
```

### Infraestructura de tests

- **Handlers MSW** — definidos en `tests/mocks/handlers.ts` usando constantes centralizadas de `ENDPOINTS`
- **Fixtures** — tipados con tipos inferidos de Zod, usando URLs reales de la API de la NASA y datos realistas
- **Aislamiento** — cada test resetea los handlers de MSW y el estado del store de Zustand mediante `beforeEach`

---

## Rendimiento

### Code splitting

Cada ruta se carga de forma lazy con `React.lazy()` y se envuelve en `Suspense` con un skeleton de fallback. Donde cada módulo se descarga bajo demanda.


### Estrategia de caché

| Módulo | staleTime | gcTime | Razonamiento |
|---|---|---|---|
| APOD | 1 hora | 30 min | Contenido diario, cambia una vez por día |
| Marte Rover | 10 min | 30 min | Datos históricos, estables |
| Asteroides Cerrcanos | 1 hora | 30 min | Datos de asteroides semanales |
| EPIC | 1 hora | 30 min | Imágenes satelitales diarias |

### Optimizaciones adicionales

- `loading="lazy"` y `decoding="async"` en todas las imágenes
- `useDebounce` (400ms) en la búsqueda de texto de APOD — evita un request por tecla
- `useMemo` para datos filtrados/ordenados — evita recálculo en renders no relacionados
- `AbortController` via el parámetro `signal` de React Query — cancela requests en vuelo al desmontar
- Backoff exponencial en reintentos — `Math.min(1000 * 2^intento, 10000)`
- `refetchOnWindowFocus: false` — los datos de la NASA no cambian en cada cambio de pestaña

---

## Accesibilidad

- Navegación completa por teclado en todos los elementos interactivos
- Anillo `focus-visible` en cada elemento enfocable
- Roles ARIA: `dialog`, `alert`, `status`, `button`, `region`, `img`
- `aria-label` en todos los botones de icono e imágenes
- `aria-pressed` en botones de toggle (modo de fecha, dirección de orden, favoritos)
- HTML semántico — `<nav>`, `<main>`, `<article>`, `<section>`, `<time>`, `<caption>`

---

## Seguridad

- La API key se almacena exclusivamente en `.env` (en gitignore)
- Variables de entorno validadas al iniciar — la app falla rápido con un error claro si la key falta
- Sin exposición de la API key en el código cliente fuera del interceptor de Axios
- `rel="noopener noreferrer"` en todos los enlaces externos

---

## Stencil Web Components

Librería de componentes UI construida con Stencil.js, ubicada en `packages/stencil/`.

### Componentes

| Componente | Tag | Descripción |
|---|---|---|
| ApodCard | `<apod-card>` | Cuadro de imagen astronómica con evento de click |
| NeoBadge | `<neo-badge>` | Estado de asteroide con distancia y velocidad |
| MarsPhotoCard | `<mars-photo-card>` | Cuadro de foto del rover Marte con opción de favorito |

### Construir la librería

```bash
cd packages/stencil
npm install
npm run build
```

---

## Notas sobre las APIs

### Mars Rover Photos API

La NASA archivó oficialmente el endpoint de Mars Rover Photos (`/mars-photos/api/v1/`) en 2026. Esta app usa [Nebulum](https://rovers.nebulum.one) como reemplazo — replica el mismo contrato de API con datos provenientes de NASA JPL. Si la NASA restaura el endpoint original, solo se necesita actualizar la URL base en `src/lib/endpoints.ts`.

### EPIC API

La API de EPIC migró de `api.nasa.gov/EPIC` a `epic.gsfc.nasa.gov` en 2025. Esta app usa el endpoint actual. 

React Query reintenta los requests fallidos hasta 2 veces con backoff exponencial. Los errores de rate limit (429) se muestran al usuario con un mensaje claro.

---

## Tradeoffs

**Zustand vs Redux Toolkit** — Redux proporciona mejores DevTools y time-travel debugging para estado complejo. Para las necesidades de esta app, la simplicidad de Zustand supera esos beneficios. Redux sería la elección correcta en un equipo grande o con estado compartido más complejo.

**CSS en lugar de Tailwind en Stencil** — Las clases generadas por Tailwind no penetran el Shadow DOM. CSS puro con custom properties es el enfoque correcto para Web Components y habilita el theming desde la app host.

---

## Autor

Desarrollado por Juan Fernando Orjuela Samaca