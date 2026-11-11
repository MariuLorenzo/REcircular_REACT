import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase/firebase';

const PRODUCTS_COLLECTION = 'productos';
const ORDERS_COLLECTION = 'ordenes';

/**
 * Escucha cambios en la colección de productos en tiempo real.
 * @param {Function} onData - Callback que recibe la lista de productos actualizados.
 * @param {Function} onError - Callback en caso de error.
 * @returns {Function} Función para cancelar la suscripción (unsubscribe).
 */
export const subscribeProducts = (onData, onError) => {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      onData(items);
    },
    (err) => {
      console.error('Error al escuchar productos en Firestore:', err);
      if (onError) onError(err);
    }
  );
};

/**
 * Obtiene un producto individual por su ID de Firestore.
 */
export const getProductById = async (id) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

/**
 * Sube una imagen a Firebase Storage y retorna la URL pública.
 */
export const uploadProductImage = async (file) => {
  if (!file) return null;
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const storageRef = ref(storage, `productos/${fileName}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

/**
 * Crea un producto nuevo en Firestore.
 */
export const createProduct = async (productData, imageFile = null) => {
  let finalImageUrl = productData.imagen || '';

  if (imageFile) {
    try {
      const uploadedUrl = await uploadProductImage(imageFile);
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    } catch (err) {
      console.warn('No se pudo subir a Storage, usando URL provista si existe:', err);
    }
  }

  const nuevoDoc = {
    nombre: productData.nombre.trim(),
    precio: Number(productData.precio) || 0,
    categoria: productData.categoria || 'Varios',
    talle: productData.talle || 'Único',
    epoca: productData.epoca || 'Vintage',
    condicion: productData.condicion || 'Muy bueno',
    stock: Number(productData.stock) >= 0 ? Number(productData.stock) : 1,
    imagen: finalImageUrl || 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
    descripcion: productData.descripcion || '',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), nuevoDoc);
  return { id: docRef.id, ...nuevoDoc };
};

/**
 * Actualiza un producto existente en Firestore.
 */
export const updateProduct = async (id, productData, imageFile = null) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  let finalImageUrl = productData.imagen;

  if (imageFile) {
    try {
      const uploadedUrl = await uploadProductImage(imageFile);
      if (uploadedUrl) finalImageUrl = uploadedUrl;
    } catch (err) {
      console.warn('No se pudo subir imagen a Storage:', err);
    }
  }

  const datosActualizados = {
    nombre: productData.nombre.trim(),
    precio: Number(productData.precio) || 0,
    categoria: productData.categoria || 'Varios',
    talle: productData.talle || 'Único',
    epoca: productData.epoca || 'Vintage',
    condicion: productData.condicion || 'Muy bueno',
    stock: Number(productData.stock) >= 0 ? Number(productData.stock) : 0,
    imagen: finalImageUrl,
    descripcion: productData.descripcion || '',
    updatedAt: serverTimestamp(),
  };

  await updateDoc(docRef, datosActualizados);
  return { id, ...datosActualizados };
};

/**
 * Elimina un producto de Firestore.
 */
export const deleteProduct = async (id) => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
};

/**
 * Carga el catálogo inicial desde public/productos.json en Firestore con un batch.
 */
export const seedInitialCatalog = async () => {
  const res = await fetch('/productos.json');
  if (!res.ok) throw new Error('No se pudo leer /productos.json');
  const catalog = await res.json();

  const batch = writeBatch(db);
  const colRef = collection(db, PRODUCTS_COLLECTION);

  catalog.forEach((item) => {
    // Si queremos mantener el ID numérico o generar uno nuevo en Firestore:
    const docRef = doc(colRef);
    const { id: _oldId, ...datos } = item;
    batch.set(docRef, {
      ...datos,
      precio: Number(datos.precio) || 0,
      stock: Number(datos.stock) || 1,
      createdAt: serverTimestamp(),
    });
  });

  await batch.commit();
  return catalog.length;
};

/**
 * Escucha las órdenes de compra en tiempo real.
 */
export const subscribeOrders = (onData, onError) => {
  const colRef = collection(db, ORDERS_COLLECTION);
  const q = query(colRef, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      onData(orders);
    },
    (err) => {
      // Si la colección no tiene índice compuesto o aún no existe el campo, se intenta consulta simple
      return onSnapshot(colRef, (snapshot) => {
        const orders = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        onData(orders);
      }, onError);
    }
  );
};
