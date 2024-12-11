

const CategoryProductList = ({ products, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProductList;