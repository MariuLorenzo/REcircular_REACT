import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { CartEmpty } from '../components/Cart/CartEmpty';
import { CartItem } from '../components/Cart/CartItem';
import { CheckoutForm } from '../components/Cart/CheckoutForm';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const { cart, clearCart, getCartQuantity } = useCart();
  const cantidadTotal = getCartQuantity();

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Mi Carrito — REcircular</title>
        <meta name="description" content="Revisa las prendas vintage seleccionadas en tu carrito antes de finalizar la compra." />
      </Helmet>

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
        {/* Lista de prendas */}
        <div className={styles.itemsList}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Resumen + botón ir a Checkout */}
        <div className={styles.summarySidebar}>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
};
