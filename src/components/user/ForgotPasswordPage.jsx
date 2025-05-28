// to also do 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset, clearAuthState, selectIsLoading, selectPasswordResetRequested, selectAuthError, } from "../../store/authSlice";
import "./ForgotPassword.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const passwordResetRequested = useSelector(selectPasswordResetRequested)
  const error = useSelector(selectAuthError)

  // Clear auth state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearAuthState())
    }
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(requestPasswordReset(email))
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>
        {!passwordResetRequested ? (
          <>
            <form onSubmit={handleSubmit} className="forgot-password-form">
              <p className="forgot-password-instruction">
                Enter your email address and we`ll send you a link to reset your password.
              </p>
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <p>If an account exists for {email}, you will receive a password reset link shortly.</p>
            <p>Please check your email inbox and follow the instructions to reset your password.</p>
          </div>
        )}
        <div className="back-to-login">
          <Link to="/LoginPage" className="back-to-login-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
