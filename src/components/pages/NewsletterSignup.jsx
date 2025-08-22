// NewsletterSignup Component
import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="newsletter-signup">
        <div className="newsletter-container">
          <div className="newsletter-success">
            <CheckCircle className="success-icon" size={48} />
            <h2>Thank you for subscribing!</h2>
            <p>You'll receive the latest updates and exclusive offers.</p>
            <button 
              onClick={() => setIsSubscribed(false)}
              className="subscribe-again-btn"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-signup">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <Mail className="newsletter-icon" size={32} />
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-description">
            Get the latest news, exclusive offers, and style updates delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="email-input"
                required
              />
              <button 
                type="submit" 
                className="subscribe-btn"
                disabled={isLoading || !email}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            
            <p className="privacy-text">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;