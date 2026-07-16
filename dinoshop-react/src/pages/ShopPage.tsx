// ============================================
// pages/ShopPage.tsx
// Product listing page with filters and sorting
// ============================================

import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../api';
import { useCart } from '../context/CartContext';
import type { Product, Categories } from '../types';

type SortOption = 'default' | 'price-asc' | 'price-desc';

export default function ShopPage() {
  const { addItem } = useCart();

  // ── Data state ──────────────────────────────
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Categories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ── Filter state ────────────────────────────
  const [dietFilter, setDietFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [envFilter, setEnvFilter] = useState('');
  const [eraFilter, setEraFilter] = useState('');
  const [licenseFilter, setLicenseFilter] = useState('');
  const [sort, setSort] = useState<SortOption>('default');

  // ── Fetch data on mount ─────────────────────
  useEffect(() => {
    setLoading(true);
    setError(false);

    Promise.all([fetchProducts(), fetchCategories()])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ── Filter + sort (derived) ─────────────────
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.productType === 'Dinosaur');

    if (dietFilter) result = result.filter((p) => p.diet === dietFilter);
    if (sizeFilter) result = result.filter((p) => p.size === sizeFilter);
    if (envFilter) result = result.filter((p) => p.environment === envFilter);
    if (eraFilter) result = result.filter((p) => p.era === eraFilter);
    if (licenseFilter) {
      const requiresLicense = licenseFilter === 'true';
      result = result.filter((p) => p.requires_license === requiresLicense);
    }

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [products, dietFilter, sizeFilter, envFilter, eraFilter, licenseFilter, sort]);

  // ── Helpers ─────────────────────────────────
  function handleAddToCart(product: Product) {
    addItem(product, 1);
    alert(`"${product.name}" added to cart!`);
  }

  function clearFilters() {
    setDietFilter('');
    setSizeFilter('');
    setEnvFilter('');
    setEraFilter('');
    setLicenseFilter('');
    setSort('default');
  }

  const hasActiveFilters =
    dietFilter || sizeFilter || envFilter || eraFilter || licenseFilter || sort !== 'default';

  // ── Loading state ───────────────────────────
  if (loading) {
    return (
      <main className="shop-status">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Loading...</h1>
          <p style={{ color: 'var(--muted)' }}>Fetching dinosaur catalogue</p>
        </div>
      </main>
    );
  }

  // ── Error state ─────────────────────────────
  if (error) {
    return (
      <main className="shop-status">
        <div className="container" style={{ textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Could not load products. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  // ── Render ──────────────────────────────────
  return (
    <main>
      {/* Header */}
      <section className="shop-header">
        <div className="container">
          <h1>Our Dinos</h1>
          <p style={{ color: 'var(--muted)' }}>
            Browse our collection and find your perfect companion.
          </p>
        </div>
      </section>

      {/* Filters + Sort */}
      <section className="shop-controls">
        <div className="container">
          <div className="shop-filters">
            <select
              value={dietFilter}
              onChange={(e) => setDietFilter(e.target.value)}
              className="shop-select"
            >
              <option value="">Diet</option>
              {categories?.diet.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="shop-select"
            >
              <option value="">Size</option>
              {categories?.size.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <select
              value={envFilter}
              onChange={(e) => setEnvFilter(e.target.value)}
              className="shop-select"
            >
              <option value="">Environment</option>
              {categories?.environment.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <select
              value={eraFilter}
              onChange={(e) => setEraFilter(e.target.value)}
              className="shop-select"
            >
              <option value="">Era</option>
              {categories?.era.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            <select
              value={licenseFilter}
              onChange={(e) => setLicenseFilter(e.target.value)}
              className="shop-select"
            >
              <option value="">License</option>
              <option value="true">Requires license</option>
              <option value="false">No license needed</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="shop-select"
            >
              <option value="default">Sort</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>

            {hasActiveFilters && (
              <button
                className="btn btn-raww-outline shop-clear-btn"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="shop-products">
        <div className="container">
          {filteredProducts.length === 0 ? (
            <div className="shop-no-results">
              <h2>No dinos found</h2>
              <p style={{ color: 'var(--muted)' }}>
                Try adjusting your filters to find more dinosaurs.
              </p>
              {hasActiveFilters && (
                <button
                  className="btn btn-raww-outline"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <div className="shop-grid">
              {filteredProducts.map((dino) => {
                const dietClass =
                  dino.diet === 'Carnivore'
                    ? 'tag-carnivore'
                    : dino.diet === 'Herbivore'
                      ? 'tag-herbivore'
                      : 'tag-omnivore';

                return (
                  <div key={dino.id} className="product-card">
                    <Link to={`/product/${dino.id}`}>
                      <div className="product-image-wrap">
                        <img
                          src={`/${dino.mainImage}`}
                          alt={dino.name}
                        />
                      </div>
                    </Link>

                    <div className="product-card-body">
                      {dino.era && <p className="product-era">{dino.era}</p>}
                      <h3 className="product-title">{dino.name}</h3>
                      <p className="product-price-card">{dino.price} DKK</p>

                      <div className="product-meta">
                        {dino.diet && (
                          <span className={`tag ${dietClass}`}>{dino.diet}</span>
                        )}
                        {dino.environment && (
                          <span className="tag tag-environment">{dino.environment}</span>
                        )}
                        {dino.size && (
                          <span className="tag tag-size">{dino.size}</span>
                        )}
                        {dino.requires_license && (
                          <span className="tag tag-license">License required</span>
                        )}
                      </div>

                      <div className="shop-card-actions">
                        <Link
                          to={`/product/${dino.id}`}
                          className="btn btn-raww-outline btn-sm"
                        >
                          View
                        </Link>
                        <button
                          className="btn btn-raww-primary btn-sm"
                          onClick={() => handleAddToCart(dino)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
