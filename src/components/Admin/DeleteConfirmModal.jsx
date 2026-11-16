import { Modal, Button } from 'react-bootstrap';
import styles from './DeleteConfirmModal.module.css';

export const DeleteConfirmModal = ({ producto, onConfirm, onCancel, loading }) => {
  const show = Boolean(producto);

  return (
    <Modal
      show={show}
      onHide={onCancel}
      centered
      backdrop="static"
      keyboard={!loading}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Modal.Header closeButton={!loading}>
        <Modal.Title id="delete-modal-title" className="d-flex align-items-center gap-2">
          <span aria-hidden="true">⚠️</span>
          <span>¿Eliminar prenda del inventario?</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body id="delete-modal-description">
        {producto && (
          <>
            <p className={styles.message}>
              Estás a punto de dar de baja <strong>"{producto.nombre}"</strong>. Esta acción no se puede deshacer y se eliminará definitivamente de Firebase.
            </p>

            {producto.imagen && (
              <div className={styles.itemSummary}>
                <img
                  src={producto.imagen}
                  alt={`Fotografía de ${producto.nombre}`}
                  className={styles.thumb}
                />
                <div className={styles.summaryInfo}>
                  <span className={styles.itemCat}>{producto.categoria}</span>
                  <span className={styles.itemPrice}>
                    ${producto.precio?.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={loading}
          className="px-4"
        >
          Cancelar
        </Button>
        <Button
          variant="danger"
          onClick={() => producto && onConfirm(producto.id)}
          disabled={loading}
          className="px-4 fw-bold"
        >
          {loading ? 'Eliminando...' : 'Sí, eliminar prenda'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
