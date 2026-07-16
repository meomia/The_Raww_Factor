// ============================================
// pages/ProductPage.tsx
// React + TypeScript port of productPage.html
// + script/dinoProductScript.js
// ============================================

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../api';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem, isInStock } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch product + all products on mount or when id changes
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(false);

    Promise.all([fetchProductById(Number(id)), fetchProducts()])
      .then(([prod, all]) => {
        setProduct(prod);
        setAllProducts(all);
        setSelectedImage(`/${prod.mainImage}`);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  // Scroll to top when navigating between products
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ── Loading ───────────────────────────────────
  if (loading) {
    return (
      <main className="product-page-status">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Loading...</h1>
          <p style={{ color: 'var(--muted)' }}>Fetching dinosaur details</p>
        </div>
      </main>
    );
  }

  // ── Not found ─────────────────────────────────
  if (error || !product) {
    return (
      <main className="product-page-status">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Product not found</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            We could not find the requested dinosaur.
          </p>
          <Link to="/shop" className="btn btn-raww-primary">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  // ── Derived data ──────────────────────────────

  const thumbnails = [
    `/${product.mainImage}`,
    ...(product.extraImages ?? []).map((img) => `/${img}`),
  ];

  const dietClass =
    product.diet === 'Carnivore'
      ? 'tag-carnivore'
      : product.diet === 'Herbivore'
        ? 'tag-herbivore'
        : 'tag-omnivore';

  const inStock = isInStock(product.id, allProducts);

  const relatedProducts = allProducts
    .filter((p) => p.productType === 'Dinosaur' && p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    if (!product) return;
    addItem(product, 1);
    alert(`"${product.name}" added to cart!`);
  }

  function toggleSection(key: string) {
    setOpenSection((prev) => (prev === key ? null : key));
  }

  // ── Render ────────────────────────────────────
  return (
    <>
      {/* ── Product detail ── */}
      <section style={{ padding: '2.5rem 0' }}>
        <div className="container">
          <div className="product-detail">
            {/* Left column: images */}
            <div>
              <div className="product-main-image">
                <img src={selectedImage} alt={product.name} />
              </div>

              {thumbnails.length > 1 && (
                <div className="thumb-row">
                  {thumbnails.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className={
                        'product-thumb' +
                        (img === selectedImage ? ' active' : '')
                      }
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right column: info */}
            <div>
              <h1 style={{ marginBottom: '1rem' }}>{product.name}</h1>

              <div className="product-meta">
                {product.diet && (
                  <span className={`tag ${dietClass}`}>{product.diet}</span>
                )}
                {product.environment && (
                  <span className="tag tag-environment">
                    {product.environment}
                  </span>
                )}
                {product.size && (
                  <span className="tag tag-size">{product.size}</span>
                )}
                {product.requires_license && (
                  <span className="tag tag-license">License required</span>
                )}
              </div>

              {product.traits && (
                <p style={{ marginTop: '1.5rem', color: 'var(--muted)' }}>
                  {product.traits}
                </p>
              )}
              {product.description && (
                <p style={{ color: 'var(--muted)' }}>{product.description}</p>
              )}

              <div className="product-detail-price">
                {product.price} DKK
              </div>

              {!inStock && (
                <p className="product-out-of-stock">Out of stock</p>
              )}

              <button
                className="btn btn-raww-primary"
                onClick={handleAddToCart}
                disabled={!inStock}
                style={
                  !inStock
                    ? { opacity: 0.5, cursor: 'not-allowed' }
                    : undefined
                }
              >
                Add to basket
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Accordions ── */}
      <section style={{ paddingBottom: '2.5rem' }}>
        <div className="container">
          {product.description && (
            <div className="accordion-section">
              <div
                className="accordion-toggle"
                onClick={() => toggleSection('traits')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    toggleSection('traits');
                }}
              >
                <span>This is a good choice for you if...</span>
                <span className="accordion-icon">
                  {openSection === 'traits' ? '−' : '+'}
                </span>
              </div>
              {openSection === 'traits' && (
                <div className="accordion-body">{product.description}</div>
              )}
            </div>
          )}

          {product.ownership_requirement && (
            <div className="accordion-section">
              <div
                className="accordion-toggle"
                onClick={() => toggleSection('ownership')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ')
                    toggleSection('ownership');
                }}
              >
                <span>Legal owner requirements</span>
                <span className="accordion-icon">
                  {openSection === 'ownership' ? '−' : '+'}
                </span>
              </div>
              {openSection === 'ownership' && (
                <div className="accordion-body">
                  {product.ownership_requirement}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Related products ── */}
      {relatedProducts.length > 0 && (
        <section style={{ padding: '2.5rem 0' }}>
          <div className="container">
            <h2 style={{ marginBottom: '2rem' }}>You might also like...</h2>
            <div className="related-grid">
              {relatedProducts.map((rel) => {
                const relDietClass =
                  rel.diet === 'Carnivore'
                    ? 'tag-carnivore'
                    : rel.diet === 'Herbivore'
                      ? 'tag-herbivore'
                      : 'tag-omnivore';

                return (
                  <Link
                    to={`/product/${rel.id}`}
                    key={rel.id}
                    className="product-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="product-image-wrap">
                      <img
                        src={`/${rel.mainImage}`}
                        alt={rel.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div className="product-card-body">
                      {rel.era && <p className="product-era">{rel.era}</p>}
                      <h3 className="product-title">{rel.name}</h3>
                      <p className="product-price-card">{rel.price} DKK</p>
                      <div className="product-meta">
                        {rel.diet && (
                          <span className={`tag ${relDietClass}`}>
                            {rel.diet}
                          </span>
                        )}
                        {rel.environment && (
                          <span className="tag tag-environment">
                            {rel.environment}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
