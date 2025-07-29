import { useState } from "react"
import "./NewsletterSignup.css"

const ComingSoonPage = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail("")
    }, 1500)
  }

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
            We are working hard to bring you an incredible shopping experience. 
          </p>
        </div>

        {/* Email subscription form */}
        <div className="subscription-section">
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="subscription-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="email-input"
                  required
                />
                <button type="submit" className={`subscribe-btn ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                  {isLoading ? "Subscribing..." : "Notify Me"}
                </button>
              </div>
            </form>
          ) : (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Thank you for subscribing!</h3>
              <p>We will notify you as soon as we launch.</p>
            </div>
          )}
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
      </div>
    </div>
  )
}

export default ComingSoonPage
