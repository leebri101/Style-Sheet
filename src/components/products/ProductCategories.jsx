import { products } from './ProductsOverview'; // Assuming products data is in products.js
import CategoryProductList from './CategoryProductList';

const ProductCategories = () => {
  return (
    <div>
      <CategoryProductList products={products.mens} title="Men" />
      <CategoryProductList products={products.women} title="Women" />
      <CategoryProductList products={products.kids} title="Kids" />
    </div>
  );
};

export default ProductCategories;