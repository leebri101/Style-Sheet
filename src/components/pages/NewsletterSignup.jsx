import "./NewsletterSignup.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';

const ComingSoonPage = () => {
   return (
    <div className="coming-soon-container">
      {/* Animated background particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="coming-soon-content">
        {/* Main heading section */}
        <div className="hero-section">
          <h1 className="coming-soon-title">Coming Soon</h1>
          <h2 className="coming-soon-subtitle">Something Amazing is on the Way</h2>
          <p className="coming-soon-description">
            We are working hard to bring you an incredible shopping experience. Get notified when we launch and be the
            first to explore our amazing collection.
          </p>
        </div>

        {/* Features preview */}
        <div className="features-section">
          <h3 className="features-title">What to Expect</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🛍️</div>
              <h4>Premium Products</h4>
              <p>Curated collection of high-quality items</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h4>Fast Delivery</h4>
              <p>Quick and reliable shipping worldwide</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h4>Exclusive Deals</h4>
              <p>Special offers for early subscribers</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h4>Secure Shopping</h4>
              <p>Safe and protected transactions</p>
            </div>
          </div>
        </div>

        {/* Social media links */}
        <div className="social-section">
          <p className="social-text">Follow us for updates</p>
          <div className="social-links">
            <div className="footer-social max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} size="xl" /> 
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faXTwitter} size="xl"/>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} size="xl"/>
                </a>
                <div className="other-container">
                  <a href="/about-us" className="text-base text-gray-500 hover:text-gray-900">About Us</a> ||
                  <a href="/returns" className="text-base text-gray-500 hover:text-gray-900">Returns</a> 
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonPage
