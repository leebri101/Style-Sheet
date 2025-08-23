import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, Search, ShoppingCart, Heart, User } from "lucide-react";
import { selectCartItemsCount, toggleCart } from "../../store/cartSlice";
import { selectWishlistTotalItems } from "../../store/wishlistSlice";
import { selectIsAuthenticated, selectUser, logout } from "../../store/authSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartQuantity = useSelector(selectCartItemsCount);
  const wishlistCount = useSelector(selectWishlistTotalItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleCartToggle = () => {
    dispatch(toggleCart());
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

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
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Toggle Menu"
          >
            <Menu className="menu-icon" />
          </button>
        </div>
        
        {/* Desktop Navigation */}
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
          {/* Admin Product Management Link */}
          {isAuthenticated && user && user.role === "admin" && (
            <Link to="/admin/products" className="header-link admin-link">
              Manage Products
            </Link>
          )}
        </div>
        
        {/* Desktop Search */}
        <form className="header-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for your style..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="header-search-input"
          />
          <button type="submit" className="header-search-button">
            <Search size={16} />
          </button>
        </form>
        
        {/* Desktop Icons */}
        <div className="header-icons">
          <button className="header-icon-button" onClick={() => navigate("/wishlist")}>
            <Heart className="header-icon" />
            {wishlistCount > 0 && <span className="icon-count">{wishlistCount}</span>}
          </button>
          
          <button className="header-icon-button" onClick={() => navigate("/cart")}>
            <ShoppingCart className="header-icon" />
            {cartQuantity > 0 && <span className="icon-count">{cartQuantity}</span>}
          </button>
          
          {isAuthenticated ? (
            <button className="header-icon-button" onClick={() => navigate("/profile")}>
              <User className="header-icon" />
            </button>
          ) : (
            <Link to="/login" className="header-link">
              Login
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Dialog */}
        <Dialog 
          open={isMobileMenuOpen} 
          onClose={handleMobileMenuClose} 
          className="relative z-50"
        >
          <div className="mobile-menu-backdrop" aria-hidden="true" />
          
          <div className="mobile-menu-dialog">
            <DialogPanel className="mobile-menu-panel">
              <div className="mobile-menu-header">
                <Link 
                  to="/" 
                  className="header-logo" 
                  onClick={handleLinkClick}
                >
                  STYLE-SHEET
                </Link>
                <button
                  className="mobile-menu-close-button"
                  onClick={handleMobileMenuClose}
                  aria-label="Close Menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="mobile-menu-content">
                <div className="mobile-menu-links">
                  <Link 
                    to="/men" 
                    className="mobile-menu-link" 
                    onClick={handleLinkClick}
                  >
                    Mens
                  </Link>
                  <Link 
                    to="/women" 
                    className="mobile-menu-link" 
                    onClick={handleLinkClick}
                  >
                    Womens
                  </Link>
                  <Link 
                    to="/kids" 
                    className="mobile-menu-link" 
                    onClick={handleLinkClick}
                  >
                    Kids
                  </Link>
                  
                  {/* Cart Link in Mobile Menu */}
                  <Link 
                    to="/cart" 
                    className="mobile-menu-link" 
                    onClick={handleLinkClick}
                  >
                    Cart ({cartQuantity})
                  </Link>
                  
                  {/* Admin Product Management Link in Mobile Menu */}
                  {isAuthenticated && user && user.role === "admin" && (
                    <Link
                      to="/admin/products"
                      className="mobile-menu-link admin-link"
                      onClick={handleLinkClick}
                    >
                      Manage Products
                    </Link>
                  )}
                  
                  <Link 
                    to="/wishlist" 
                    className="mobile-menu-link" 
                    onClick={handleLinkClick}
                  >
                    Wishlist ({wishlistCount})
                  </Link>
                  
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/profile" 
                        className="mobile-menu-link" 
                        onClick={handleLinkClick}
                      >
                        Profile
                      </Link>
                      <button 
                        className="mobile-menu-link" 
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="mobile-menu-link" 
                        onClick={handleLinkClick}
                      >
                        Login
                      </Link>
                      <Link 
                        to="/register" 
                        className="mobile-menu-link" 
                        onClick={handleLinkClick}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
                
                {/* Mobile Search */}
                <form className="mobile-search" onSubmit={handleSearch}>
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
        </Dialog>
      </nav>
    </header>
  );
};

export default Header;