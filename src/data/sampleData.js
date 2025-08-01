// Sample data for the e-commerce application
export const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    title: "Premium Wireless Headphones",
    price: 299.99,
    description:
      "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
    category: "electronics",
    image: "/placeholder.svg?height=300&width=300&text=Headphones",
    images: [
      "/placeholder.svg?height=300&width=300&text=Headphones",
      "/placeholder.svg?height=300&width=300&text=Headphones-2",
      "/placeholder.svg?height=300&width=300&text=Headphones-3",
    ],
    rating: {
      rate: 4.5,
      count: 128,
    },
    stockQuantity: 45,
    inStock: true,
    brand: "AudioTech",
    sizes: [],
    colors: ["Black", "White", "Silver"],
    featured: true,
    tags: ["electronics", "audio", "wireless"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Classic Cotton T-Shirt",
    title: "Classic Cotton T-Shirt",
    price: 29.99,
    description: "Comfortable and stylish cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.",
    category: "men's clothing",
    image: "/placeholder.svg?height=300&width=300&text=T-Shirt",
    images: [
      "/placeholder.svg?height=300&width=300&text=T-Shirt",
      "/placeholder.svg?height=300&width=300&text=T-Shirt-2",
    ],
    rating: {
      rate: 4.2,
      count: 89,
    },
    stockQuantity: 120,
    inStock: true,
    brand: "ComfortWear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    featured: false,
    tags: ["clothing", "casual", "cotton"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Elegant Women's Dress",
    title: "Elegant Women's Dress",
    price: 89.99,
    description:
      "Beautiful and elegant dress perfect for special occasions. Made from premium fabric with attention to detail.",
    category: "women's clothing",
    image: "/placeholder.svg?height=300&width=300&text=Dress",
    images: [
      "/placeholder.svg?height=300&width=300&text=Dress",
      "/placeholder.svg?height=300&width=300&text=Dress-2",
      "/placeholder.svg?height=300&width=300&text=Dress-3",
    ],
    rating: {
      rate: 4.7,
      count: 156,
    },
    stockQuantity: 35,
    inStock: true,
    brand: "ElegantStyle",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    featured: true,
    tags: ["clothing", "formal", "elegant"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Smart Fitness Watch",
    title: "Smart Fitness Watch",
    price: 199.99,
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and smartphone connectivity.",
    category: "electronics",
    image: "/placeholder.svg?height=300&width=300&text=Watch",
    images: ["/placeholder.svg?height=300&width=300&text=Watch", "/placeholder.svg?height=300&width=300&text=Watch-2"],
    rating: {
      rate: 4.3,
      count: 203,
    },
    stockQuantity: 67,
    inStock: true,
    brand: "FitTech",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Silver", "Rose Gold"],
    featured: false,
    tags: ["electronics", "fitness", "wearable"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Designer Handbag",
    title: "Designer Handbag",
    price: 159.99,
    description: "Luxurious designer handbag crafted from premium leather. Perfect accessory for any outfit.",
    category: "women's clothing",
    image: "/placeholder.svg?height=300&width=300&text=Handbag",
    images: [
      "/placeholder.svg?height=300&width=300&text=Handbag",
      "/placeholder.svg?height=300&width=300&text=Handbag-2",
      "/placeholder.svg?height=300&width=300&text=Handbag-3",
    ],
    rating: {
      rate: 4.6,
      count: 94,
    },
    stockQuantity: 28,
    inStock: true,
    brand: "LuxuryBags",
    sizes: [],
    colors: ["Black", "Brown", "Tan"],
    featured: true,
    tags: ["accessories", "luxury", "leather"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Kids Educational Toy Set",
    title: "Kids Educational Toy Set",
    price: 49.99,
    description: "Fun and educational toy set designed to promote learning and creativity in children aged 3-8.",
    category: "toys",
    image: "/placeholder.svg?height=300&width=300&text=Toys",
    images: ["/placeholder.svg?height=300&width=300&text=Toys", "/placeholder.svg?height=300&width=300&text=Toys-2"],
    rating: {
      rate: 4.8,
      count: 167,
    },
    stockQuantity: 85,
    inStock: true,
    brand: "LearnPlay",
    sizes: [],
    colors: ["Multicolor"],
    featured: false,
    tags: ["toys", "educational", "kids"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Sample categories
export const sampleCategories = [
  {
    id: 1,
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "/placeholder.svg?height=200&width=300&text=Electronics",
    productCount: 25,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Men's Clothing",
    slug: "mens-clothing",
    description: "Stylish clothing for men",
    image: "/placeholder.svg?height=200&width=300&text=Men's+Clothing",
    productCount: 18,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Women's Clothing",
    slug: "womens-clothing",
    description: "Fashion-forward clothing for women",
    image: "/placeholder.svg?height=200&width=300&text=Women's+Clothing",
    productCount: 32,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Toys",
    slug: "toys",
    description: "Fun and educational toys for all ages",
    image: "/placeholder.svg?height=200&width=300&text=Toys",
    productCount: 15,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Sample users
export const sampleUsers = [
  {
    id: 1,
    email: "john.doe@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    password: "password456",
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1987654321",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Sample orders
export const sampleOrders = [
  {
    id: 1,
    userId: 1,
    items: [
      { productId: 1, quantity: 1, price: 299.99 },
      { productId: 2, quantity: 2, price: 29.99 },
    ],
    total: 359.97,
    status: "delivered",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Sample reviews
export const sampleReviews = [
  {
    id: 1,
    productId: 1,
    userId: 1,
    rating: 5,
    title: "Excellent headphones!",
    comment: "Amazing sound quality and comfortable to wear for long periods.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    productId: 3,
    userId: 2,
    rating: 4,
    title: "Beautiful dress",
    comment: "Love the fabric and fit. Perfect for special occasions.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Sample wishlist items
export const sampleWishlist = [
  {
    id: 1,
    userId: 1,
    productId: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    userId: 1,
    productId: 5,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Sample cart items
export const sampleCart = [
  {
    id: 1,
    userId: 1,
    productId: 2,
    quantity: 2,
    size: "M",
    color: "Navy",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    productId: 4,
    quantity: 1,
    size: "M",
    color: "Black",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
