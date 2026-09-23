import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Item.module.css';

export const Item = ({ producto }) => {
  const { id, nombre, precio, stock, imagen, epoca, talle } = producto;
  const { addToCart, cart } = useCart();

  // Cantidad ya en el carrito para verificar stock disponible
  const itemEnCarrito = cart.find((item) => item.id === id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const stockRestante = stock - cantidadEnCarrito;
  const sinStock = stockRestante <= 0;

  const handleQuickAdd = () => {
    if (!sinStock) {
      addToCart(producto, 1);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imagen} alt={nombre} className={styles.image} loading="lazy" />
        {epoca && <span className={styles.badgeEpoca}>{epoca}</span>}
        {talle && <span className={styles.badgeTalle}>Talle {talle}</span>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={nombre}>
          {nombre}
        </h3>

        <div className={styles.pricingRow}>
          <span className={styles.price}>
            ${precio.toLocaleString('es-AR')}
          </span>
          <span
            className={`${styles.stock} ${
              stockRestante <= 1 ? styles.stockLow : ''
            }`}
          >
            {sinStock ? 'Sin stock' : `Stock: ${stockRestante}`}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`btn bg-primary ${styles.addButton}`}
            onClick={handleQuickAdd}
            disabled={sinStock}
            title={sinStock ? 'Sin stock disponible' : 'Agregar al carrito'}
          >
            {sinStock ? 'Agotado' : '🛒 Agregar'}
          </button>

          <Link to={`/producto/${id}`} className={styles.detailLink}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
};
