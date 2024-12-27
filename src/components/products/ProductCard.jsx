import ProductCard from './ProductCard';

const products = [
  {
    id: '1',
    name: 'Cashmere Blend Sweater',
    price: 49.90,
    image: '/path/to/image1.jpg',
    category: 'Ladies Clothing',
  },
  {
    id: '2',
    name: 'Ultra Light Down Jacket',
    price: 69.90,
    image: '/path/to/image2.jpg',
    category: 'Mens Clothing',
  },
];

function App() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default App;
