import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Escucha cambios de sesión automáticamente (persiste aunque recargues)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // limpia el listener al desmontar
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const mensajes = {
        'auth/invalid-credential': 'Email o contraseña incorrectos.',
        'auth/too-many-requests': 'Demasiados intentos. Esperá unos minutos.',
        'auth/network-request-failed': 'Error de red. Verificá tu conexión.',
      };
      setAuthError(mensajes[error.code] || 'Error al iniciar sesión.');
      throw error;
    }
  };

  const logout = () => signOut(auth);

  const value = { currentUser, loading, authError, login, logout };

  // No renderiza nada hasta saber si hay sesión activa
  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
