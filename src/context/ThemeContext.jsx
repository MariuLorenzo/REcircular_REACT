import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  ECOLOGIA: 'ecologia',
  CLARO: 'claro',
  OSCURO: 'oscuro',
};

export const THEME_LABELS = {
  [THEMES.ECOLOGIA]: {
    label: 'Modo ecología',
    nombreCorto: 'Ecología',
    icon: '🌱',
    descripcion: 'Paleta vintage cálida, verde bosque y terracota',
  },
  [THEMES.CLARO]: {
    label: 'Modo claro',
    nombreCorto: 'Claro',
    icon: '☀️',
    descripcion: 'Paleta luminosa con verde agua y verde bosque',
  },
  [THEMES.OSCURO]: {
    label: 'Modo oscuro',
    nombreCorto: 'Oscuro',
    icon: '🌙',
    descripcion: 'Paleta carbón suave y marfil cálido sin brillos',
  },
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
