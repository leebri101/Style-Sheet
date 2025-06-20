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
    const authError = useSelector(selectAuthError);

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    })
    const [validationErrors, setValidationErrors] = useState("")

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
            setValidationErrors("Passwords do not match");
            return;
        }

        // validation for password strength 
        if (formData.newPassword.length < 8){
            setValidationErrors("Password must be at least 8 characters long");
            return;
        }

        dispatch(resetPassword({ token, newPassword: formData.newPassword }));
    }


}