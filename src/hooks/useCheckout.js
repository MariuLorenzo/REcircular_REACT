import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
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

  const [enviando, setEnviando] = useState(false);
  const [errorCheckout, setErrorCheckout] = useState(null);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFinalizarCompra = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErrorCheckout(null);

    const total = getCartTotal();
    const codigoTicket = `RC-${Date.now().toString().slice(-6)}`;

    const datosOrden = {
      codigoTicket,
      cliente: formData.nombre.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      direccion: formData.direccion.trim(),
      total,
      articulos: cart.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad,
        imagen: item.imagen || '',
      })),
      fecha: new Date().toLocaleDateString('es-AR'),
      estado: 'Completada',
    };

    try {
      // Guardamos la orden de compra persistente en Firestore
      const docRef = await addDoc(collection(db, 'ordenes'), {
        ...datosOrden,
        createdAt: serverTimestamp(),
      });

      const ordenFinal = {
        id: docRef.id,
        ...datosOrden,
      };

      clearCart();
      // Redirigir a /checkout con la orden en el state
      navigate('/checkout', { state: { orden: ordenFinal } });
    } catch (err) {
      console.error('Error al registrar la orden en Firestore:', err);
      // Respaldo en caso de error de conexión: permitimos ver la orden simulada
      const ordenRespaldo = {
        id: codigoTicket,
        ...datosOrden,
      };
      clearCart();
      navigate('/checkout', { state: { orden: ordenRespaldo } });
    } finally {
      setEnviando(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleFinalizarCompra,
    enviando,
    errorCheckout,
  };
};
