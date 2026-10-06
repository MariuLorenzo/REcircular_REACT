import { Link } from 'react-router-dom';
import styles from './OrderSuccess.module.css';

export const OrderSuccess = ({ orden }) => {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <span className={styles.successIcon}>🎉</span>
        <h2>¡Felicitaciones por tu compra circular!</h2>
        <p className={styles.successText}>
          Tu pedido ha sido registrado con éxito. Te enviamos los detalles a{' '}
          <strong>{orden.email}</strong>.
        </p>
        <div className={styles.orderBadge}>
          <span>Código de Orden:</span>
          <strong>{orden.id}</strong>
        </div>
        <div className={styles.summaryBox}>
          <p><strong>Comprador:</strong> {orden.cliente}</p>
          <p><strong>Total abonado:</strong> ${orden.total.toLocaleString('es-AR')}</p>
          <p><strong>Prendas:</strong> {orden.articulos.length} artículos únicos</p>
        </div>
        <Link to="/productos" className="btn bg-primary">
          Seguir explorando la feria 🧥
        </Link>
      </div>
    </div>
  );
};
