import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login, clearError, selectIsAuthenticated, selectIsLoading, selectAuthError } from "../../store/authSlice"
import "./Login.css"

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectAuthError)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    // Redirect if user is authenticated
    if (isAuthenticated) {
      navigate("/profile")
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await dispatch(login(formData)).unwrap()
      // Navigation will be handled by the useEffect above
    } catch (err) {
      // Error will be handled by Redux and displayed in the UI
      console.error("Login failed:", err)
    }
  }

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div>
          <h2 className="login-title">Sign in to your account</h2>
        </div>
        {error && <div className="login-error">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="login-inputs">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="login-input"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="login-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="login-options">
            <div className="remember-me">
              <input
                id="remember-me"
                name="remember"
                type="checkbox"
                className="remember-me-checkbox"
                checked={formData.remember}
                onChange={handleChange}
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="remember-me-label">
                Remember me
              </label>
            </div>

            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgotten your password?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="login-submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <div className="register-link">
          <Link to="../user/RegistrationPage.jsx" className="register-link-text">
            Don`t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
