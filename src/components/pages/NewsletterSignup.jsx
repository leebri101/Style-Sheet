import "./NewsletterSignup.css";

const ComingSoonPage = () => {
  return (
    <section className="coming-soon-section">
      <div className="coming-soon-container">
        {/* Main heading */}
        <h1 className="coming-soon-title">Coming Soon</h1>

        {/* Subtitle */}
        <p className="coming-soon-subtitle">Something amazing is on the way!</p>

        {/* Description */}
        <p className="coming-soon-description">
          We`re working hard to bring you the perfect Style. Be the first to know when we launch
        </p>

        {/* Features preview */}
        <div className="features-preview">
          <h3 className="features-title">What to expect:</h3>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🛍️</div>
              <h4>Premium Fashion</h4>
              <p>Curated collection of the latest trends</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h4>Fast Delivery</h4>
              <p>Quick and reliable shipping worldwide</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💎</div>
              <h4>Exclusive Deals</h4>
              <p>Special offers for early subscribers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComingSoonPage
