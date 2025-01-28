import { ProductShowcase } from '../ProductShowcase';
import { ProductGrid } from '../ProductGrid';
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import './Pages.css';

const products = [
    {
      id: 1,
      name: "Basic Tee",
      price: 35,
      imageUrl: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      name: "Wool Sweater",
      price: 89,
      imageUrl: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      name: "Denim Jeans",
      price: 65,
      imageUrl: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 4,
      name: "Cotton Shirt",
      price: 45,
      imageUrl: "/placeholder.svg?height=400&width=300",
    },
  ]
  
  const HomePage = () => {
    return (
      <div className="home-page">
        <Header />
        <main className="home-page-main">
          <ProductShowcase
            title="Extra Warm Cashmere Blend Crew Neck T-Shirt"
            price={15.00}
            description="The perfect layering piece for colder days."
            imageUrl="/placeholder.svg?height=800&width=600"
            isLimitedOffer={true}
            offerEndDate="February 12th"
          />
          <ProductGrid products={products} />
        </main>
        <Footer />
      </div>
    )
  }
  
  export default HomePage