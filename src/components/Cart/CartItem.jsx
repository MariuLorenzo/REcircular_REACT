import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './CartItem.module.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const subtotal = item.precio * item.cantidad;

  return (
    <div className={styles.cartItem}>
      <img
        src={item.imagen}
        alt={item.nombre}
        className={styles.itemImage}
      />
      <div className={styles.itemDetails}>
        <Link to={`/producto/${item.id}`} className={styles.itemTitle}>
          {item.nombre}
        </Link>
        <span className={styles.itemMeta}>
          Talle: {item.talle || 'Único'} | {item.categoria}
        </span>
        <span className={styles.itemPrice}>
          Unitario: ${item.precio.toLocaleString('es-AR')}
        </span>
      </div>

      {/* Controles de Cantidad */}
      <div className={styles.quantityControls}>
        <div className={styles.stepper}>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.cantidad - 1)}
            className={styles.stepBtn}
            title="Disminuir"
            aria-label="Disminuir cantidad"
          >
            -
          </button>
          <span className={styles.stepQty}>{item.cantidad}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
            disabled={item.cantidad >= item.stock}
            className={styles.stepBtn}
            title={item.cantidad >= item.stock ? 'Stock máximo alcanzado' : 'Aumentar'}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        {item.cantidad >= item.stock && (
          <span className={styles.stockLimit}>Máx stock</span>
        )}
      </div>

      {/* Subtotal */}
      <div className={styles.subtotalCol}>
        <span className={styles.subtotalLabel}>Subtotal:</span>
        <span className={styles.subtotalValue}>
          ${subtotal.toLocaleString('es-AR')}
        </span>
      </div>

      {/* Eliminar ítem */}
      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        className={styles.removeBtn}
        title="Eliminar del carrito"
        aria-label={`Eliminar ${item.nombre}`}
      >
        ✕
      </button>
    </div>
  );
};
