
---

# 🧥 REcircular — E-Commerce SPA (Feria Americana Vintage)

Proyecto Final de E-Commerce desarrollado en **React** y **Vite**, estructurado como una **Single Page Application (SPA)** de alto rendimiento, modular y accesible.
Este proyecto está desarrollado en Septiembre de 2026 para Talento Tech en República Argentina 🇦🇷 :argentina: 😉 

---

## 🎯 Objetivo y Temática
REcircular es una tienda online de ropa usada y tesoros textiles vintage 
(estilo "feria americana"), donde cada prenda cuenta una historia y tiene un stock limitado. Fomenta el consumo de "circular", de moda sustentable y la resignificación de piezas de los años 70s, 80s, 90s y 2000s.

---
#
## **«AIE Creations by Mariu»**  ✨

Soy «Mariü» y mi proyecto de desarrollo consciente se llama «AIE Creations».<br>
Combino la lógica del software, el diseño UX/UI y una sólida formación en humanidades para crear soluciones tecnológicas con propósito. En mi vida profesional hice un recorrido interdisciplinario que incluye docencia, coaching, terapia, comunicación, marketing, producción y artes visuales. Desde esa mirada holística, entiendo que el código informático y los mapas mentales comparten una misma esencia: estructuran la forma en que interactuamos con el mundo. <br>
Hoy transformo esa versatilidad en productos digitales funcionales, humanos y sostenibles, aportando una perspectiva empática, curiosa y orientada a resolver problemas reales. 

#
## **Autora** ✒️

* **Mariela Lorenzo** = [MariuLorenzo](https://github.com/MariuLorenzo)

<img src="https://avatars.githubusercontent.com/u/114081375?v=4" width=115><br><sub> Mariü Lorenzo </sub>

#
## Desarrollo del Proyecto 💡
#
* [MariuLorenzo](https://github.com/MariuLorenzo)

* [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](#)

#
## Despliegue 📦
#

https://recircular-react.vercel.app/

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](http://shields.io/)

#
## Versiones - Repositorio 📌
#

[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)](#)

https://github.com/MariuLorenzo/REcircular_REACT

---

#
## Ejecutando las pruebas ⚙️
#

![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)

#
## Construido con 🛠️
#

* [![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
* ![CSS](https://img.shields.io/badge/CSS-563d7c?&style=flat&logo=css3&logoColor=white)
* [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
* [![React](https://shields.io)](https://reactjs.org)
* [![Vite](https://shields.io)](https://vitejs.dev)
* [![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=visualstudiocode&logoColor=white)](#)
* [![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)](#)
* [![Canva](https://custom-icon-badges.demolab.com/badge/Canva-%2300C4CC.svg?&logo=canva&logoColor=white)](#)
* [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff)](#)
* [![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?logo=GoogleChrome&logoColor=white)](#)
* [![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#)
* [![Git](https://img.shields.io/badge/github-repo-blue?logo=github)](#)

#
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
#
# Instalación 🔧

El formato de la página es _responsive_ 🖥️💻📱

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
El proyecto está desplegado en **Vercel** 
- Comando de compilación: `npm run build`
- Directorio de salida: `dist`

---

#
## Licencia 📄
#
®️ Este proyecto está bajo mi Licencia ©️ 

😊 holis !  
[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama)

Contacta con la autora para detalles:

* [![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff)](#)
https://www.linkedin.com/in/mariu-lorenzo/ 

* [![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)](#)
📧​ Mail: mariulorenzo@gmail.com

#
## Expresiones de Gratitud 🎁

* Expande buenas vibras 📢💫
* Da las gracias a diario 🤓💬!!

[![saythanks](https://img.shields.io/badge/say-thanks-ff69b4.svg)](https://saythanks.io/to/kennethreitz)

* Haz comunidad 🥰
* Construye un futuro próspero y empático para el mundo ❤️🌎

---
 
«Ahora sé más de lo que sabía...el tiempo fluye como líquido entre mis manos.»

---

## Hi there👋
🔭 I'm currently working on becoming the best version of myself.

🌱 I'm currently learning software development.

👯 I'm looking to collaborate on interesting projects.

🤔 I'm looking for help with "fixing the world."

💬 Ask me about...anything (?)

📫 How to contact me: mariulorenzo@gmail.com

😄 Pronouns: She.

⚡ Fun fact: My favorite place is water. I love to swim.

<!--**MariuLorenzo/MariuLorenzo** is a ✨ _special_ ✨ repository because you can read it in its READ-ME-->