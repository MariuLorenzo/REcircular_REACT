# 🧥 REcircular — E-Commerce SPA (Feria Americana Vintage)

Proyecto Final de E-Commerce desarrollado en **React** y **Vite**, estructurado como una **Single Page Application (SPA)** de alto rendimiento, modular y accesible.

---

## 🎯 Objetivo y Temática
REcircular es una tienda online de ropa usada y tesoros textiles vintage 
(estilo "feria americana"), donde cada prenda cuenta una historia y tiene un stock limitado. Fomenta el consumo de "circular", de moda sustentable y la resignificación de piezas de los años 70s, 80s, 90s y 2000s.

---

## 🚀 Requisitos y Características Implementadas

### 1. Requisitos Funcionales (RF)
- **Carga Asíncrona de Catálogo**: Consumo de datos desde `/productos.json` (ubicado en `public/`) mediante `fetch` asíncrono y simulación de latencia de red en `ItemListContainer`.
- **Navegación Declarativa (SPA)**: Navegación instantánea y sin recarga de página mediante `react-router-dom`:
  - `/`: Página de inicio con hero banner, propuesta de valor y accesos directos.
  - `/productos`: Catálogo completo con filtrado dinámico por categorías.
  - `/producto/:id`: Vista de detalle individual parametrizada.
  - `/carrito`: Vista del carrito de compras con resumen, subtotal y total.
- **Gestión Global del Carrito**:
  - `addToCart(producto, cantidad)` con validación de stock disponible.
  - Actualización reactiva y en tiempo real del badge en el `CartWidget` (`getCartQuantity`).
  - Cálculo de subtotales individuales y total acumulado (`getCartTotal`).
  - `clearCart()` para vaciar el carrito y controles para aumentar o disminuir unidades.
  - Simulación de checkout con formulario y generación de orden de compra.
- **Información Corporativa**:
  - Encabezado con navegación accesible y `CartWidget`.
  - Pie de página institucional con valores de marca, contacto y **3 tarjetas completas del equipo curador**.

### 2. Requisitos Técnicos y Arquitectura (RT & RA)
- **Patrón Contenedor / Presentacional (Smart vs. Dumb components)**:
  - `ItemListContainer` (manejo de estado y llamadas asíncronas) ➡️ `ItemList` (mapeador) ➡️ `Item` (tarjeta unitaria).
  - `ItemDetailContainer` (extracción de parámetros con `useParams` y fetching condicional) ➡️ `ItemDetail` (interfaz de producto con contador de stock).
- **Ciclo de Vida y Side Effects**: Uso estricto de `useEffect` con dependencias vacías `[]` para la carga inicial y `[id]` para la sincronización del detalle dinámico.
- **Context API**: `CartContext` con `createContext`, `CartProvider` y el custom hook `useCart` para evitar el *prop drilling*.
- **Estilos Modulares**: CSS Modules (`.module.css`) en todos los componentes para encapsular estilos y evitar colisiones globales.
- **Buenas Prácticas**: Convención `PascalCase`, exportaciones nombradas (`export const`), claves únicas `key={prod.id}` e inmutabilidad en el manejo de estado.

---

## 📂 Estructura del Proyecto

```
├── public/
│   └── productos.json              <-- Catálogo vintage simulado
├── src/
│   ├── components/
│   │   ├── CartWidget/             <-- Ícono de bolsa con badge condicional
│   │   ├── Footer/                 <-- Información corporativa + 3 tarjetas staff
│   │   ├── Header/                 <-- Barra de navegación y accesos
│   │   ├── Item/                   <-- Tarjeta de producto con stock y botón agregar
│   │   ├── ItemDetail/             <-- Vista detallada con selector de cantidad
│   │   ├── ItemDetailContainer/    <-- Contenedor del detalle con fetch por ID
│   │   ├── ItemList/               <-- Grilla mapeadora con key obligatoria
│   │   ├── ItemListContainer/      <-- Contenedor del catálogo y filtros
│   │   └── Layout/                 <-- Layout común con Outlet
│   ├── context/
│   │   └── CartContext.jsx         <-- Context API, Provider y hook useCart
│   ├── pages/
│   │   ├── CartPage.jsx            <-- Vista del carrito y checkout
│   │   └── HomePage.jsx            <-- Vista principal de bienvenida
│   ├── App.jsx                     <-- Configuración de rutas (Routes / Route)
│   ├── index.css                   <-- Reseteo y variables de diseño globales
│   └── main.jsx                    <-- Entrada principal (BrowserRouter + CartProvider)
├── package.json
└── vite.config.js
```

---

## 💻 Instrucciones para Ejecutar en Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Construir para producción**:
   ```bash
   npm run build
   ```

4. **Previsualizar la versión de producción**:
   ```bash
   npm run preview
   ```

---

## 🌐 Despliegue en la Nube
El proyecto está preparado para desplegarse fácilmente en **Vercel** o **Netlify**:
- Comando de compilación: `npm run build`
- Directorio de salida: `dist`