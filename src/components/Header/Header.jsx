import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CartWidget } from '../CartWidget/CartWidget';
import styles from './Header.module.css';

export const Header = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

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
        <Link to="/" className={styles.logoLink} onClick={cerrarMenu}>
          <img
            src="/img/logo-recircular.png"
            alt="Recircular — Feria Americana"
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
        </nav>

        {/* CartWidget siempre visible */}
        <div className={styles.cartWrapper}>
          <Link
            to="/carrito"
            className={`${styles.cartLink} ${isActive('/carrito') ? styles.activeCart : ''}`}
            onClick={cerrarMenu}
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
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>
        <nav className={styles.drawerNav}>
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
        </nav>
        <div className={styles.drawerFooter}>
          <p>Moda circular & piezas únicas</p>
        </div>
      </div>

      {/* Backdrop overlay para cerrar el menú */}
      {menuAbierto && (
        <div className={styles.backdrop} onClick={cerrarMenu} />
      )}
    </header>
  );
};
