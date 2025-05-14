// to also do 
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../user/ForgotPassword.css";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Password Request sent for:", email)
        setIsSubmitted(true);
    }
    return(
        <div className="forgot-password-page">
            <div className="forgot-password-container">
            <h2 className="forgot-password-title">Forgot Password</h2>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="forgot-password-form">
                        <p className="forgot-password-instruction">
                            Please enter your Email address to receive a password reset link.
                        </p>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className="form-input"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Submit
                        </button>
                    </form>
                    ) : (
                        <div className="success-message">
                            <p>If there is an existing account for {email}, 
                                you will receive your password reset link shortly.</p>
                        </div>
                    )}
                    <div className="back-to-login">
                        <Link to="/login" className="back-to-login-link">
                        Back to Login
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;