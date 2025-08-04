import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import { selectProducts, selectLoading, selectError} from "../../store/productSlice";
import "./MensPage.css";

const MenPage = () => {
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
        // Fetch all clothing categories for men's page
        const [mensResponse, womensResponse, electronicsResponse, jewelryResponse] = await Promise.all([
          fetch("https://fakestoreapi.com/products/category/men's clothing"),
          fetch("https://fakestoreapi.com/products/category/women's clothing"),
          fetch("https://fakestoreapi.com/products/category/electronics"),
          fetch("https://fakestoreapi.com/products/category/jewelery"),
        ])

        const [mensProducts, womensProducts, electronicsProducts, jewelryProducts] = await Promise.all([
          mensResponse.json(),
          womensResponse.json(),
          electronicsResponse.json(),
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
          image: product.image, // Use real API image
          imageUrl: product.image, // Use real API image
          images: [product.image], // Use real API image
          rating: {
            rate: product.rating?.rate || 0,
            count: product.rating?.count || 0,
          },
          stockQuantity: Math.floor(Math.random() * 100) + 10,
          inStock: true,
          brand: product.category.includes("men's") ? "Men's Brand" : "Women's Brand",
          sizes: ["XS", "S", "M", "L", "XL", "XXL"],
          colors: ["Black", "White", "Navy", "Gray", "Red"],
          featured: Math.random() > 0.7,
          tags: [product.category, "clothing"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))

        // Transform misc products as coming soon (no price) with real images
        const miscProducts = [...electronicsProducts, ...jewelryProducts].map((product) => ({
          id: `coming-soon-${product.id}`,
          name: product.title,
          title: product.title,
          price: null, // No price for coming soon items
          description: "Coming Soon - Stay tuned for availability",
          category: product.category,
          image: product.image, // Use real API image
          imageUrl: product.image, // Use real API image
          images: [product.image], // Use real API image
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
      <div className="men-page">
        <div className="men-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    )
  }

  if (error && allProducts.length === 0) {
    return (
      <div className="men-page">
        <div className="men-error">
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
    <div className="men-page">
      {/* Hero Section */}
      <div className="men-hero">
        <div className="men-hero-content">
          <h1 className="men-hero-title">Men&apos;s Collection</h1>
          <p className="men-hero-subtitle">Discover our premium selection of clothing and upcoming products</p>
          <div className="men-hero-stats">
            <span className="product-count">{allClothingProducts.length} clothing items available</span>
            <span className="coming-soon-count">{comingSoonProducts.length} items coming soon</span>
          </div>
        </div>
        <div className="men-hero-image">
          <img
            src="/placeholder.svg?height=400&width=600&text=Men's+Fashion"
            alt="Men's Fashion Collection"
            className="hero-image"
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="men-categories">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            <div className="category-card">
              <img
                src="/placeholder.svg?height=200&width=300&text=Men's+Clothing"
                alt="Men's Clothing"
                className="category-image"
              />
              <h3>Men&apos;s Clothing</h3>
              <p>Premium fashion</p>
              <span className="category-count">
                {allClothingProducts.filter((p) => p.category === "men's clothing").length} items
              </span>
            </div>
            <div className="category-card">
              <img
                src="/placeholder.svg?height=200&width=300&text=Women's+Clothing"
                alt="Women's Clothing"
                className="category-image"
              />
              <h3>Women&apos;s Clothing</h3>
              <p>Stylish women&apos;s fashion</p>
              <span className="category-count">
                {allClothingProducts.filter((p) => p.category === "women's clothing").length} items
              </span>
            </div>
            <div className="category-card coming-soon-card">
              <img
                src="/placeholder.svg?height=200&width=300&text=Coming+Soon"
                alt="Coming Soon"
                className="category-image"
              />
              <h3>More Categories</h3>
              <p>Electronics & Jewelry coming soon</p>
              <span className="category-count">{comingSoonProducts.length} items</span>
            </div>
          </div>
        </div>
      </div>

      {/* Available Clothing Section */}
      <div className="men-products">
        <div className="container">
          <h2 className="section-title">Available Clothing</h2>
          {allClothingProducts.length > 0 ? (
            <ProductGrid products={allClothingProducts} loading={false} />
          ) : (
            <div className="no-products">
              <h3>No clothing items found</h3>
              <p>Check back later for new arrivals.</p>
            </div>
          )}
        </div>
      </div>

      {/* Coming Soon Section */}
      {comingSoonProducts.length > 0 && (
        <div className="coming-soon-section">
          <div className="container">
            <h2 className="section-title">Coming Soon</h2>
            <p className="section-subtitle">These exciting products will be available soon!</p>
            <ProductGrid products={comingSoonProducts} loading={false} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MenPage
