// to do tomorrow 25/03/25

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login, clearError } from "../store/authSlice"
import './Login.css' 
import './ForgotPassword.css'

const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggingIn, error, isAuthenticated } = 
    useSelector((state) => state.auth)


    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    })

    useEffect(() => {
        dispatch(clearError())
    }, [dispatch])

    useEffect(() => {
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
        try{
            await dispatch(login(formData)).unwrap()
        } catch (err) {
            console.error("Login failed", err)
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
                    disabled={isLoggingIn}
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
                    disabled={isLoggingIn}
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
                    disabled={isLoggingIn}
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
                <button type="submit" className="login-submit" 
                disabled={isLoggingIn}>
                  {isLoggingIn ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
            <div className="register-link">
              <Link to="/register" className="register-link-text">
                Don't have an account? Sign up Today!
              </Link>
            </div>
          </div>
        </div>
      )
    }
    
export default LoginPage
    
    