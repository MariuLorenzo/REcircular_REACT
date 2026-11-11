import styles from './DeleteConfirmModal.module.css';

export const DeleteConfirmModal = ({ producto, onConfirm, onCancel, loading }) => {
  if (!producto) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconArea}>
          <span className={styles.warningIcon}>⚠️</span>
        </div>

        <h3 className={styles.title}>¿Eliminar prenda del inventario?</h3>
        
        <p className={styles.message}>
          Estás a punto de dar de baja <strong>"{producto.nombre}"</strong>. Esta acción no se puede deshacer y se eliminará definitivamente de Firebase.
        </p>

        {producto.imagen && (
          <div className={styles.itemSummary}>
            <img src={producto.imagen} alt={producto.nombre} className={styles.thumb} />
            <div className={styles.summaryInfo}>
              <span className={styles.itemCat}>{producto.categoria}</span>
              <span className={styles.itemPrice}>${producto.precio?.toLocaleString('es-AR')}</span>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelBtn}
            disabled={loading}
          >
            Cancelar
          </button>
          
          <button
            type="button"
            onClick={() => onConfirm(producto.id)}
            className={styles.deleteBtn}
            disabled={loading}
          >
            {loading ? 'Eliminando...' : 'Sí, eliminar prenda'}
          </button>
        </div>
      </div>
    </div>
  );
};
