import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword, clearAuthState, selectIsLoading, selectPasswordResetSuccess, selectAuthError} from '../../store/userSlice';
import { Eye, EyeOff } from 'lucide-react';
import "ResetPasswordPage.css"; 

const ResetPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLoading = useSelector(selectIsLoading);
    const passwordResetSuccess = useSelector(selectPasswordResetSuccess);
    const error = useSelector(selectAuthError);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    })
    const [validationError, setValidationError] = useState("")

    const token = new URLSearchParams(location.search).get("token");

    useEffect(() => {
        return () => {
            dispatch(clearAuthState())
        }
    }, [dispatch])

    useEffect(() => {
        // Redirection to login page after successful password reset
        if (passwordResetSuccess) {
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    }, [passwordResetSuccess, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setValidationError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // validation for matching passwords
        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match");
            return;
        }

        // validation for password strength 
        if (formData.newPassword.length < 8){
            setValidationError("Password must be at least 8 characters long");
            return;
        }

        dispatch(resetPassword({ token, newPassword: formData.newPassword }));
    }

    return (
        <div className="reset-password-page">
            <div className="reset-password-container">
                <h2 className="reset-password-title">Reset Your Password</h2>

                {passwordResetSuccess ? (
                    <div className="success-message">
                        <p>Your password has been successfully reset!</p>
                        <p>Redirecting to the Login Page</p>
                    </div>
                ):(
                <form onSubmit={handleSubmit} className="reset-password-form">
                    {!token && (
                        <div className="error-message">
                            Invalid or missing reset token. Please request a new password reset link.
                        </div>
                    )}
                    {error && <div className="error">{error}</div>}
                    {validationError && <div className="error">{validationError}</div>}

                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword.password ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                disabled={isLoading || !token}
                                className="form-input"
                            />
                            <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((prev) => ({ ...prev, new: !prev.new }))}
                            disabled={isLoading || !token}>
                            {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={isLoading || !token}
                                className="form-input"
                            />
                            <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((prev) => ({ ...prev, confirm: !prev.confirm }))}
                            disabled={isLoading || !token}>
                            {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="submit-button" disabled={isLoading || !token}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                )}
            </div>
        </div>
    )

}

export default ResetPasswordPage;