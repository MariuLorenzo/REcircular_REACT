import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './ItemDetail.module.css';

export const ItemDetail = ({ producto }) => {
  const { id, nombre, precio, stock, imagen, descripcion, categoria, talle, epoca, condicion } = producto;
  const { addToCart, cart } = useCart();

  const itemEnCarrito = cart.find((item) => item.id === id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
  const stockRestante = stock - cantidadEnCarrito;

  const [cantidad, setCantidad] = useState(stockRestante > 0 ? 1 : 0);
  const [agregado, setAgregado] = useState(false);

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad((prev) => prev - 1);
    }
  };

  const incrementar = () => {
    if (cantidad < stockRestante) {
      setCantidad((prev) => prev + 1);
    }
  };

  const handleAgregar = () => {
    if (cantidad > 0 && cantidad <= stockRestante) {
      addToCart(producto, cantidad);
      setAgregado(true);
    }
  };

  const sinStock = stockRestante <= 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Columna Izquierda: Imagen de la prenda */}
        <div className={styles.imageCol}>
          <img src={imagen} alt={nombre} className={styles.image} />
          {epoca && <span className={styles.tagEpoca}>✨ {epoca}</span>}
          {categoria && <span className={styles.tagCategoria}>{categoria}</span>}
        </div>

        {/* Columna Derecha: Información y Compra */}
        <div className={styles.infoCol}>
          <h1 className={styles.title}>{nombre}</h1>
          <p className={styles.price}>${precio.toLocaleString('es-AR')}</p>

          <div className={styles.metaBox}>
            {talle && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Talle disponible:</span>
                <span className={styles.metaValue}>{talle}</span>
              </div>
            )}
            {condicion && (
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Estado/Condición:</span>
                <span className={styles.metaValue}>{condicion}</span>
              </div>
            )}
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Stock disponible:</span>
              <span
                className={`${styles.metaValue} ${
                  sinStock ? styles.outOfStock : ''
                }`}
              >
                {sinStock
                  ? 'Agotado'
                  : `${stockRestante} unidad${stockRestante > 1 ? 'es' : ''}`}
              </span>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3>Curaduría y Detalles</h3>
            <p>{descripcion}</p>
          </div>

          {/* Panel de Compra */}
          <div className={styles.purchaseBox}>
            {!agregado ? (
              <>
                <div className={styles.counterRow}>
                  <span className={styles.counterLabel}>Cantidad:</span>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      onClick={decrementar}
                      disabled={cantidad <= 1 || sinStock}
                      className={styles.counterBtn}
                      aria-label="Restar una unidad"
                    >
                      -
                    </button>
                    <span className={styles.counterValue}>{cantidad}</span>
                    <button
                      type="button"
                      onClick={incrementar}
                      disabled={cantidad >= stockRestante || sinStock}
                      className={styles.counterBtn}
                      aria-label="Sumar una unidad"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAgregar}
                  disabled={sinStock}
                  className={`btn bg-primary ${styles.addToCartBtn}`}
                >
                  {sinStock ? 'Sin stock disponible' : '🛍️ Agregar al Carrito'}
                </button>
              </>
            ) : (
              <div className={styles.addedFeedback}>
                <p className={styles.successMessage}>
                  🎉 ¡Agregaste {cantidad} {cantidad === 1 ? 'prenda' : 'prendas'} al carrito!
                </p>
                <div className={styles.feedbackButtons}>
                  <Link to="/carrito" className="btn bg-secondary">
                    Ir al Carrito
                  </Link>
                  <Link to="/productos" className="btn" style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', color: 'var(--text)' }}>
                    Seguir explorando
                  </Link>
                </div>
              </div>
            )}

            {cantidadEnCarrito > 0 && !agregado && (
              <p className={styles.alreadyInCart}>
                ℹ️ Ya tienes {cantidadEnCarrito} en tu carrito.
              </p>
            )}
          </div>

          <Link to="/productos" className={styles.backLink}>
            ← Volver al catálogo completo
          </Link>
        </div>
      </div>
    </div>
  );
};
