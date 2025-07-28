import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout, updateUserProfile} from "../../store/authSlice";
import "./ProfilePage.css";

//states for email and password forms
const ProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(formData))
    setIsEditing(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="profile-avatar">
              <div className="avatar-placeholder">{user.name?.charAt(0).toUpperCase()}</div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows="3" />
                </div>

                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-details">
                <div className="detail-item">
                  <label>Name:</label>
                  <span>{user.name}</span>
                </div>
                <div className="detail-item">
                  <label>Email:</label>
                  <span>{user.email}</span>
                </div>
                <div className="detail-item">
                  <label>Phone:</label>
                  <span>{user.phone || "Not provided"}</span>
                </div>
                <div className="detail-item">
                  <label>Address:</label>
                  <span>{user.address || "Not provided"}</span>
                </div>
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="profile-sidebar">
            <div className="sidebar-section">
              <h3>Account Settings</h3>
              <ul>
                <li>
                  <a href="#orders">Order History</a>
                </li>
                <li>
                  <a href="#addresses">Saved Addresses</a>
                </li>
                <li>
                  <a href="#payment">Payment Methods</a>
                </li>
                <li>
                  <a href="#preferences">Preferences</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
