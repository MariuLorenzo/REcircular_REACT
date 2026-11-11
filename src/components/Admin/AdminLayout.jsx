import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLayout.module.css';

export const AdminLayout = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar Lateral */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <img src="/img/logo-recircular.png" alt="REcircular Logo" className={styles.logo} />
          <div>
            <h2 className={styles.brandTitle}>REcircular</h2>
            <span className={styles.brandBadge}>Panel Admin</span>
          </div>
        </div>

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {currentUser?.email ? currentUser.email[0].toUpperCase() : 'A'}
          </div>
          <div className={styles.userDetails}>
            <p className={styles.userName}>Administrador</p>
            <p className={styles.userEmail} title={currentUser?.email}>
              {currentUser?.email}
            </p>
          </div>
        </div>

        <nav className={styles.navMenu}>
          <Link
            to="/admin"
            className={`${styles.navItem} ${
              location.pathname === '/admin' ? styles.activeNavItem : ''
            }`}
          >
            <span className={styles.navIcon}>📦</span>
            <span>Gestión de Catálogo</span>
          </Link>

          <Link to="/" className={styles.navItem} target="_blank" rel="noopener noreferrer">
            <span className={styles.navIcon}>🛍️</span>
            <span>Ver Tienda Pública ↗</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
            <span className={styles.navIcon}>🚪</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};
