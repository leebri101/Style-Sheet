import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logout } from "../../store/authSlice.js";
import "./Logout.css";

const LogoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // Perform logout
    dispatch(logout())

    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      navigate("/")
    }, 2000)

    return () => clearTimeout(timer)
  }, [dispatch, navigate])

  return (
    <div className="logout-page">
      <div className="logout-container">
        <div className="logout-content">
          <h1>Logging Out...</h1>
          <p>See you next time !</p>
          <div className="logout-spinner">
            <div className="spinner"></div>
          </div>
          <p>Redirecting to the home page.</p>
        </div>
      </div>
    </div>
  )
}

export default LogoutPage
