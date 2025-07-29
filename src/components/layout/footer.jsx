import './Footer.css'; 
import { useState } from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
    // You can add actual newsletter subscription logic here
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Company Info Column */}
          <div className="footer-column">
            <h3>Company</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/">About Us</Link>
              </li>
              <li className="footer-link">
                <Link to="/">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="footer-column">
            <h3>Customer Service</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/">Contact Us</Link>
              </li>
              <li className="footer-link">
                <Link to="/">Shipping Info</Link>
              </li>
              <li className="footer-link">
                <Link to="/">Returns</Link>
              </li>
              <li className="footer-link">
                <Link to="/">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-column">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <Link to="/">Privacy Policy</Link>
              </li>
              <li className="footer-link">
                <Link to="/">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="footer-column">
            <h3>Socials</h3>
            <ul className="footer-links">
              <li className="footer-link">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li className="footer-link">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
              </li>
              <li className="footer-link">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter">
          <h3 className="newsletter-heading">Stay Updated</h3>
          <p className="newsletter-description">
            Subscribe to our newsletter for the latest updates and exclusive offers.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          {/* Social Links */}
          <div className="social-links">
            <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>Facebook</span>
            </a>
            <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>Twitter</span>
            </a>
            <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>Instagram</span>
            </a>
            <a href="https://youtube.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <span>YouTube</span>
            </a>
          </div>

          {/* Copyright */}
          <p>&copy; {new Date().getFullYear()} STYLE-SHEET. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
