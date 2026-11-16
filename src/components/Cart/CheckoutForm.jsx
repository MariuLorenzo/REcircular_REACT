import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../hooks/useCheckout';
import styles from './CheckoutForm.module.css';

export const CheckoutForm = () => {
  const { getCartTotal } = useCart();
  const { formData, handleInputChange, handleFinalizarCompra, enviando } = useCheckout();
  const total = getCartTotal();

  return (
    <div className={styles.summaryCard} aria-labelledby="order-summary-title">
      <h3 id="order-summary-title">Resumen del Pedido</h3>
      <div className={styles.summaryRow}>
        <span>Subtotal prendas:</span>
        <span>${total.toLocaleString('es-AR')}</span>
      </div>
      <div className={styles.summaryRow}>
        <span>Envío ecológico:</span>
        <span style={{ color: 'var(--success)', fontWeight: 800 }}>¡Gratis!</span>
      </div>
      <hr className={styles.divider} />
      <div className={`${styles.summaryRow} ${styles.totalRow}`}>
        <span>Total a abonar:</span>
        <span>${total.toLocaleString('es-AR')}</span>
      </div>

      <form onSubmit={handleFinalizarCompra} className={styles.checkoutForm} noValidate={false}>
        <h4 id="shipping-info-title">Datos para el Envío Sustentable</h4>

        <div className="mb-2">
          <label htmlFor="checkout-nombre" className="form-label fw-bold mb-1" style={{ fontSize: '0.85rem' }}>
            Nombre y Apellido *
          </label>
          <input
            id="checkout-nombre"
            type="text"
            name="nombre"
            placeholder="Ej: Mariela Lorenzo"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            aria-required="true"
            autoComplete="name"
            className={styles.formInput}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="checkout-email" className="form-label fw-bold mb-1" style={{ fontSize: '0.85rem' }}>
            Correo electrónico *
          </label>
          <input
            id="checkout-email"
            type="email"
            name="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleInputChange}
            required
            aria-required="true"
            autoComplete="email"
            className={styles.formInput}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="checkout-telefono" className="form-label fw-bold mb-1" style={{ fontSize: '0.85rem' }}>
            Teléfono de contacto *
          </label>
          <input
            id="checkout-telefono"
            type="tel"
            name="telefono"
            placeholder="Ej: 11 2345 6789"
            value={formData.telefono}
            onChange={handleInputChange}
            required
            aria-required="true"
            autoComplete="tel"
            className={styles.formInput}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="checkout-direccion" className="form-label fw-bold mb-1" style={{ fontSize: '0.85rem' }}>
            Dirección de entrega *
          </label>
          <input
            id="checkout-direccion"
            type="text"
            name="direccion"
            placeholder="Calle, número, piso, localidad"
            value={formData.direccion}
            onChange={handleInputChange}
            required
            aria-required="true"
            autoComplete="street-address"
            className={styles.formInput}
          />
        </div>

        <button
          type="submit"
          className="btn bg-pink"
          disabled={enviando}
          style={{
            width: '100%',
            marginTop: '0.4rem',
            fontWeight: 800,
            opacity: enviando ? 0.7 : 1,
            cursor: enviando ? 'not-allowed' : 'pointer',
          }}
        >
          {enviando ? 'Guardando pedido en Firebase...' : 'Confirmar y Finalizar Pedido'}
        </button>
      </form>
    </div>
  );
};
