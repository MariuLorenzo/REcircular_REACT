import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { CartWidget } from '../CartWidget/CartWidget';
import styles from './Header.module.css';

export const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();
  const { theme, cambiarTema, infoTema, THEMES } = useTheme();

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const cerrarMenu = () => setMenuAbierto(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Botón Hamburguesa para Mobile (< 400px) */}
        <button
          type="button"
          className={styles.hamburgerBtn}
          onClick={toggleMenu}
          aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={menuAbierto}
        >
          <span className={styles.hamburgerIcon}>{menuAbierto ? '✕' : '☰'}</span>
        </button>

        {/* Logo Oficial de la App Recircular */}
        <Link to="/" className={styles.logoLink} onClick={cerrarMenu} aria-label="REcircular - Ir al inicio">
          <img
            src="/img/logo-recircular.png"
            alt="Logotipo de REcircular Feria Americana Vintage"
            className={styles.logoImg}
          />
        </Link>

        {/* Navegación Desktop & Tablet (> 400px) */}
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          <Link
            to="/"
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            className={`${styles.navLink} ${isActive('/productos') ? styles.active : ''}`}
          >
            Catálogo
          </Link>
          <Link
            to="/admin"
            className={`${styles.navLink} ${isActive('/admin') ? styles.active : ''}`}
            title="Panel de Administración"
          >
            {currentUser ? '⚙️ Admin' : '🔐 Ingresar'}
          </Link>
        </nav>

        {/* Controles de Accesibilidad y Modo de Color */}
        <div className={styles.themeControls} aria-label="Selector de tema">
          {/* Cartel Indicador del Modo Actual */}
          <span
            className={styles.themeBadge}
            role="status"
            aria-live="polite"
            title={`Modo actual: ${infoTema.label}`}
          >
            <span aria-hidden="true">{infoTema.icon}</span> {infoTema.label}
          </span>

          {/* Selector accesible de Modos */}
          <select
            value={theme}
            onChange={(e) => cambiarTema(e.target.value)}
            className={styles.themeSelect}
            aria-label="Cambiar modo"
            title="Cambiar entre Modo ecología, Modo claro o Modo oscuro"
          >
            <option value={THEMES.ECOLOGIA}>Modo ecología 🌱</option>
            <option value={THEMES.CLARO}>Modo claro ☀️</option>
            <option value={THEMES.OSCURO}>Modo oscuro 🌙</option>
          </select>
        </div>

        {/* CartWidget siempre visible */}
        <div className={styles.cartWrapper}>
          <Link
            to="/carrito"
            className={`${styles.cartLink} ${isActive('/carrito') ? styles.activeCart : ''}`}
            onClick={cerrarMenu}
            aria-label="Ver carrito de compras"
            title="Ver carrito de compras"
          >
            <CartWidget />
          </Link>
        </div>
      </div>

      {/* Drawer / Menú Desplegable Mobile (< 400px) */}
      <div
        className={`${styles.mobileDrawer} ${menuAbierto ? styles.drawerOpen : ''}`}
        aria-hidden={!menuAbierto}
      >
        <div className={styles.drawerHeader}>
          <img
            src="/img/logo-recircular.png"
            alt="Recircular"
            className={styles.drawerLogoImg}
          />
          <button
            type="button"
            className={styles.closeDrawerBtn}
            onClick={cerrarMenu}
            aria-label="Cerrar menú de navegación"
          >
            ✕
          </button>
        </div>

        {/* Indicador y Selector de Modo en Mobile */}
        <div className={styles.mobileThemeArea}>
          <span className={styles.themeBadge} role="status" aria-live="polite">
            <span aria-hidden="true">{infoTema.icon}</span> {infoTema.label}
          </span>
          <select
            value={theme}
            onChange={(e) => cambiarTema(e.target.value)}
            className={styles.themeSelect}
            aria-label="Cambiar modo en móvil"
          >
            <option value={THEMES.ECOLOGIA}>Modo ecología 🌱</option>
            <option value={THEMES.CLARO}>Modo claro ☀️</option>
            <option value={THEMES.OSCURO}>Modo oscuro 🌙</option>
          </select>
        </div>

        <nav className={styles.drawerNav} aria-label="Navegación móvil">
          <Link
            to="/"
            className={`${styles.drawerLink} ${isActive('/') ? styles.drawerActive : ''}`}
            onClick={cerrarMenu}
          >
            🏠 Inicio
          </Link>
          <Link
            to="/productos"
            className={`${styles.drawerLink} ${isActive('/productos') ? styles.drawerActive : ''}`}
            onClick={cerrarMenu}
          >
            🧥 Catálogo / Ropa
          </Link>
          <Link
            to="/carrito"
            className={`${styles.drawerLink} ${isActive('/carrito') ? styles.drawerActive : ''}`}
            onClick={cerrarMenu}
          >
            🛍️ Mi Carrito
          </Link>
          <Link
            to="/admin"
            className={`${styles.drawerLink} ${isActive('/admin') ? styles.drawerActive : ''}`}
            onClick={cerrarMenu}
          >
            {currentUser ? '⚙️ Panel Admin' : '🔐 Ingreso Admin'}
          </Link>
        </nav>
        <div className={styles.drawerFooter}>
          <p>Moda circular & piezas únicas</p>
        </div>
      </div>

      {/* Backdrop overlay para cerrar el menú */}
      {menuAbierto && (
        <div className={styles.backdrop} onClick={cerrarMenu} aria-hidden="true" />
      )}
    </header>
  );
};
