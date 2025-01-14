import { ProductGrid } from '../products/ProductGrid';
import './Pages.css';

const womensProducts = [
  {
    id: 1,
    name: "Women's Basic Tee",
    price: 35,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 2,
    name: "Women's Wool Sweater",
    price: 89,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 3,
    name: "Women's Denim Jeans",
    price: 65,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 4,
    name: "Women's Cotton Blouse",
    price: 45,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 5,
    name: "Women's Leather Jacket",
    price: 189,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 6,
    name: "Women's Maxi Dress",
    price: 79,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 7,
    name: "Women's Yoga Pants",
    price: 55,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 8,
    name: "Women's Cardigan",
    price: 60,
    imageUrl: '/placeholder.svg?height=400&width=300',
  },
]

const WomenPage = () => {
  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Womens Collection</h1>
        <ProductGrid products={womensProducts} />
      </div>
    </div>
  )
}

export default WomenPage

