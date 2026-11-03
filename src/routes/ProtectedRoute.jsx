import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — envuelve rutas que solo el admin puede ver.
 * Si no hay sesión activa, redirige a /login.
 * Si hay sesión, renderiza el contenido hijo con <Outlet />.
 */
export const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
