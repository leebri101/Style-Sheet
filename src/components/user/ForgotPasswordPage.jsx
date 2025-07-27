// Import React hooks and routing components
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  // State management for form data and UI states
  const [email, setEmail] = useState("") // Stores user's email input
  const [isSubmitted, setIsSubmitted] = useState(false) // Tracks form submission success
  const [error, setError] = useState("") // Stores validation error messages
  const [isLoading, setIsLoading] = useState(false) // Tracks loading state during submission

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form behavior
    setError("") // Reset any previous errors

    // Validation checks
    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Simulate API call to backend
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true) // Show success state after "API call"
    }, 3000)
  }

  // Success state after form submission
  if (isSubmitted) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-container">
          <div className="forgot-password-header">
            <h1>Check Your Email</h1>
            <p>Please check your email for resetting your password</p>
          </div>
          <div className="forgot-password-form">
            <div className="success-message">
              Password reset instructions have been sent to {email}. Please check your inbox and follow the instructions
              to reset your password.
            </div>
            <div className="back-to-login">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main form render
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <h1>Forgot Password</h1>
          <p>Enter your email address to reset your password</p>
        </div>

        {/* Password reset form */}
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "error" : ""}
              placeholder="Enter your email address"
            />
            {/* Display validation errors if any */}
            {error && <div className="error-message">{error}</div>}
          </div>

          {/* Submit button with loading state */}
          <button type="submit" className="reset-btn" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Instructions"}
          </button>

          {/* Navigation back to login */}
          <div className="back-to-login">
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage