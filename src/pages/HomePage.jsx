import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const highlights = [
    {
      icon: '♻️',
      title: 'Moda Circular y Consciente',
      desc: 'Alargar el ciclo de vida de prendas vintage existentes reduce drásticamente la huella hídrica y de carbono.',
    },
    {
      icon: '✨',
      title: 'Piezas Únicas de Época',
      desc: 'Curaduría exclusiva de los años 70s, 80s, 90s y 2000s. No encontrarás dos prendas iguales.',
    },
    {
      icon: '📦',
      title: 'Envíos Sustentables',
      desc: 'Packaging 100% biodegradable con entrega rápida y segura a todo el país.',
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>REcircular — Moda Circular y Tesoros Vintage</title>
        <meta
          name="description"
          content="Tienda online sustentable de prendas vintage únicas de los 70s, 80s, 90s y 2000s rescatadas con amor."
        />
      </Helmet>

      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <div className={styles.logoWrapper}>
          <img
            src="/img/logo-recircular.png"
            alt="Recircular"
            className={styles.heroLogoImg}
          />
        </div>

        <span className={styles.badgeTag}>
          Feria Americana & Moda Sostenible
        </span>

        <h1 className={styles.heroTitle}>
          El estilo del pasado, <br />
          <span className={styles.heroTitleAccent}>el consumo del futuro</span>
        </h1>

        <p className={styles.heroDesc}>
          Descubrí camperas únicas, jeans noventeros, ropa de los 80s, 
          remeras de bandas y muchos más tesoros textiles restaurados 
          con mucho amor💞 y dedicación. <br />
          Promovemos la consciencia de la "moda REcircular" ♻️ para ayudar 
          a la conservación del planeta 🌎 eliminando la generación de más residuos 
          de la moda. Más vintage, menos fast fashion.
        </p>

        <div className={styles.heroButtons}>
          <Link
            to="/productos"
            className={`btn bg-primary ${styles.heroBtnPrimary}`}
          >
            Explorar Catálogo 🧥
          </Link>
          <Link
            to="/carrito"
            className={`btn bg-pink ${styles.heroBtnPink}`}
          >
            Ver mi Carrito 🛍️
          </Link>
        </div>
      </section>

      {/* Beneficios Adaptativos (Resuelve responsive en 272px x 480px) */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.benefitsTitle}>
          ¿Por qué elegir feria Recircular?
        </h2>
        <div className={styles.benefitsGrid}>
          {highlights.map((item, idx) => (
            <div key={idx} className={styles.benefitCard}>
              <span className={styles.benefitIcon}>
                {item.icon}
              </span>
              <h3 className={styles.benefitCardTitle}>
                {item.title}
              </h3>
              <p className={styles.benefitCardDesc}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
