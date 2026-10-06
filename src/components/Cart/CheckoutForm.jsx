import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../hooks/useCheckout';
import styles from './CheckoutForm.module.css';

export const CheckoutForm = () => {
  const { getCartTotal } = useCart();
  const { formData, handleInputChange, handleFinalizarCompra } = useCheckout();
  const total = getCartTotal();

  return (
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
      </form>
    </div>
  );
};
