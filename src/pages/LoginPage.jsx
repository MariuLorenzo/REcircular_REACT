import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const { login, currentUser, authError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión activa, redirige directo al admin
  if (currentUser) return <Navigate to="/admin" replace />;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate('/admin', { replace: true });
    } catch {
      // El error ya lo maneja AuthContext en authError
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <img src="/img/logo-recircular.png" alt="REcircular" className={styles.logo} />
          <h1 className={styles.title}>Panel Administrador</h1>
          <p className={styles.subtitle}>Acceso exclusivo para el equipo REcircular</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={styles.input}
              placeholder="admin@admin.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={styles.input}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {authError && (
            <p className={styles.error}>⚠️ {authError}</p>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Ingresar al panel'}
          </button>
        </form>

        <p className={styles.backLink}>
          <a href="/">← Volver a la tienda</a>
        </p>
      </div>
    </div>
  );
};
