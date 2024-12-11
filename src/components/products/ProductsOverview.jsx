import ProductCategories from './ProductCategories';

const ProductsOverview = () => {
  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold">Our Products</h2>
      <p>Explore our wide range of products!</p>
      <ProductCategories />
    </div>
  );
};

export default ProductsOverview;