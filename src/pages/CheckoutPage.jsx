import { useLocation } from 'react-router-dom';
import { CheckoutForm } from '../components/Cart/CheckoutForm';
import { OrderSuccess } from '../components/Cart/OrderSuccess';
import styles from './CheckoutPage.module.css';

export const CheckoutPage = () => {
  // Si venimos redirigidos desde CartPage con una orden generada, la mostramos
  const location = useLocation();
  const ordenGenerada = location.state?.orden ?? null;

  if (ordenGenerada) {
    return <OrderSuccess orden={ordenGenerada} />;
  }

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageTitle}>Finalizar Compra ✨</h2>
      <CheckoutForm />
    </div>
  );
};
