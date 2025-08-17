"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'
import { loginUser, registerUser, selectAuthLoading, selectAuthError } from "../../store/authSlice"

const AuthPage = ({ mode = "login" }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      const result = await dispatch(
        registerUser({
          email: formData.email,
          password: formData.password,
          name: formData.name,
        }),
      )

      if (registerUser.fulfilled.match(result)) {
        navigate("/")
      }
    } else {
      const result = await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
        }),
      )

      if (loginUser.fulfilled.match(result)) {
        navigate("/")
      }
    }
  }

  return (
    <div className="form-container">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>

        {mode === "register" && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        {mode === "login" ? (
          <p>
            Don`t have an account? <a href="/register">Register here</a>
          </p>
        ) : (
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        )}
      </div>
    </div>
  )
}
AuthPage.propTypes = {
  mode: PropTypes.oneOf(['login', 'register'])
}

export default AuthPage
