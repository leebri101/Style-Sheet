
import { ProductCard } from './ProductCard';

const products = [
  {
    id: '1',
    name: 'Cashmere Blend Sweater',
    price: 49.9,
    image: '/placeholder.svg?height=400&width=400',
    category: "Women's Clothing",
  },
  {
    id: '2',
    name: 'Ultra Light Down Jacket',
    price: 69.9,
    image: '/placeholder.svg?height=400&width=400',
    category: "Men's Clothing",
  },
  {
    id: '3',
    name: 'Fleece Full-Zip Jacket',
    price: 29.9,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Kids',
  },
  {
    id: '4',
    name: 'Warm Tech Gloves',
    price: 14.9,
    image: '/placeholder.svg?height=400&width=400',
    category: 'Accessories',
  },
];

export default function Products() {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </>
  );
}
