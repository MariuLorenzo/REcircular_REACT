import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      {/* Enlace accesible para saltar directo al contenido con teclado */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <Header />

      <main id="main-content" tabIndex="-1" role="main" className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
