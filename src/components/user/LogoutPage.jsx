import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutStart, logoutSuccess } from "../../store/authSlice.js";

const LogoutPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoggingOut = useSelector((state) => state.auth.isLoggingOut)
    
    const clearUserSession = useCallback(() => {
        // Clear user token from localStorage
        localStorage.removeItem("userToken");
        // Clearance of other data 
        localStorage.removeItem("userData");
        console.log("User Session cleared");
    }, []);

    useEffect(() =>{
        dispatch(logoutStart())
        clearUserSession()
        console.log("Logging Out....")

        const timer = setTimeout(() =>{
            dispatch(logoutSuccess())
            navigate("/")
        }, 2000)

        return () => clearTimeout(timer)
    }, [dispatch, navigate, clearUserSession])

    return(
        <div className="logout-page">
            <div className="logout-content">
                <h2 className="logout-title">{isLoggingOut ? "Logging Out..." : "You Have been Logged out"}</h2>
                <p className="logout-message">
                    {isLoggingOut 
                    ? "Please wait while we securely log you out." 
                    : "Redirecting to home-page."
                    }
                </p>
                {isLoggingOut && <div className="logout-spinner"></div>}
            </div>
        </div>
    )
}

export default LogoutPage