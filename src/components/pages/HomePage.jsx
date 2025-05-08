import ProductShowcase from "../../components/products/ProductShowcase";
import ProductGrid from "../../components/products/ProductGrid";
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import './Pages.css';

const products = [
    {
        id: 1,
        name: "Basic Tee",
        price: 35,
        imageUrl: "/images/basic-tee.jpg", 
    },
    {
        id: 2,
        name: "Wool Sweater",
        price: 89,
        imageUrl: "/images/wool-sweater.jpg", 
    },
    {
        id: 3,
        name: "Denim Jeans",
        price: 65,
        imageUrl: "/images/denim-jeans.jpg", 
    },
    {
        id: 4,
        name: "Cotton Shirt",
        price: 45,
        imageUrl: "/images/cotton-shirt.jpg", 
    },
];

const HomePage = () => {
    return (
        <div className="home-page">
            <Header />
            <main className="home-page-main">
                <ProductShowcase
                    title="Extra Warm Cashmere Blend Crew Neck T-Shirt"
                    price={15.00}
                    description="The perfect layering piece for colder days."
                    imageUrl="/images/cashmere-tee.jpg" 
                    isLimitedOffer={true}
                    offerEndDate="February 12th"
                />
                <ProductGrid products={products} />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;