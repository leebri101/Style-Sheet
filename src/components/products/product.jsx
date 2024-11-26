
const products = {
    mens: [
        { id: 1, name: 'Plain Black T', price: '£20.00' },
        { id: 2, name: 'BLack Trousers', price: '£40.00' },
        { id: 3, name: 'Denim Jacket', price: '£60.00' },
        { id: 4, name: 'Trainers', price: '£80.00' },
    ],
    women: [
        { id: 1, name: 'Satin Dress', price: '£30.00' },
        { id: 2, name: 'Cashmere Skirt', price: '£25.00' },
        { id: 3, name: 'Cotton Blouse', price: '£35.00' },
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
                {products.women.map(product => (
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