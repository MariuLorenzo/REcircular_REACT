import { Link } from 'react-router-dom';

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
    <div style={{ width: '100%' }}>
      {/* Hero Banner */}
      <section
        style={{
          backgroundColor: '#fff5e0',
          borderRadius: '24px',
          border: '3px solid var(--primary)',
          padding: 'clamp(1.5rem, 5vw, 3.5rem) clamp(1rem, 4vw, 2.5rem)',
          textAlign: 'center',
          marginBottom: '2.5rem',
          boxShadow: '0 8px 25px rgba(0, 5, 3, 0.06)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <img
            src="/img/logo-recircular.png"
            alt="Recircular"
            style={{ maxHeight: '75px', width: 'auto' }}
          />
        </div>

        <span
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--pink-tint)',
            color: 'var(--accent-pink)',
            border: '2px solid var(--accent-pink)',
            padding: '0.35rem 1.1rem',
            borderRadius: '9999px',
            fontSize: '0.82rem',
            fontWeight: 800,
            marginBottom: '1rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          Feria Americana & Moda Sostenible
        </span>

        <h1
          style={{
            fontSize: 'clamp(1.6rem, 4.8vw, 3.2rem)',
            lineHeight: 1.15,
            marginBottom: '1rem',
            color: 'var(--text)',
          }}
        >
          El estilo del pasado, <br />
          <span style={{ color: 'var(--accent-pink)' }}>el consumo del futuro</span>
        </h1>

        <p
          className="secondary"
          style={{
            fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
            maxWidth: '650px',
            margin: '0 auto 1.8rem',
            lineHeight: 1.55,
          }}
        >
          Descubrí camperas únicas, jeans noventeros, ropa de los 80s, 
          remeras de bandas y muchos más tesoros textiles restaurados 
          con mucho amor💞 y dedicación  <br/>
          Promovemos la consciencia de la "moda REcircular" ♻️ para ayudar 
          a la conservación del planeta 🌎​ eliminando la generación de más residuos 
          de la moda.
          Más vintage, menos fast fashion.  
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link
            to="/productos"
            className="btn bg-primary"
            style={{
              fontSize: '1rem',
              padding: '0.8rem 2rem',
            }}
          >
            Explorar Catálogo 🧥
          </Link>
          <Link
            to="/carrito"
            className="btn bg-pink"
            style={{
              fontSize: '1rem',
              padding: '0.8rem 1.8rem',
            }}
          >
            Ver mi Carrito 🛍️
          </Link>
        </div>
      </section>

      {/* Beneficios Adaptativos */}
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          ¿Por qué elegir feria en Recircular?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {highlights.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid var(--border)',
                borderRadius: '18px',
                padding: '1.75rem 1.25rem',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0, 5, 3, 0.04)',
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.6rem' }}>
                {item.icon}
              </span>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', color: 'var(--accent-pink)' }}>
                {item.title}
              </h3>
              <p className="secondary" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
