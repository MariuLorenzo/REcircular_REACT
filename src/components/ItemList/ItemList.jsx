import { Item } from '../Item/Item';
import styles from './ItemList.module.css';

export const ItemList = ({ productos = [] }) => {
  if (productos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No se encontraron prendas vintage para este criterio.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {productos.map((prod) => (
        <Item key={prod.id} producto={prod} />
      ))}
    </div>
  );
};
