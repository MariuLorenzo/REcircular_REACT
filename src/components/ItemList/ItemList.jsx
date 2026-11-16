import { Row, Col } from 'react-bootstrap';
import { Item } from '../Item/Item';
import styles from './ItemList.module.css';

export const ItemList = ({ productos = [] }) => {
  if (productos.length === 0) {
    return (
      <div className={styles.empty} role="status" aria-live="polite">
        <p>No se encontraron prendas vintage para este criterio.</p>
      </div>
    );
  }

  return (
    <div className={styles.containerBootstrap}>
      <Row
        xs={1}
        sm={2}
        md={3}
        lg={4}
        className="g-4"
        role="list"
        aria-label="Catálogo de prendas vintage disponibles"
      >
        {productos.map((prod) => (
          <Col key={prod.id} role="listitem" className="d-flex align-items-stretch">
            <Item producto={prod} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
