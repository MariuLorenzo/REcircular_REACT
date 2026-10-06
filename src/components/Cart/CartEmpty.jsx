import { Link } from 'react-router-dom';
import styles from './CartEmpty.module.css';

export const CartEmpty = () => {
  return (
    <div className={styles.emptyContainer}>
      <span className={styles.emptyIcon}>🛍️</span>
      <h2>Tu bolsa de compras está vacía</h2>
      <p className="secondary">
        No tienes prendas seleccionadas todavía. Date una vuelta por el catálogo y descubrí ropa con historia.
      </p>
      <Link to="/productos" className="btn bg-pink">
        Explorar el Catálogo Vintage
      </Link>
    </div>
  );
};
