import { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';

const CATEGORIAS_PREDEFINIDAS = [
  'Abrigos',
  'Pantalones',
  'Remeras',
  'Camisas',
  'Vestidos',
  'Calzado',
  'Accesorios',
  'Varios',
];

export const ProductForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    categoria: 'Abrigos',
    talle: 'M',
    epoca: "Años 90",
    condicion: 'Excelente estado vintage',
    stock: 1,
    imagen: '',
    descripcion: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        precio: initialData.precio || '',
        categoria: initialData.categoria || 'Abrigos',
        talle: initialData.talle || 'M',
        epoca: initialData.epoca || "Años 90",
        condicion: initialData.condicion || 'Excelente estado vintage',
        stock: initialData.stock ?? 1,
        imagen: initialData.imagen || '',
        descripcion: initialData.descripcion || '',
      });
      setPreviewUrl(initialData.imagen || '');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const validar = () => {
    const errs = {};
    if (!formData.nombre.trim()) {
      errs.nombre = 'El nombre de la prenda es obligatorio.';
    }
    if (!formData.precio || Number(formData.precio) <= 0) {
      errs.precio = 'El precio debe ser un número mayor a 0.';
    }
    if (formData.stock === '' || Number(formData.stock) < 0) {
      errs.stock = 'El stock no puede ser negativo.';
    }
    if (!formData.imagen && !imageFile) {
      errs.imagen = 'Debes indicar una URL de imagen o subir un archivo.';
    }
    setErrores(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    onSubmit(
      {
        ...formData,
        precio: Number(formData.precio),
        stock: Number(formData.stock),
      },
      imageFile
    );
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.headerRow}>
        <h3 className={styles.formTitle}>
          {initialData ? '✏️ Editar Prenda' : '➕ Agregar Nueva Prenda Vintage'}
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel} className={styles.closeBtn}>
            ✕ Cancelar
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid2}>
          {/* Nombre */}
          <div className={styles.field}>
            <label className={styles.label}>Nombre de la prenda *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Campera de Jean Levi's Vintage"
              className={`${styles.input} ${errores.nombre ? styles.inputError : ''}`}
            />
            {errores.nombre && <span className={styles.errorMsg}>{errores.nombre}</span>}
          </div>

          {/* Categoría */}
          <div className={styles.field}>
            <label className={styles.label}>Categoría *</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={styles.select}
            >
              {CATEGORIAS_PREDEFINIDAS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.grid3}>
          {/* Precio */}
          <div className={styles.field}>
            <label className={styles.label}>Precio ($ ARS) *</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="15000"
              min="1"
              className={`${styles.input} ${errores.precio ? styles.inputError : ''}`}
            />
            {errores.precio && <span className={styles.errorMsg}>{errores.precio}</span>}
          </div>

          {/* Stock */}
          <div className={styles.field}>
            <label className={styles.label}>Stock disponible *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className={`${styles.input} ${errores.stock ? styles.inputError : ''}`}
            />
            {errores.stock && <span className={styles.errorMsg}>{errores.stock}</span>}
          </div>

          {/* Talle */}
          <div className={styles.field}>
            <label className={styles.label}>Talle</label>
            <input
              type="text"
              name="talle"
              value={formData.talle}
              onChange={handleChange}
              placeholder="M / 38 / Oversize"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.grid2}>
          {/* Época */}
          <div className={styles.field}>
            <label className={styles.label}>Época / Década</label>
            <input
              type="text"
              name="epoca"
              value={formData.epoca}
              onChange={handleChange}
              placeholder="Años 80 / 90s / Y2K"
              className={styles.input}
            />
          </div>

          {/* Condición */}
          <div className={styles.field}>
            <label className={styles.label}>Condición de conservación</label>
            <input
              type="text"
              name="condicion"
              value={formData.condicion}
              onChange={handleChange}
              placeholder="Excelente / Con desgaste estético natural"
              className={styles.input}
            />
          </div>
        </div>

        {/* Imagen: URL o archivo */}
        <div className={styles.imageUploadSection}>
          <div className={styles.field}>
            <label className={styles.label}>URL directa de la imagen</label>
            <input
              type="url"
              name="imagen"
              value={formData.imagen}
              onChange={(e) => {
                handleChange(e);
                setPreviewUrl(e.target.value);
              }}
              placeholder="https://images.unsplash.com/..."
              className={styles.input}
            />
          </div>

          <div className={styles.dividerOr}>
            <span>O sube un archivo (Firebase Storage)</span>
          </div>

          <div className={styles.field}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
          </div>

          {errores.imagen && <span className={styles.errorMsg}>{errores.imagen}</span>}

          {previewUrl && (
            <div className={styles.previewBox}>
              <span className={styles.previewLabel}>Vista previa:</span>
              <img src={previewUrl} alt="Vista previa" className={styles.previewImg} />
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className={styles.field}>
          <label className={styles.label}>Historia y detalles de la prenda</label>
          <textarea
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe el material, detalles de corte, procedencia y cualquier rasgo distintivo..."
            className={styles.textarea}
          />
        </div>

        {/* Botones de acción */}
        <div className={styles.actionRow}>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
              disabled={loading}
            >
              Cancelar
            </button>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Guardando en Firebase...' : initialData ? '💾 Guardar Cambios' : '✨ Publicar Prenda'}
          </button>
        </div>
      </form>
    </div>
  );
};
