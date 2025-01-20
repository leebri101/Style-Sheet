import { ProductGrid } from '../products/ProductGrid';
import '../../css/Pages.css';

const mensProducts = [
    {
        id: 1,
        name: "Men's Basic Tee",
        price: 25,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 2,
        name: "Men's Wool Sweater",
        price: 89,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 3,
        name: "Men's Denim Jeans",
        price: 65,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 4,
        name: "Men's Cotton Shirt",
        price: 45,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 5,
        name: "Men's Leather Jacket",
        price: 199,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 6,
        name: "Men's Chino Pants",
        price: 55,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 7,
        name: "Men's Polo Shirt",
        price: 40,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 8,
        name: "Men's Hoodie",
        price: 70,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
]

const MensPage = () =>{
    return(
        <div className="page">
            <div className="page-content">
                <h1 className="page-title">Mens Collection</h1>
                <ProductGrid products={mensProducts} />
            </div>
        </div>
    )
}

export default MensPage;