"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductGrid from "../products/ProductGrid";
import fetchProductsByCategory from "../../store/productSlice";
import './Pages.css';

const STATIC_MENS_PRODUCTS = [
  {
    id: 1,
    name: "Men's Basic Tee",
    price: 15,
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
];

const MensPage = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory("men's clothing"));
  }, [dispatch]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="loading-message">
            Loading products...
          </div>
        );
      
      case 'failed':
        return (
          <>
            <div className="error-message">
              Error loading products: {error}. Showing sample products instead.
            </div>
            <ProductGrid products={STATIC_MENS_PRODUCTS} />
          </>
        );
      
      case 'succeeded':
        return products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <>
            <div className="empty-message">
              No products found. Showing sample products.
            </div>
            <ProductGrid products={STATIC_MENS_PRODUCTS} />
          </>
        );
      
      default:
        return <ProductGrid products={STATIC_MENS_PRODUCTS} />;
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <h1 className="page-title">Men`s Collection</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default MensPage;