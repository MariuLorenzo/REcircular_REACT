import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ItemDetail } from '../ItemDetail/ItemDetail';

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [noEncontrado, setNoEncontrado] = useState(false);

  useEffect(() => {
    setCargando(true);
    setNoEncontrado(false);

    fetch('/productos.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error de conexión con el catálogo');
        }
        return response.json();
      })
      .then((productos) => {
        const itemEncontrado = productos.find((p) => String(p.id) === String(id));
        if (itemEncontrado) {
          setProducto(itemEncontrado);
        } else {
          setNoEncontrado(true);
        }
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al obtener el producto:', err);
        setNoEncontrado(true);
        setCargando(false);
      });
  }, [id]); // Array de dependencias [id] 

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <div
          style={{
            display: 'inline-block',
            width: '45px',
            height: '45px',
            border: '4px solid var(--border)',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '1rem',
          }}
        />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p className="secondary">Cargando detalles de la prenda vintage...</p>
      </div>
    );
  }

  if (noEncontrado || !producto) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '4rem 1.5rem',
          background: 'var(--surface)',
          borderRadius: '16px',
          border: '1px dashed var(--border)',
          maxWidth: '600px',
          margin: '3rem auto',
        }}
      >
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>
          🔍
        </span>
        <h2 style={{ marginBottom: '0.8rem' }}>Prenda no encontrada</h2>
        <p className="secondary" style={{ marginBottom: '1.5rem' }}>
          La pieza vintage que buscas ya fue vendida o el identificador no existe en nuestro inventario.
        </p>
        <Link to="/productos" className="btn bg-primary">
          Explorar otras prendas disponibles
        </Link>
      </div>
    );
  }

  return <ItemDetail producto={producto} />;
};
