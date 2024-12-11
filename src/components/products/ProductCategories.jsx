import { Products } from './Products'; // Assuming products data is in products.js
import CategoryProductList from './CategoryProductList';

const ProductCategories = () => {
  return (
    <div>
      <CategoryProductList products={Products.mens} title="Men" />
      <CategoryProductList products={Products.women} title="Women" />
      <CategoryProductList products={Products.kids} title="Kids" />
    </div>
  );
};

export default ProductCategories;