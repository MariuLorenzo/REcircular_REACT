# 🧥 REcircular — E-Commerce SPA (Feria Americana Vintage)

Proyecto Final de E-Commerce desarrollado en **React 19** y **Vite**, estructurado como una **Single Page Application (SPA)** de alto rendimiento, modular y accesible.
Desarrollado entre Septiembre y Noviembre de 2026 para Talento Tech en República Argentina 🇦🇷.

[![Estado](https://img.shields.io/badge/STATUS-ENTREGA%20FINAL%20%2F%20PRODUCCI%C3%93N-brightgreen?style=for-the-badge)](#)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://recircular-react.vercel.app/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![React Router 7](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](#)

---

## 🎯 Objetivo y Propuesta de Valor
**REcircular** es una plataforma de comercio electrónico orientada a la moda sustentable y la economía circular. Especializada en indumentaria usada y tesoros textiles vintage (estilo feria americana), cada prenda cuenta una historia singular y cuenta con stock unitario.

El proyecto promueve:
* **Consumo Consciente**: Extensión del ciclo de vida de piezas originales de los años 70s, 80s, 90s y 2000s.
* **Experiencia de Usuario Fluida (SPA)**: Navegación instantánea sin recargas de página, optimizada para móviles y escritorio.
* **Gestión Integral en Tiempo Real**: Panel administrativo seguro para control de stock, catálogo y pedidos centralizados en la nube con Firebase.

---

## 👩‍💻 «AIE Creations by Mariu» — Autora
Soy **«Mariü»** (Mariela Lorenzo) y mi proyecto de desarrollo consciente se denomina **«AIE Creations»**.  
Combino la lógica del software, el diseño UX/UI y una sólida formación en humanidades para crear soluciones tecnológicas con propósito. Con un recorrido interdisciplinario que integra docencia, coaching, terapia, comunicación, marketing, producción y artes visuales, entiendo que el código informático y los mapas mentales estructuran la forma en que interactuamos con el mundo.

* **Autora**: Mariela Lorenzo ([@MariuLorenzo](https://github.com/MariuLorenzo))
* **Portfolio / GitHub**: [github.com/MariuLorenzo](https://github.com/MariuLorenzo)
* **LinkedIn**: [linkedin.com/in/mariu-lorenzo](https://www.linkedin.com/in/mariu-lorenzo/)
* **Contacto**: `mariulorenzo@gmail.com`
* **Despliegue en Producción**: [https://recircular-react.vercel.app/](https://recircular-react.vercel.app/)

---

## 🛠️ Stack Tecnológico y Herramientas

| Área | Tecnologías |
|---|---|
| **Frontend Core** | React 19, JavaScript (ES6+), HTML5 Semántico, CSS3 Modules (`.module.css`) |
| **Tooling & Build** | Vite 8, ESLint 10, npm |
| **Ruteo & Navegación** | React Router DOM v7 (rutas anidadas, `<Outlet />`, `useParams`, `useLocation`, `useNavigate`) |
| **Backend & Cloud Services** | **Google Firebase v12** (Authentication, Cloud Firestore, Cloud Storage) |
| **Gestión de Estado** | React Context API (`CartContext`, `AuthContext`) + Custom Hooks (`useCart`, `useAuth`, `useCheckout`) |
| **SEO & Metadatos** | React Helmet Async (`react-helmet-async`) |
| **Despliegue & Hosting** | Vercel (CI/CD automático vinculado a GitHub branch `main`) |
| **Diseño & Prototipado** | Figma, Canva, Adobe Photoshop |

---

## 🔥 Arquitectura e Integración con Firebase

La aplicación implementa una integración desacoplada y reactiva mediante una capa de servicios centralizada (`src/services/productService.js`) que interactúa con el SDK modular de Firebase:

```
┌─────────────────────────────────────────────────────────────────┐
│                       REcircular Frontend                       │
│                                                                 │
│   ┌─────────────────────┐             ┌─────────────────────┐   │
│   │    Catálogo / UI    │             │   Panel Admin / UI  │   │
│   │ (ItemListContainer) │             │ (ProductForm/List)  │   │
│   └──────────┬──────────┘             └──────────┬──────────┘   │
│              │                                   │              │
│              ▼                                   ▼              │
│       subscribeProducts()                 CRUD / Seed / Auth    │
└──────────────┼───────────────────────────────────┼──────────────┘
               │                                   │
               ▼                                   ▼
 ┌───────────────────────────┐       ┌───────────────────────────┐
 │   Cloud Firestore (NoSQL) │       │   Firebase Authentication │
 │   - Colección /productos  │       │   - Email / Password      │
 │   - Colección /ordenes    │       │   - Sesiones persistentes │
 └───────────────────────────┘       └───────────────────────────┘
```

### 1. Cloud Firestore (Base de Datos NoSQL en Tiempo Real)
* **Sincronización Reactiva (`onSnapshot`)**: El catálogo de prendas escucha cambios en tiempo real. Cualquier alta, modificación o baja ejecutada desde el panel administrativo impacta instantáneamente en la tienda de todos los usuarios sin necesidad de recargar la página (`F5`).
* **Colecciones Principales**:
  * `/productos`: Documentos con `nombre`, `precio`, `categoria`, `stock`, `talle`, `epoca`, `condicion`, `imagen`, `descripcion` y marca temporal `createdAt`.
  * `/ordenes`: Registro inmutable de compras con ticket (`#RC-XXXXXX`), datos del comprador (`cliente`, `email`, `telefono`, `direccion`), desglose de prendas adquiridas, total abonado y fecha.

### 2. Firebase Authentication (Seguridad y Acceso Administrativo)
* **Control de Acceso Basado en Contexto (`AuthContext`)**: Maneja el ciclo de vida de la sesión con `onAuthStateChanged`.
* **Rutas Privadas (`ProtectedRoute`)**: Intercepta intentos de acceso a `/admin`, redirigiendo automáticamente a `/login` si no existe una sesión válida.
* **Credenciales Oficiales del Administrador**:
  * **Email**: `admin@admin.com`
  * **Contraseña**: `admin123`

### 3. Firebase Cloud Storage
* Almacén de objetos multimedia para fotografías de nuevas prendas subidas desde el formulario del panel administrativo mediante `uploadBytes` y `getDownloadURL`.

### 4. Reglas de Seguridad Granulares
Firestore opera bajo reglas que balancean accesibilidad pública y resguardo administrativo:
* **Productos**: Lectura pública irrestricta (`allow read: if true`); escritura reservada a administradores autenticados (`allow write: if request.auth != null`).
* **Órdenes**: Creación pública permitida al concretar compras en el checkout (`allow create: if true`); lectura restringida exclusivamente a usuarios autenticados.

---

## ⚡ Modos de Carga y Resiliencia del Catálogo

Para garantizar una experiencia de usuario óptima en cualquier condición de red, la carga del catálogo implementa un **patrón híbrido de alta disponibilidad**:

1. **Carga Inmediata Local (Zero-Lag Fallback)**:  
   Al montar `ItemListContainer`, el sistema hidrata el catálogo en menos de 50 ms a partir de `public/productos.json`. Esto previene pantallas en blanco o bloqueos visuales si la conexión celular es inestable.
2. **Sincronización Cloud Prioritaria**:  
   En simultáneo, el listener de Firestore toma el control. Si la base de datos contiene documentos válidos, estos sobrescriben fluidamente el estado local con el stock más reciente.
3. **Semillado Asistido (One-Click Seed)**:  
   El panel de control incluye una rutina automatizada (`seedInitialCatalog`) que permite poblar la colección de Firestore con las 12 piezas vintage canónicas con un único clic desde la interfaz.

---

## 🚀 Requisitos Funcionales y Características Destacadas

### 🛍️ Experiencia del Cliente (Tienda Pública)
* **Búsqueda en Tiempo Real**: Filtrado dinámico mientras el usuario escribe, evaluando coincidencias en nombre, época o descripción.
* **Filtros por Categoría**: Selector adaptable por prendas (Abrigos, Pantalones, Remeras, Vestidos, etc.).
* **Paginación Dinámica**: Distribución controlada (8 prendas por página) con navegación anterior/siguiente y salto directo por número.
* **Ficha de Detalle de Prenda (`/producto/:id`)**: Consulta parametrizada con selector interactivo de unidades respetando el stock disponible.
* **Carrito Global Modular (Principio SRP)**:
  * Desacoplado en componentes especializados: `CartItem`, `CartEmpty`, `CheckoutForm`, `OrderSuccess`.
  * Contador dinámico en el `CartWidget` del encabezado.
  * Persistencia dual en `localStorage` (para no perder el carrito al cerrar la pestaña) y en Firestore al concretar la compra.
* **Checkout Sustentable**: Validación de formulario con generación de ticket de compra único y confirmación inmediata.
* **Mensajes Contextuales Cálidos**: Textos curados para moda circular (ej. *"✨ Ya encontró nuevo dueño"* en lugar del frío *"Sin stock"*).

### 🔐 Panel de Control Administrativo (`/admin`)
* **Layout Diferenciado (`AdminLayout`)**: Barra lateral exclusiva con información del usuario autenticado, accesos directos y cierre de sesión.
* **CRUD Completo de Inventario**:
  * **Creación**: Formulario controlado con validación de tipos, precio > 0, stock y selector de épocas.
  * **Edición**: Precarga automática de datos para modificaciones rápidas de precio o stock.
  * **Eliminación Segura**: Modal de confirmación (`DeleteConfirmModal`) previo a la baja definitiva.
* **Gestor de Órdenes**: Visualización en vivo de pedidos entrantes con datos de contacto, dirección de entrega y prendas solicitadas.

### 🌐 SEO Dinámico y Accesibilidad
* **Etiquetas Dinámicas con React Helmet**: Cada vista gestiona de forma autónoma su `<title>` y `<meta name="description">` para favorecer la indexación y usabilidad.
* **Soporte SPA en Servidor**: Reglas de reescritura en `vercel.json` y `public/_redirects` para que rutas directas (como `/admin` o `/producto/3`) respondan con código HTTP 200 sin recargas ni errores 404.

---

## 📂 Estructura del Proyecto

```
REcircular_REACT/
├── public/
│   ├── _redirects                     # Redirección SPA para hosting estático
│   ├── productos.json                 # Catálogo semilla inicial
│   └── img/                           # Logotipos, avatares y recursos gráficos
├── src/
│   ├── components/
│   │   ├── Admin/                     # Componentes del módulo de administración
│   │   │   ├── AdminLayout.jsx        # Layout con Sidebar administrativo
│   │   │   ├── AdminLayout.module.css
│   │   │   ├── DeleteConfirmModal.jsx # Modal accesible de confirmación
│   │   │   ├── OrdersList.jsx         # Visualizador de órdenes en tiempo real
│   │   │   ├── ProductForm.jsx        # Formulario controlado de alta/edición
│   │   │   └── ProductList.jsx        # Tabla con filtros, estados y acciones
│   │   ├── Cart/                      # Componentes desacoplados del carrito (SRP)
│   │   │   ├── CartEmpty.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CheckoutForm.jsx
│   │   │   └── OrderSuccess.jsx
│   │   ├── CartWidget/                # Widget reactivo en cabecera
│   │   ├── Footer/                    # Footer institucional y tarjetas del equipo
│   │   ├── Header/                    # Navegación principal con menú mobile
│   │   ├── Item/                      # Card individual de prenda en catálogo
│   │   ├── ItemDetail/                # Ficha extendida de producto
│   │   ├── ItemDetailContainer/       # Contenedor asíncrono con getDoc
│   │   ├── ItemList/                  # Grilla presentacional
│   │   ├── ItemListContainer/         # Contenedor con búsqueda, filtros y paginación
│   │   └── Layout/                    # PublicLayout para vistas de clientes
│   ├── context/
│   │   ├── AuthContext.jsx            # Autenticación global con Firebase Auth
│   │   └── CartContext.jsx            # Estado global del carrito y totales
│   ├── firebase/
│   │   └── firebase.js                # Inicialización modular (db, auth, storage)
│   ├── hooks/
│   │   └── useCheckout.js             # Lógica de procesamiento y guardado de compras
│   ├── pages/
│   │   ├── AdminPage.jsx              # Vista orquestadora del panel admin
│   │   ├── CartPage.jsx               # Vista dedicada del carrito
│   │   ├── CheckoutPage.jsx           # Vista de cierre de orden
│   │   ├── HomePage.jsx               # Landing page institucional y hero banner
│   │   └── LoginPage.jsx              # Formulario de acceso autenticado
│   ├── routes/
│   │   └── ProtectedRoute.jsx         # Guardián de rutas autenticadas
│   ├── services/
│   │   └── productService.js          # Capa de abstracción para Firestore / Storage
│   ├── App.jsx                        # Definición central de rutas y layouts
│   ├── index.css                      # Variables CSS y estilos base globales
│   └── main.jsx                       # Punto de entrada (Router, Helmet, Providers)
├── env.example.txt                    # Plantilla de variables de entorno
├── index.html                         # Documento raíz con lang="es" y tipografías
├── package.json                       # Dependencias y scripts
├── vercel.json                        # Configuración de despliegue en Vercel
└── vite.config.js                     # Configuración de compilación con Vite
```

---

## 💻 Instrucciones para Ejecución en Entorno Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/MariuLorenzo/REcircular_REACT.git
cd REcircular_REACT
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo de plantilla a `.env.local`:
```bash
cp env.example.txt .env.local
```
Completa las variables con las credenciales de tu proyecto en Firebase Console:
```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Iniciar en modo desarrollo
```bash
npm run dev
```
La aplicación quedará disponible en `http://localhost:5173/`.

### 5. Compilación para producción
```bash
npm run build
npm run preview
```

---

## 🌐 Despliegue en Producción (Vercel)

El proyecto cuenta con integración continua (**CI/CD**) en la plataforma **Vercel**:
* **URL de Producción**: [https://recircular-react.vercel.app/](https://recircular-react.vercel.app/)
* **Directorio de salida compilado**: `dist`
* **Ruteo de cliente**: Gestionado mediante reescrituras en `vercel.json` para soporte nativo de React Router en producción.

---

## 📄 Licencia y Contacto
Proyecto desarrollado por **Mariela Lorenzo** bajo licencia de autoría personal.

* 🌐 **Sitio Web**: [https://recircular-react.vercel.app/](https://recircular-react.vercel.app/)
* 💼 **LinkedIn**: [linkedin.com/in/mariu-lorenzo](https://www.linkedin.com/in/mariu-lorenzo/)
* 📧 **Email**: `mariulorenzo@gmail.com`

> *«La moda circular no es una tendencia del pasado, sino una decisión consciente hacia el futuro.»* ✨
