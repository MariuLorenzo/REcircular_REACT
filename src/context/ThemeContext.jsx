import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  ECOLOGIA: 'ecologia',
  CLARO: 'claro',
  OSCURO: 'oscuro',
};

export const THEME_LABELS = {
  [THEMES.ECOLOGIA]: { label: 'Ecología', icon: '🌱', descripcion: 'Paleta vintage cálida y sustentable original' },
  [THEMES.CLARO]: { label: 'Claro (AAA)', icon: '☀️', descripcion: 'Alto contraste accesible WCAG AAA para luz de día' },
  [THEMES.OSCURO]: { label: 'Oscuro (AAA)', icon: '🌙', descripcion: 'Alto contraste accesible WCAG AAA para baja iluminación' },
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const guardado = localStorage.getItem('recircular_theme');
      if (guardado && Object.values(THEMES).includes(guardado)) {
        return guardado;
      }
    } catch {
      // Ignorar error de acceso a storage
    }
    return THEMES.ECOLOGIA;
  });

  useEffect(() => {
    try {
      localStorage.setItem('recircular_theme', theme);
    } catch {
      // Ignorar error de storage
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const cambiarTema = (nuevoTema) => {
    if (Object.values(THEMES).includes(nuevoTema)) {
      setTheme(nuevoTema);
    }
  };

  const valor = {
    theme,
    cambiarTema,
    infoTema: THEME_LABELS[theme],
    THEMES,
    THEME_LABELS,
  };

  return <ThemeContext.Provider value={valor}>{children}</ThemeContext.Provider>;
};
