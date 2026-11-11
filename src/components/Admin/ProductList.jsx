import { useState } from 'react';
import styles from './ProductList.module.css';

export const ProductList = ({ productos, onEdit, onDelete, onSeedCatalog, seeding }) => {
  const [filtro, setFiltro] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria).filter(Boolean))];

  const productosFiltrados = productos.filter((p) => {
    const coincideCat = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro;
    const coincideTexto =
      !filtro.trim() ||
      p.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
      p.talle?.toLowerCase().includes(filtro.toLowerCase()) ||
      p.epoca?.toLowerCase().includes(filtro.toLowerCase());
    return coincideCat && coincideTexto;
  });

  return (
    <div className={styles.tableCard}>
      {/* Barra de Filtros y Estadísticas */}
      <div className={styles.topBar}>
        <div className={styles.stats}>
          <span className={styles.statPill}>
            Total: <strong>{productos.length} prendas</strong>
          </span>
          <span className={styles.statPill}>
            Filtradas: <strong>{productosFiltrados.length}</strong>
          </span>
        </div>

        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Filtrar por nombre, talle, época..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className={styles.searchInput}
          />

          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className={styles.selectFilter}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Si no hay productos en la base de datos */}
      {productos.length === 0 ? (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>📦</span>
          <h4>La base de datos de productos está vacía</h4>
          <p>
            Puedes comenzar agregando una prenda nueva con el botón superior, o importar automáticamente las 12 prendas iniciales desde el catálogo base.
          </p>
          {onSeedCatalog && (
            <button
              type="button"
              onClick={onSeedCatalog}
              disabled={seeding}
              className={styles.seedBtn}
            >
              {seeding ? 'Cargando prendas en Firebase...' : '📥 Importar Catálogo Inicial (12 prendas)'}
            </button>
          )}
        </div>
      ) : productosFiltrados.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay prendas que coincidan con el filtro actual.</p>
          <button
            type="button"
            onClick={() => {
              setFiltro('');
              setCategoriaFiltro('Todas');
            }}
            className={styles.clearFilterBtn}
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        /* Tabla de Productos */
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prenda</th>
                <th>Categoría</th>
                <th>Talle / Época</th>
                <th>Precio</th>
                <th>Stock</th>
                <th style={{ textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((item) => {
                const stockBajo = item.stock <= 1;
                return (
                  <tr key={item.id} className={styles.row}>
                    <td>
                      <div className={styles.itemCell}>
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className={styles.thumbnail}
                          loading="lazy"
                        />
                        <div className={styles.itemInfo}>
                          <span className={styles.itemName} title={item.nombre}>
                            {item.nombre}
                          </span>
                          <span className={styles.itemId}>ID: {item.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={styles.categoryBadge}>{item.categoria || 'Varios'}</span>
                    </td>

                    <td>
                      <span className={styles.detailText}>
                        {item.talle ? `Talle ${item.talle}` : '-'}
                        {item.epoca ? ` • ${item.epoca}` : ''}
                      </span>
                    </td>

                    <td>
                      <strong className={styles.priceText}>
                        ${Number(item.precio || 0).toLocaleString('es-AR')}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`${styles.stockBadge} ${
                          item.stock === 0
                            ? styles.stockOut
                            : stockBajo
                            ? styles.stockLow
                            : styles.stockOk
                        }`}
                      >
                        {item.stock === 0 ? 'Agotado' : `${item.stock} un.`}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.actionButtons}>
                        <button
                          type="button"
                          onClick={() => onEdit(item)}
                          className={styles.editBtn}
                          title="Editar prenda"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(item)}
                          className={styles.deleteBtn}
                          title="Eliminar de Firebase"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
