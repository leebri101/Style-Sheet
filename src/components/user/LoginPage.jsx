import { useState } from "react"
import { Link } from "react-router-dom"
import './Login.css' 
import './ForgotPassword.css'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Login in Submitted", formData)
    }

    return (
        <div className="login-page">
            <div className="login-form-container">
                <div>
                    <h2 className="login-title">
                        Login in to your account
                    </h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true"/>
                        <div className="login-inputs">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email-Address:
                                </label>
                                <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="login-input"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password:
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
                                />
                            </div>
                            <div className="login-options">
                                <div className="remember-me" name="remember-me remember-me-checkbox" type="check-box">
                                    <label htmlFor="remember-me" className="remember-me label"/>
                                    Remember Me
                                </div>
                                <div className="forgot-password">
                                    <Link to="/forgot-password" className="forgot-password-link">
                                    Forgot Your Password? 
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="login-submit">
                                    Log-in
                                </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <Link to="/register" className="register-link-text">
                        Don`t have an account Register with us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default LoginPage