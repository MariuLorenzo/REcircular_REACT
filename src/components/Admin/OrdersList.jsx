import styles from './OrdersList.module.css';

export const OrdersList = ({ ordenes, loading }) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Cargando órdenes de compra registradas...</p>
      </div>
    );
  }

  if (ordenes.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <span className={styles.emptyIcon}>📋</span>
        <h3>Aún no hay órdenes registradas</h3>
        <p>
          Cuando los clientes finalicen sus compras en el checkout de la tienda, las órdenes aparecerán aquí en tiempo real.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.ordersContainer}>
      <div className={styles.headerRow}>
        <h3>Órdenes de Compra ({ordenes.length})</h3>
        <span className={styles.syncBadge}>● Conectado en tiempo real</span>
      </div>

      <div className={styles.ordersGrid}>
        {ordenes.map((orden) => (
          <div key={orden.id} className={styles.orderCard}>
            <div className={styles.orderTop}>
              <div>
                <span className={styles.ticketId}>
                  #{orden.codigoTicket || orden.id?.slice(0, 8)}
                </span>
                <span className={styles.orderDate}>
                  {orden.fecha || 'Reciente'}
                </span>
              </div>
              <span className={styles.statusBadge}>
                {orden.estado || 'Confirmada'}
              </span>
            </div>

            <div className={styles.buyerInfo}>
              <p className={styles.buyerName}>
                👤 <strong>{orden.cliente}</strong>
              </p>
              <p className={styles.buyerDetail}>✉️ {orden.email}</p>
              {orden.telefono && <p className={styles.buyerDetail}>📞 {orden.telefono}</p>}
              {orden.direccion && <p className={styles.buyerDetail}>📍 {orden.direccion}</p>}
            </div>

            <div className={styles.itemsList}>
              <span className={styles.itemsTitle}>Prendas adquiridas:</span>
              {orden.articulos?.map((art, idx) => (
                <div key={idx} className={styles.itemRow}>
                  {art.imagen && (
                    <img src={art.imagen} alt={art.nombre} className={styles.itemThumb} />
                  )}
                  <span className={styles.itemNombre}>{art.nombre}</span>
                  <span className={styles.itemCant}>x{art.cantidad}</span>
                  <span className={styles.itemPrice}>
                    ${(art.subtotal || art.precio * art.cantidad)?.toLocaleString('es-AR')}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.orderTotal}>
              <span>Total abonado:</span>
              <strong>${Number(orden.total || 0).toLocaleString('es-AR')}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
