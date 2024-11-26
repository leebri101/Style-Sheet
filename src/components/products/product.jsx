
const products = {
    mens: [
        { id: 1, name: 'Men T-Shirt', price: '£20.00' },
        { id: 2, name: 'Men Jeans', price: '£40.00' },
        { id: 3, name: 'Men Jacket', price: '£60.00' },
    ],
    womens: [
        { id: 1, name: 'Women Dress', price: '£30.00' },
        { id: 2, name: 'Women Skirt', price: '£25.00' },
        { id: 3, name: 'Women Blouse', price: '£35.00' },
    ],
    kids: [
        { id: 1, name: 'Kids T-Shirt', price: '£15.00' },
        { id: 2, name: 'Kids Shorts', price: '£20.00' },
        { id: 3, name: 'Kids Jacket', price: '£25.00' },
    ],
};

const Product = () => {
    return (
        <div>
            <h2>Men</h2>
            <ul>
                {products.mens.map(product => (
                    <li key={product.id}>{product.name} - {product.price}</li>
                ))}
            </ul>
            <h2>Women</h2>
            <ul>
                {products.womens.map(product => (
                    <li key={product.id}>{product.name} - {product.price}</li>
                ))}
            </ul>
            <h2>Kids</h2>
            <ul>
                {products.kids.map(product => (
                    <li key={product.id}>{product.name} - {product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Product;