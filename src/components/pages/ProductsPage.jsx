import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { ProductDetails } from "../ProductDetails";
import { ProductGrid } from "../ProductGrid";

const allProducts = [
    {
        id: 1,
        name: "Men's Basic Tee",
        price: 35,
        imageUrl: '/placeholder.svg?height=400&width=300',
        description: "A comfortable and versatile t-shirt for everyday wear.",
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'men'
    },
    {
        id: 2,
        name: "Women's Wool Sweater",
        price: 89,
        imageUrl: '/placeholder.svg?height=400&width=300',
        description: "A warm and stylish wool sweater perfect for colder days.",
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'women'
    },
    {
        id: 3,
        name: "Kids' Jeans",
        price: 45,
        imageUrl: '/placeholder.svg?height=400&width=300',
        description: "Durable and comfortable jeans for active kids.",
        sizes: ['4', '5', '6', '7', '8'],
        category: 'kids'
    },
    {
        id: 4,
        name: "Men's Leather Jacket",
        price: 199,
        imageUrl: '/placeholder.svg?height=400&width=300',
        description: "A classic leather jacket that never goes out of style.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        category: 'men'
    },
    {
        id: 5,
        name: "Women's Maxi Dress",
        price: 79,
        imageUrl: '/placeholder.svg?height=400&width=300',
        description: "An elegant maxi dress suitable for various occasions.",
        sizes: ['XS', 'S', 'M', 'L'],
        category: 'women'
    },
    {
        id: 6,
        name: "Kids' Sneakers",
        price: 55,
        imageUrl: '/placeholder.svg?height=400&width=300',
        description: "Comfortable and stylish sneakers for active kids.",
        sizes: ['1', '2', '3', '4', '5'],
        category: 'kids'
    }
]

const ProductsPage = () => {
    const { id } = useParams();
    const [products, setProducts] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        const selectedProduct = allProducts.find(p => p.id === Number(id))
        setProducts(selectedProduct)
        
        if(selectedProduct) {
            const related = allProducts.filter(p => p.category === selectedProduct.category && p.id !==selectedProduct.id)
            .slice(0, 4)
            setRelatedProducts(related)
        }
    }, [id])

    if (!products) {
        return <div className="product-page-loading">Loading...</div>
      }
    
      return (
        <div className="product-page">
          <ProductDetails {...products} />
          <div className="related-products">
            <h2 className="related-products-title">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </div>
      )
    }
    
export default ProductsPage;