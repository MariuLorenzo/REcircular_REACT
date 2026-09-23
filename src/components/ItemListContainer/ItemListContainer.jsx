import { useState, useEffect } from 'react';
import { ItemList } from '../ItemList/ItemList';

export const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    fetch('/productos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al obtener productos:', err);
        setError('No pudimos cargar las prendas. Por favor, intenta de nuevo.');
        setCargando(false);
      });
  }, []); // Array de dependencias vacío

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.35rem' }}>Catálogo de Prendas Únicas</h1>
        <p className="secondary" style={{ maxWidth: '620px', margin: '0 auto', fontSize: '0.92rem' }}>
          Piezas exclusivas rescatadas y restauradas con amor. Cada artículo tiene stock unitario.
        </p>
      </div>

      {/* Selector de categorías adaptable */}
      {!cargando && !error && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.45rem',
            margin: '1.2rem 0 1.5rem',
          }}
        >
          {categorias.map((cat) => {
            const isSelected = categoriaSeleccionada === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoriaSeleccionada(cat)}
                className="btn"
                style={{
                  fontSize: '0.82rem',
                  padding: '0.4rem 0.9rem',
                  width: 'auto',
                  backgroundColor: isSelected ? 'var(--accent-pink)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text)',
                  fontWeight: isSelected ? 800 : 600,
                  border: isSelected ? '2px solid var(--accent-pink)' : '2px solid var(--border)',
                  boxShadow: isSelected ? '0 4px 12px rgba(232, 28, 106, 0.3)' : '0 2px 6px rgba(0,0,0,0.04)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Estado de carga */}
      {cargando && (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div
            style={{
              display: 'inline-block',
              width: '45px',
              height: '45px',
              border: '4px solid var(--border)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginBottom: '1rem',
            }}
          />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          <p className="secondary" style={{ fontWeight: 600 }}>Buscando tesoros vintage en el baúl...</p>
        </div>
      )}

      {/* Estado de error */}
      {error && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem 1.25rem',
            backgroundColor: 'var(--pink-tint)',
            border: '2px solid var(--accent-pink)',
            borderRadius: '16px',
            maxWidth: '500px',
            margin: '2rem auto',
          }}
        >
          <p style={{ color: 'var(--danger)', fontWeight: 700 }}>{error}</p>
        </div>
      )}

      {/* Grilla de productos */}
      {!cargando && !error && <ItemList productos={productosFiltrados} />}
    </div>
  );
};
