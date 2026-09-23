import styles from './Footer.module.css';

export const Footer = () => {
  const staff = [
    {
      id: 1,
      nombre: 'Mariu',
      rol: 'Curadora Vintage',
      bio: 'Especialista en moda de todos los tiempos. Recorre ferias y baúles rescatando joyas textiles únicas.',
      avatar: 'public/img/eternal sunshine of spotless mind A.jpg',
    },
    {
      id: 2,
      nombre: 'Mari-e',
      rol: 'Fundadora & Logística',
      bio: 'Impulsora de la moda circular y sustentable. Gestiona nuestras entregas con packaging biodegradable.',
      avatar: 'public/img/pirata_m.jpg',
    },
    {
      id: 3,
      nombre: 'Maro',
      rol: 'Restauradora Textil',
      bio: 'Artesana de la costura. Encargada del acondicionamiento, restauración y cuidado de todas las prendas.',
      avatar: 'public/img/Snapchat-485623790.jpg',
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Información Institucional */}
        <div className={styles.companyInfo}>
          <div className={styles.brandRow}>
            <img
              src="/img/logo-recircular.png"
              alt="Recircular"
              className={styles.footerLogo}
            />
          </div>
          <p className={styles.companyDesc}>
            Feria americana online con propósito. <br/>
            Impulsamos la economía circular,
            el rescate de prendas de época y la reducción de la huella ambiental
            a través de piezas con historia y estilo irrepetible.♻️​
          </p>
          <div className={styles.extraData}>
            <span>📍 Palermo Soho, Buenos Aires</span>
            <span>✉️ hola@recircular.com.ar</span>
            <span>🕒 Lun a Sáb: 10:00 a 20:00 hs</span>
          </div>
        </div>

        {/* Sección de 3 tarjetas de personas del equipo */}
        <div className={styles.staffSection}>
          <h4 className={styles.staffTitle}>Equipo de Curaduría & Restauración</h4>
          <div className={styles.staffGrid}>
            {staff.map((persona) => (
              <div key={persona.id} className={styles.staffCard}>
                <img
                  src={persona.avatar}
                  alt={persona.nombre}
                  className={styles.staffAvatar}
                />
                <div className={styles.staffContent}>
                  <h5 className={styles.staffName}>{persona.nombre}</h5>
                  <span className={styles.staffRole}>{persona.rol}</span>
                  <p className={styles.staffBio}>{persona.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.bottomBar}>
          <p>© {new Date().getFullYear()} Recircular — Feria Americana. TP Final React SPA.</p>
        </div>
      </div>
    </footer>
  );
};
