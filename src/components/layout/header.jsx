"use client";

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, Search, ShoppingCart, Heart, User} from 'lucide-react';
import { selectCartTotalQuantity, selectCartIsOpen, toggleCart } from "../../store/cartSlice";
import { selectWishlistTotalItems } from "../../store/wishlistSlice";
import { selectIsAuthenticated, selectUser, logout} from "../../store/authSlice";
import { Dialog, DialogPanel } from '@headlessui/react';
import './Header.css';


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartQuantity = useSelector(selectCartTotalQuantity);
    const wishlistCount = useSelector(selectWishlistTotalItems);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const isCartOpen = useSelector(selectCartIsOpen);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("userToken")
        localStorage.removeItem("userData")
        navigate('/');
        setIsMobileMenuOpen(false)
    }

    const handleCartToggle = () => {
        dispatch(toggleCart());
        
    } 

    return (
        <header className="header">
            <nav className="header-nav">
                <div className="head-logo-container">
                    <Link to="/" className="header-logo">
                    STYLE-SHEET
                    </Link>
                </div>
                {/* Mobile menu button */}
                <div className="mobile-menu-button-container">
                    <button 
                    className="mobile-menu-button" 
                    onClick={() => setIsMobileMenuOpen (!isMobileMenuOpen)}
                    aria-label="Toggle Menu">
                        {isMobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon"/>}
                    </button>
                </div>
                {/*Desktop Navigation*/}
                <div className="header-links">
                    <Link to="/men" className="header-link">
                    Mens
                    </Link>
                    <Link to="/women" className="header-link">
                    Womens
                    </Link>
                    <Link to="/kids" className="header-link">
                    Kids
                    </Link>
                </div>
                {/*Desktop Search*/}
                <form className="header-search" onSubmit={handleSearch}>
                    <input
                    type="text"
                    placeholder="Search for your style..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="header-search-input"
                    />
                    <button type="submit" className="header-search-button">
                        <Search size={16}/>
                    </button>
                </form>
                {/*Desktop Icons*/}
                <div className="header-icons">
                    <button className="header-icon-button" 
                    onClick={() => navigate('/wishlist')}>
                        <Heart className="header-icon" />
                        {wishlistCount > 0 && <span className="icon-count">
                            {wishlistCount}</span>}
                    </button>
                    <button className="header-icon-button" 
                    onClick={handleCartToggle}>
                        <ShoppingCart className="header-icon" /> 
                        {cartQuantity > 0 && <span className="icon-count">
                            {cartQuantity}</span>}
                    </button>
                    {isAuthenticated ? (
                        <button className="header-icon-button" 
                        onClick={() => navigate("/profile")}>
                            <User className="header-icon" />  
                        </button>
                    ) : (
                        <Link to="/login" className="header-link">
                            Login
                        </Link>
                    )}    
                </div>
                {/*Mobile Menu Dialog*/}
                <Dialog open={isMobileMenuOpen} onClose={setIsMobileMenuOpen}>
                    <div className="mobile-menu-backdrop" aria-hidden="true">
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <DialogPanel className="mobile-menu-panel">
                                <div className="mobile-menu-header">
                                    <Link to="/" className="header-logo">
                                        STYLE-SHEET
                                    </Link>
                                    <button className="mobile-menu-close-button" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Close Menu">
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="mobile-menu-content">
                                    <div className="mobile-menu-links">
                                        <Link to="/men" className="mobile-menu-link"
                                        onClick={() => setIsMobileMenuOpen(false)}>
                                            Mens
                                        </Link>
                                        <Link to="/women" className="mobile-menu-link"
                                        onClick={() => setIsMobileMenuOpen(false)}>
                                            Women
                                        </Link>
                                        <Link to="/kids" className="mobile-menu-link"
                                        onClick={() => setIsMobileMenuOpen(false)}>
                                            Kids
                                        </Link>
                                        <Link to="/wishlist" className="mobile-menu-link"
                                        onClick={() => setIsMobileMenuOpen(false)}>
                                            Wishlist ({wishlistCount})
                                        </Link>
                                        {isAuthenticated ? (
                                            <>
                                            <Link to="/profile" 
                                            className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>
                                                Profile
                                            </Link>
                                            <button className="mobile-menu-link"
                                            onClick={handleLogout}>
                                                Logout
                                            </button>
                                            </>
                                        ): (
                                            <>
                                            <Link to="/login" className="mobile-menu-link" 
                                            onClick={() => setIsMobileMenuOpen(false)}>
                                                Login
                                            </Link>
                                            <Link to="/register" className="mobile-menu-link"
                                            onClick={() => setIsMobileMenuOpen(false)}>
                                                Register
                                            </Link>
                                            </>
                                        )}
                                    </div>
                                    {/*Mobile Search*/}
                                    <form className="mobile-search" 
                                    onSubmit={handleSearch}>
                                        <input
                                        type="text"
                                        placeholder="Search for your Style..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="mobile-search-input"
                                        />
                                        <button type="submit" className="mobile-search-button">
                                            <Search size={16} />
                                        </button>
                                    </form>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            </nav>
        </header>
    )
}

export default Header;