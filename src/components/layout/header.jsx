import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, Heart, Globe } from 'lucide-react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const cartItemsCount = useSelector((state) => 
        state.cart.items.reduce((total, item) => total + item.quantity, 0));
    const wishlistItemsCount = useSelector((state) => state.wishlist.items.length);

    const navigation = [
        { name: 'WOMEN', href: '/women' },
        { name: 'MEN', href: '/mens' },
        { name: 'KIDS', href: '/kids' },
        { name: 'LOGO', href: '/logo' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
            setMobileMenuOpen(false);
        }
    };

    return (
        <header className="header">
            <nav className="header-nav" aria-label="Global">
                <div className="header-logo-container">
                    <Link to="/" className="header-logo">
                        <span className="sr-only">Style</span>
                        <div>-Sheet</div>
                    </Link>
                </div>
                <div className="mobile-menu-button-container">
                    <button type="button" className="mobile-menu-button" onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open Main Menu</span>
                        <Menu className="menu-icon" aria-hidden="true" />
                    </button>
                </div>
                <div className="header-links">
                    {navigation.map((item) => (
                        <Link key={item.name} to={item.href} className="header-link">
                            {item.name}
                        </Link>
                    ))}
                    <Link to="/login" className="header-link">Login</Link>
                    <Link to="/register" className="header-link">Register</Link>
                </div>
                <form onSubmit={handleSearch} className="header-search">
                    <input
                        type="text"
                        placeholder="Search By Keyword"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="header-search-input"
                    />
                    <button type="submit" className="header-search-button">
                        <Search className="header-icon" />
                        <span className="sr-only">Search</span>
                    </button>
                </form>
                <div className="header-icons">
                    <button className="header-icon-button">
                        <Globe className="header-icon" />
                    </button>
                    <Link to="/wishlist" className="header-icon-button">
                        <Heart className="header-icon" />
                        {wishlistItemsCount > 0 && <span className="icon-count">{wishlistItemsCount}</span>}
                    </Link>
                    <Link to="/cart" className="header-icon-button-cart-icon-container">
                        <ShoppingCart className="header-icon" />
                        {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
                    </Link>
                </div>
            </nav>
            <Dialog as="div" className="mobile-menu" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                <div className="mobile-menu-backdrop" />
                <DialogPanel className="mobile-menu-panel">
                    <div className="mobile-menu-header">
                        <Link to="/" className="header-logo">
                            <span className="sr-only">STYLE-</span>
                            <div>SHEET</div>
                        </Link>
                        <button type="button" className="mobile-menu-close-button" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Close Menu</span>
                            <Menu className="menu-icon" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mobile-menu-content">
                        <div className="mobile-menu-links">
                            {navigation.map((item) => (
                                <Link key={item.name} to={item.href} className="mobile-menu-link">
                                    {item.name}
                                </Link>
                            ))}
                            <Link to="/login" className="mobile-menu-link">
                            Login
                            </Link>
                            <Link to="/register" className="mobile-menu-link">
                            Register
                            </Link>
                            <Link to="/wishlist" className="mobile-menu-link">
                            Wishlist ({wishlistItemsCount})
                            </Link>
                            <Link to="/cart" className="mobile-menu-link">
                            Cart ({cartItemsCount})
                            </Link>
                        </div>
                        <form onSubmit={handleSearch} className="mobile-search">
                            <input
                                type="text"
                                placeholder="Search By Keyword"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="mobile-search-input"
                            />
                            <button type="submit" className="mobile-search-button">
                                <Search className="header-icon" />
                                <span className="sr-only">Search</span>
                            </button>
                        </form>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;