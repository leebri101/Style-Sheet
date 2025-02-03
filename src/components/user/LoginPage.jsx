import { useState } from "react"
import { Link } from "react-router-dom"
import './Login.css' 

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
                    <form>
                        
                    </form>
                </div>
            </div>
        </div>
    )
    
}