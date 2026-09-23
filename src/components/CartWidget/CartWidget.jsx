import { useCart } from '../../context/CartContext';
import styles from './CartWidget.module.css';

export const CartWidget = () => {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();

  return (
    <div className={styles.widget} aria-label="Carrito de compras">
      <span className={styles.icon} role="img" aria-label="bolsa de compras">
        🛍️
      </span>
      {totalItems > 0 && (
        <span className={styles.badge} aria-label={`${totalItems} prendas en el carrito`}>
          {totalItems}
        </span>
      )}
    </div>
  );
};
