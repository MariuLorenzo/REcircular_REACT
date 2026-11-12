import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Item.module.css';

export const Item = ({ producto = {} }) => {
  const {
    id,
    nombre = 'Prenda Vintage',
    precio = 0,
    stock = 1,
    imagen = '/img/logo-recircular.png',
    epoca,
    talle,
  } = producto;
  const { addToCart, cart } = useCart();

  // Cantidad ya en el carrito para verificar stock disponible
  const itemEnCarrito = cart.find((item) => item.id === id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const stockRestante = (Number(stock) || 0) - cantidadEnCarrito;
  const sinStock = stockRestante <= 0;

  const handleQuickAdd = () => {
    if (!sinStock) {
      addToCart(producto, 1);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imagen || '/img/logo-recircular.png'}
          alt={nombre}
          className={styles.image}
          loading="lazy"
        />
        {epoca && <span className={styles.badgeEpoca}>{epoca}</span>}
        {talle && <span className={styles.badgeTalle}>Talle {talle}</span>}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={nombre}>
          {nombre}
        </h3>

        <div className={styles.pricingRow}>
          <span className={styles.price}>
            ${Number(precio || 0).toLocaleString('es-AR')}
          </span>
          <span
            className={`${styles.stock} ${
              sinStock ? styles.stockLow : stockRestante <= 1 ? styles.stockLow : ''
            }`}
          >
            {sinStock ? '✨ Pieza vendida' : stockRestante === 1 ? '¡Última unidad!' : `Disponibles: ${stockRestante}`}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`btn bg-primary ${styles.addButton}`}
            onClick={handleQuickAdd}
            disabled={sinStock}
            title={sinStock ? 'Esta prenda vintage ya encontró nuevo dueño' : 'Agregar al carrito'}
          >
            {sinStock ? 'Ya reservada' : '🛒 Agregar'}
          </button>

          <Link to={`/producto/${id}`} className={styles.detailLink}>
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
};
