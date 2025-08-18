"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import { selectProducts, selectLoading, selectError } from "../../store/productSlice";
import './WomensPage.css';


const WomenPage = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const loading = useSelector(selectLoading)
  const error = useSelector(selectError)
  const [allClothingProducts, setAllClothingProducts] = useState([])
  const [comingSoonProducts, setComingSoonProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true)
      try {
        // Fetch all clothing categories for women's page
        const [mensResponse, womensResponse, jewelryResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products/category/men's clothing"),
          fetch("https://fakestoreapi.com/products/category/women's clothing"),
          fetch("https://fakestoreapi.com/products/category/jewelery"),
        ])

        const [mensProducts, womensProducts, jewelryProducts] = await Promise.all([
          mensResponse.json(),
          womensResponse.json(),
          jewelryResponse.json(),
        ])

        // Transform clothing products (both men's and women's) with real images
        const clothingProducts = [...mensProducts, ...womensProducts].map((product) => ({
          id: product.id,
          name: product.title,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image, // Use of API image
          imageUrl: product.image, // Use of API image
          images: [product.image], // Use of API image
          rating: {
            rate: product.rating?.rate || 0,
            count: product.rating?.count || 0,
          },
          stockQuantity: Math.floor(Math.random() * 100) + 10,
          inStock: true,
          brand: product.category.includes("women's") ? "Women's Brand" : "Men's Brand",
          sizes: ["XS", "S", "M", "L", "XL", "XXL"],
          colors: ["Black", "White", "Navy", "Gray", "Red", "Pink", "Purple"],
          featured: Math.random() > 0.7,
          tags: [product.category, "clothing"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))

        // Transform misc products as coming soon (no price) with real images
        const miscProducts = [...jewelryProducts].map((product) => ({
          id: `coming-soon-${product.id}`,
          name: product.title,
          title: product.title,
          price: null, // No price for coming soon items
          description: "Coming Soon - Stay tuned for availability",
          category: product.category,
          image: product.image, // Use of API image
          imageUrl: product.image, // Use of API image
          images: [product.image], // Use of API image
          rating: {
            rate: 0,
            count: 0,
          },
          stockQuantity: 0,
          inStock: false,
          brand: "Coming Soon",
          sizes: [],
          colors: [],
          featured: false,
          tags: [product.category, "coming-soon"],
          comingSoon: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))

        setAllClothingProducts(clothingProducts)
        setComingSoonProducts(miscProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllProducts()
  }, [])

  const allProducts = [...allClothingProducts, ...comingSoonProducts]

  if (isLoading) {
    return (
      <div className="women-page">
        <div className="women-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  if (error && allProducts.length === 0) {
    return (
      <div className="women-page">
        <div className="women-error">
          <h2>Error loading products</h2>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="women-page">
      {/* Hero Section */}
      <div className="women-hero">
        <div className="women-hero-content">
          <h1 className="women-hero-title">Women&apos;s Collection</h1>
          <p className="women-hero-subtitle">Explore our elegant selection of pieces</p>
        </div>
        <div className="women-hero-image">
          <img
            src="src\assets\docs\images\product-images\womens-clothing\woman-shopping.jpg"
            alt="Women's Fashion Collection"
            className="hero-image"
          />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="women-categories">
        <div className="container">
          <h2 className="section-title">Shop by Style</h2>
          <div className="category-grid">
            <div className="category-card">
              <h3>Kids&apos;s Fashion</h3>
            </div>
            <div className="category-card">
              <h3>Men&apos;s Fashion</h3>
            </div>
            <div className="category-card coming-soon-card">
              <img
                src="src\assets\docs\images\construction-gif.gif"
                alt="Coming Soon"
                className="category-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Available Clothing Section */}
      <div className="women-products">
        <div className="container">
          <h2 className="section-title">Available Clothing</h2>
          {allClothingProducts.length > 0 ? (
            <ProductGrid products={allClothingProducts} loading={false} />
          ) : (
            <div className="no-products">
              <h3>No items found</h3>
              <p>Check back later.</p>
            </div>
          )}
        </div>
      </div>

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <div className="coming-soon-section">
          <div className="container">
            <h2 className="section-title">Coming Soon</h2>
            <p className="section-subtitle">These products will be coming soon!</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default WomenPage
