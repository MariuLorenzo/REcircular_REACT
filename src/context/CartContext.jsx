import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Persistencia opcional en localStorage para una experiencia de e-commerce real
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('feria_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('feria_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error al guardar en localStorage', e);
    }
  }, [cart]);

  const addToCart = (producto, cantidad = 1) => {
    if (cantidad <= 0) return;

    setCart((prevCart) => {
      const itemExistente = prevCart.find((item) => item.id === producto.id);

      if (itemExistente) {
        // Validamos no superar el stock
        const nuevaCantidad = Math.min(
          itemExistente.cantidad + cantidad,
          producto.stock
        );

        return prevCart.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
      } else {
        const cantidadSegura = Math.min(cantidad, producto.stock);
        return [...prevCart, { ...producto, cantidad: cantidadSegura }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const cantidadValida = Math.min(nuevaCantidad, item.stock);
          return { ...item, cantidad: cantidadValida };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const getCartQuantity = () => {
    return cart.reduce((acc, item) => acc + item.cantidad, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartQuantity,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
