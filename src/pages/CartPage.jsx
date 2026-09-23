import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartQuantity,
  } = useCart();

  const [ordenGenerada, setOrdenGenerada] = useState(null);
  const [comprando, setComprando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const total = getCartTotal();
  const cantidadTotal = getCartQuantity();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    const nuevoIdOrden = `RC-${Date.now().toString().slice(-6)}`;
    setOrdenGenerada({
      id: nuevoIdOrden,
      cliente: formData.nombre,
      email: formData.email,
      total,
      articulos: [...cart],
    });
    clearCart();
    setComprando(false);
  };

  // Render condicional: Orden confirmada
  if (ordenGenerada) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>🎉</span>
          <h2>¡Felicitaciones por tu compra circular!</h2>
          <p className={styles.successText}>
            Tu pedido ha sido registrado con éxito. Te enviamos los detalles a{' '}
            <strong>{ordenGenerada.email}</strong>.
          </p>
          <div className={styles.orderBadge}>
            <span>Código de Orden:</span>
            <strong>{ordenGenerada.id}</strong>
          </div>
          <div className={styles.summaryBox}>
            <p><strong>Comprador:</strong> {ordenGenerada.cliente}</p>
            <p><strong>Total abonado:</strong> ${ordenGenerada.total.toLocaleString('es-AR')}</p>
            <p><strong>Prendas:</strong> {ordenGenerada.articulos.length} artículos únicos</p>
          </div>
          <Link to="/productos" className="btn bg-primary" onClick={() => setOrdenGenerada(null)}>
            Seguir explorando la feria 🧥
          </Link>
        </div>
      </div>
    );
  }

  // Render condicional: Carrito vacío
  if (cart.length === 0) {
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
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1>Mi Carrito ({cantidadTotal} {cantidadTotal === 1 ? 'prenda' : 'prendas'})</h1>
        <button
          type="button"
          onClick={clearCart}
          className="btn bg-delete"
          title="Vaciar todo el carrito"
        >
          🗑️ Vaciar Carrito
        </button>
      </div>

      <div className={styles.contentGrid}>
        {/* Lista de prendas agregadas */}
        <div className={styles.itemsList}>
          {cart.map((item) => {
            const subtotal = item.precio * item.cantidad;
            return (
              <div key={item.id} className={styles.cartItem}>
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
          })}
        </div>

        {/* Resumen y Formulario de Checkout */}
        <div className={styles.summarySidebar}>
          <div className={styles.summaryCard}>
            <h3>Resumen del Pedido</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal prendas:</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Envío ecológico:</span>
              <span style={{ color: '#007a4b', fontWeight: 800 }}>¡Gratis!</span>
            </div>
            <hr className={styles.divider} />
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total a abonar:</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>

            {!comprando ? (
              <button
                type="button"
                className="btn bg-primary"
                style={{ width: '100%', marginTop: '1rem', fontWeight: 800, fontSize: '1rem' }}
                onClick={() => setComprando(true)}
              >
                Continuar al Checkout ✨
              </button>
            ) : (
              <form onSubmit={handleFinalizarCompra} className={styles.checkoutForm}>
                <h4>Datos para el Envío Sustentable</h4>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre y Apellido"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono de contacto"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección de entrega"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                />
                <button
                  type="submit"
                  className="btn bg-pink"
                  style={{ width: '100%', marginTop: '0.4rem', fontWeight: 800 }}
                >
                  Confirmar y Finalizar Pedido
                </button>
                <button
                  type="button"
                  className="btn"
                  style={{ width: '100%', background: 'transparent', color: 'var(--text-secondary)', boxShadow: 'none' }}
                  onClick={() => setComprando(false)}
                >
                  Volver al resumen
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
