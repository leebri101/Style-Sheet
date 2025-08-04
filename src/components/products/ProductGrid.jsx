"use client"
import PropTypes from "prop-types"
import { useState } from "react"
import ProductCard from "./ProductCard"
import "./ProductGrid.css"

const ProductGrid = ({ products, loading = false }) => {
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")

  // Separate clothing and coming soon products
  const clothingProducts = products.filter((product) => !product.comingSoon && product.price !== null)
  const comingSoonProducts = products.filter((product) => product.comingSoon || product.price === null)

  // Sort products
  const sortProducts = (productsToSort) => {
    return [...productsToSort].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0)
        case "price-high":
          return (b.price || 0) - (a.price || 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }

  // Filter products
  const filterProducts = (productsToFilter) => {
    if (filterBy === "all") return productsToFilter
    return productsToFilter.filter((product) => product.category.toLowerCase().includes(filterBy.toLowerCase()))
  }

  const sortedClothingProducts = sortProducts(filterProducts(clothingProducts))
  const sortedComingSoonProducts = sortProducts(filterProducts(comingSoonProducts))

  if (loading) {
    return (
      <div className="product-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="product-grid-container">
      {/* Filter and Sort Controls */}
      <div className="product-controls">
        <div className="filter-controls">
          <label htmlFor="filter-select">Filter by:</label>
          <select
            id="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="men's clothing">Men&apos;s Clothing</option>
            <option value="women's clothing">Women&apos;s Clothing</option>
            <option value="jewelry">Coming Soon</option>
          </select>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Product Stats */}
      <div className="product-stats">
        <span className="available-count">{sortedClothingProducts.length} available products</span>
        {sortedComingSoonProducts.length > 0 && (
          <span className="coming-soon-count">{sortedComingSoonProducts.length} coming soon</span>
        )}
      </div>

      {/* Available Products Grid */}
      {sortedClothingProducts.length > 0 && (
        <div className="products-section">
          <h3 className="section-title">Available Now</h3>
          <div className="product-grid">
            {sortedClothingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Coming Soon Products Grid */}
      {sortedComingSoonProducts.length > 0 && (
        <div className="products-section coming-soon-section">
          <h3 className="section-title">Coming Soon</h3>
          <div className="product-grid">
            {sortedComingSoonProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedClothingProducts.length === 0 && sortedComingSoonProducts.length === 0 && (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
ProductGrid.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool,
}