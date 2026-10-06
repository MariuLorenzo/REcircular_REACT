import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const useCheckout = () => {
  const { cart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    const total = getCartTotal();
    const nuevoIdOrden = `RC-${Date.now().toString().slice(-6)}`;
    const orden = {
      id: nuevoIdOrden,
      cliente: formData.nombre,
      email: formData.email,
      total,
      articulos: [...cart],
    };
    clearCart();
    // Redirige a /checkout pasando la orden en el state de la ruta
    navigate('/checkout', { state: { orden } });
  };

  return { formData, handleInputChange, handleFinalizarCompra };
};
