import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import type { Product } from '../types';

function PopularProductsSection() {
  const [popular, setPopular] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        const dinos = products
          .filter((p) => p.productType === 'Dinosaur' && p.stock_quantity > 0)
          .slice(0, 4);
        setPopular(dinos);
      })
      .catch(() => {
        setPopular([]);
      });
  }, []);

  return (
    <section
      id="popular"
      className="py-5"
      style={{
        backgroundColor: 'var(--surface)',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Most popular right now</h2>
        </div>

        {popular.length > 0 ? (
          <div className="related-grid">
            {popular.map((dino) => (
              <Link
                key={dino.id}
                to={`/product/${dino.id}`}
                className="product-card"
                style={{ textDecoration: 'none' }}
              >
                <div className="product-image-wrap">
                  <img src={`/${dino.mainImage}`} alt={dino.name} />
                </div>
                <div className="product-card-body">
                  {dino.era && <p className="product-era">{dino.era}</p>}
                  <h3 className="product-title">{dino.name}</h3>
                  <p className="product-price-card">{dino.price} DKK</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
            Loading popular dinosaurs...
          </p>
        )}
      </div>
    </section>
  );
}

export default PopularProductsSection;
