import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ItemList } from '../ItemList/ItemList';
import { subscribeProducts } from '../../services/productService';

const ITEMS_POR_PAGINA = 8;

export const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    // Escucha en tiempo real de Firestore
    const unsubscribe = subscribeProducts(
      (items) => {
        if (items && items.length > 0) {
          setProductos(items);
          setCargando(false);
        } else {
          // Si Firestore aún no fue semillado por el admin, leemos el catálogo estático como respaldo
          fetch('/productos.json')
            .then((r) => r.json())
            .then((data) => {
              setProductos(data);
              setCargando(false);
            })
            .catch(() => {
              setProductos([]);
              setCargando(false);
            });
        }
      },
      (err) => {
        console.error('Error al conectar con Firestore:', err);
        // Respaldo en caso de error de red o permisos
        fetch('/productos.json')
          .then((r) => r.json())
          .then((data) => {
            setProductos(data);
            setCargando(false);
          })
          .catch(() => {
            setError('No pudimos conectar con el catálogo. Intenta de nuevo.');
            setCargando(false);
          });
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Resetear a la primera página si cambia la categoría o búsqueda
  useEffect(() => {
    setPaginaActual(1);
  }, [categoriaSeleccionada, busqueda]);

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria).filter(Boolean))];

  // Filtro por categoría y por texto de búsqueda (nombre o descripción)
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      categoriaSeleccionada === 'Todas' || p.categoria === categoriaSeleccionada;
    const coincideBusqueda =
      !busqueda.trim() ||
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  // Paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const productosPaginados = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + ITEMS_POR_PAGINA
  );

  return (
    <div style={{ width: '100%' }}>
      <Helmet>
        <title>Catálogo Vintage — REcircular</title>
        <meta
          name="description"
          content="Explora el catálogo completo de piezas textiles exclusivas, camperas, tapados y denim vintage con stock único."
        />
      </Helmet>

      <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.35rem' }}>Catálogo de Prendas Únicas</h1>
        <p className="secondary" style={{ maxWidth: '620px', margin: '0 auto', fontSize: '0.92rem' }}>
          Piezas exclusivas rescatadas y restauradas con amor. Conexión en tiempo real con stock actualizado.
        </p>
      </div>

      {/* Barra de búsqueda interactiva */}
      {!cargando && !error && (
        <div style={{ maxWidth: '520px', margin: '0 auto 1.25rem', padding: '0 0.5rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                fontSize: '1.1rem',
                color: '#888',
                pointerEvents: 'none',
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar por prenda, época, material..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 2.5rem 0.75rem 2.8rem',
                borderRadius: '50px',
                border: '2px solid var(--border)',
                outline: 'none',
                fontSize: '0.92rem',
                backgroundColor: '#ffffff',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent-pink)';
                e.target.style.boxShadow = '0 0 0 3px rgba(232, 28, 106, 0.12)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda('')}
                style={{
                  position: 'absolute',
                  right: '0.8rem',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  color: '#888',
                }}
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Selector de categorías adaptable */}
      {!cargando && !error && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.45rem',
            margin: '0.5rem 0 1.5rem',
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
          <p className="secondary" style={{ fontWeight: 600 }}>Sincronizando tesoros con Firebase...</p>
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

      {/* Mensaje cuando la búsqueda no arroja resultados */}
      {!cargando && !error && productosFiltrados.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            background: 'var(--surface)',
            borderRadius: '16px',
            border: '1px dashed var(--border)',
            maxWidth: '480px',
            margin: '1.5rem auto',
          }}
        >
          <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>👗🔍</span>
          <h3>No encontramos prendas coincidentes</h3>
          <p className="secondary" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Prueba buscando con otros términos o seleccionando otra categoría.
          </p>
          <button
            type="button"
            className="btn bg-primary"
            onClick={() => {
              setBusqueda('');
              setCategoriaSeleccionada('Todas');
            }}
          >
            Ver todo el catálogo
          </button>
        </div>
      )}

      {/* Grilla de productos paginados */}
      {!cargando && !error && productosFiltrados.length > 0 && (
        <>
          <ItemList productos={productosPaginados} />

          {/* Controles de paginación */}
          {totalPaginas > 1 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '2.5rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                className="btn"
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual((p) => Math.max(p - 1, 1))}
                style={{
                  width: 'auto',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.85rem',
                  opacity: paginaActual === 1 ? 0.4 : 1,
                  cursor: paginaActual === 1 ? 'not-allowed' : 'pointer',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                }}
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => {
                const activa = num === paginaActual;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPaginaActual(num)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: activa ? '2px solid var(--accent-pink)' : '1px solid var(--border)',
                      backgroundColor: activa ? 'var(--accent-pink)' : '#ffffff',
                      color: activa ? '#ffffff' : 'var(--text)',
                      fontWeight: activa ? 800 : 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {num}
                  </button>
                );
              })}

              <button
                type="button"
                className="btn"
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual((p) => Math.min(p + 1, totalPaginas))}
                style={{
                  width: 'auto',
                  padding: '0.45rem 0.9rem',
                  fontSize: '0.85rem',
                  opacity: paginaActual === totalPaginas ? 0.4 : 1,
                  cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border)',
                }}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
