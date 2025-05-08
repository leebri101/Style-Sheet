import ProductGrid from "../products/ProductGrid";
import './Pages.css';


const kidsProducts = [
    {
        id: 1,
        name: "Kids' Basic Tee",
        price: 25,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 2,
        name: "Kids' Hoodie",
        price: 49,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 3,
        name: "Kids' Jeans",
        price: 45,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 4,
        name: "Kids' Sneakers",
        price: 55,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 5,
        name: "Kids' Pajama Set",
        price: 35,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 6,
        name: "Kids' Backpack",
        price: 30,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 7,
        name: "Kids' Dress",
        price: 40,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
    {
        id: 8,
        name: "Kids' Swim Shorts",
        price: 20,
        imageUrl: '/placeholder.svg?height=400&width=300',
    },
]

const KidsPage = () =>{
    return(
        <div className="page">
            <div className="page-content">
                <h1 className="page-title">Kids Collection</h1>
                <ProductGrid products={kidsProducts} />
            </div>
        </div>
    )
}

export default KidsPage;