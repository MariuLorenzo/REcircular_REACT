import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  subscribeProducts,
  subscribeOrders,
  createProduct,
  updateProduct,
  deleteProduct,
  seedInitialCatalog,
} from '../services/productService';
import { ProductList } from '../components/Admin/ProductList';
import { ProductForm } from '../components/Admin/ProductForm';
import { DeleteConfirmModal } from '../components/Admin/DeleteConfirmModal';
import { OrdersList } from '../components/Admin/OrdersList';
import styles from './AdminPage.module.css';

export const AdminPage = () => {
  const [productos, setProductos] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cargandoOrdenes, setCargandoOrdenes] = useState(true);
  const [activeTab, setActiveTab] = useState('productos'); // 'productos' | 'ordenes'
  const [mostrarForm, setMostrarForm] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [notificacion, setNotificacion] = useState(null);

  const mostrarMensaje = (texto, tipo = 'exito') => {
    setNotificacion({ texto, tipo });
    setTimeout(() => {
      setNotificacion(null);
    }, 4000);
  };

  // Escucha de productos en tiempo real
  useEffect(() => {
    setCargando(true);
    const unsubscribe = subscribeProducts(
      (items) => {
        const itemsValidos = (items || []).filter((i) => i && i.nombre);
        setProductos(itemsValidos);
        setCargando(false);
      },
      (err) => {
        console.error('Error al escuchar productos:', err);
        mostrarMensaje('Error de conexión con la base de datos de productos.', 'error');
        setCargando(false);
      }
    );
    return () => unsubscribe && unsubscribe();
  }, []);

  // Escucha de órdenes de compra en tiempo real
  useEffect(() => {
    setCargandoOrdenes(true);
    const unsubscribe = subscribeOrders(
      (orders) => {
        setOrdenes(orders);
        setCargandoOrdenes(false);
      },
      (err) => {
        console.error('Error al escuchar órdenes:', err);
        setCargandoOrdenes(false);
      }
    );
    return () => unsubscribe && unsubscribe();
  }, []);

  // Manejo de Creación / Edición
  const handleGuardarProducto = async (productData, imageFile) => {
    setGuardando(true);
    try {
      if (productoEditando) {
        await updateProduct(productoEditando.id, productData, imageFile);
        mostrarMensaje(`¡Prenda "${productData.nombre}" actualizada exitosamente!`);
      } else {
        await createProduct(productData, imageFile);
        mostrarMensaje(`¡Nueva prenda "${productData.nombre}" agregada al catálogo!`);
      }
      setMostrarForm(false);
      setProductoEditando(null);
    } catch (err) {
      console.error('Error al guardar producto:', err);
      mostrarMensaje('No se pudo guardar la prenda. Verifica tu conexión.', 'error');
    } finally {
      setGuardando(false);
    }
  };

  // Manejo de Eliminación
  const handleConfirmarEliminar = async (id) => {
    setEliminando(true);
    try {
      await deleteProduct(id);
      mostrarMensaje('Prenda eliminada correctamente de Firebase.');
      setProductoAEliminar(null);
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      mostrarMensaje('Error al intentar eliminar la prenda.', 'error');
    } finally {
      setEliminando(false);
    }
  };

  // Manejo de Importación del catálogo base (12 prendas)
  const handleSeedCatalog = async () => {
    setSeeding(true);
    try {
      const cantidad = await seedInitialCatalog();
      mostrarMensaje(`¡Se importaron ${cantidad} prendas exitosamente a Firebase!`);
    } catch (err) {
      console.error('Error al semillar catálogo:', err);
      mostrarMensaje('Error al importar el catálogo. Intenta nuevamente.', 'error');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className={styles.adminPage}>
      <Helmet>
        <title>Panel de Administración — REcircular</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Notificación flotante */}
      {notificacion && (
        <div
          className={`${styles.toast} ${
            notificacion.tipo === 'error' ? styles.toastError : styles.toastExito
          }`}
        >
          {notificacion.tipo === 'error' ? '⚠️ ' : '✅ '}
          {notificacion.texto}
        </div>
      )}

      {/* Encabezado y Barra Superior */}
      <div className={styles.topHeader}>
        <div>
          <h1 className={styles.pageTitle}>Panel de Control REcircular</h1>
          <p className={styles.pageSubtitle}>
            Administración completa en tiempo real de inventario y pedidos con Firebase.
          </p>
        </div>

        <div className={styles.headerActions}>
          {productos.length === 0 && !cargando && (
            <button
              type="button"
              onClick={handleSeedCatalog}
              disabled={seeding}
              className={styles.seedHeaderBtn}
            >
              {seeding ? 'Importando...' : '📥 Cargar catálogo inicial'}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setProductoEditando(null);
              setMostrarForm((prev) => !prev);
            }}
            className={styles.newProductBtn}
          >
            {mostrarForm ? '✕ Cerrar Formulario' : '➕ Nueva Prenda Vintage'}
          </button>
        </div>
      </div>

      {/* Pestañas de Navegación del Panel */}
      <div className={styles.tabsRow}>
        <button
          type="button"
          onClick={() => setActiveTab('productos')}
          className={`${styles.tabBtn} ${activeTab === 'productos' ? styles.activeTab : ''}`}
        >
          📦 Inventario de Prendas ({productos.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ordenes')}
          className={`${styles.tabBtn} ${activeTab === 'ordenes' ? styles.activeTab : ''}`}
        >
          📋 Órdenes de Compra ({ordenes.length})
        </button>
      </div>

      {/* Formulario de Alta / Edición (desplegable) */}
      {mostrarForm && (
        <ProductForm
          initialData={productoEditando}
          onSubmit={handleGuardarProducto}
          onCancel={() => {
            setMostrarForm(false);
            setProductoEditando(null);
          }}
          loading={guardando}
        />
      )}

      {/* Contenido según la pestaña activa */}
      {activeTab === 'productos' ? (
        cargando ? (
          <div className={styles.loadingBox}>
            <div className={styles.spinner} />
            <p>Conectando con Firestore y cargando inventario...</p>
          </div>
        ) : (
          <ProductList
            productos={productos}
            onEdit={(item) => {
              setProductoEditando(item);
              setMostrarForm(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDelete={(item) => setProductoAEliminar(item)}
            onSeedCatalog={handleSeedCatalog}
            seeding={seeding}
          />
        )
      ) : (
        <OrdersList ordenes={ordenes} loading={cargandoOrdenes} />
      )}

      {/* Modal de confirmación para eliminar */}
      <DeleteConfirmModal
        producto={productoAEliminar}
        onConfirm={handleConfirmarEliminar}
        onCancel={() => setProductoAEliminar(null)}
        loading={eliminando}
      />
    </div>
  );
};
