// to do 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeClosed, CircleAlert } from "lucide-react";
import { Dialog } from "@headlessui/react";
import "./Profile.css";

//states for email and password forms
const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [emailForm, setEmailForm] = useState({
        currentEmail: "exampl@email.com",
        newEmail: "",
        password: "",
    });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(""); 
    
    const orderHistory = [
        {
            id: "ORD-20250115-0001",
            date: "15-01-2025",
            items:[
                {id: 1, name: "Unisex Bomber Jacket", quantity: 1,  price: 70,}
            ],
            total: 70.00,
            status: "Delivered",
        },
        {
            id: "ORD-20250227-0002",
            date: "27-02-2025",
            items:[
                {id: 1, name: "Men's Basic Tee", quantity: 2,  price: 15,},
                {id: 2, name: "Men's Hoodie", quantity: 1, price: 55,},
                ],
            total: 85.00,
            status: "En Route",
        },
    ]
    
    //handle email change
    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault();
    try{
        console.log("Email Change Requested:", emailForm)
        alert("Verification Email sent to " + emailForm.newEmail)
    } catch (error){
        console.error("Error Changing Email:", error)
        alert("Error Changing Email. Please try again.")
    }

    }

    //handle password change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        try {
            if(passwordForm.newPassword !== passwordForm.confirmPassword){
                alert("New password does not match")
                return
            }

            console.log("Password Change Requested:")
            alert("Password Successfully Updated")
            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            })
        } catch (error){
            console.error("Error Changing Password:", error)
            alert("Error Changing Password. Please try again.")
        }
    }
    const handleDeleteAccount = () => {
        try {
            if(deleteConfirmation !== "DELETE"){
                alert("Please type DELETE to confirm")
                return
            }console.log("Account Deletion Requested")
            alert("Account Deleted")
            navigate("/")
        } catch (error){
            console.error("Error Deleting Account:", error)
            alert("Error Deleting Account. Please try again.")
        }
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <h1 className="profile-title">Account Settings</h1>
                {/* Email Change Form */}
                <section className="profile-section">
                    <h2 className="section-title">Change Email Address</h2>
                    <form onSubmit={handleEmailSubmit} className="email-form">
                        <div className="field-group">
                            <label htmlFor="currentEmail">Current Email</label>
                            <input
                            type="email"
                            id="currentEmail"
                            name="currentEmail" 
                            value={emailForm.currentEmail}
                            disabled
                            className="input-disabled"/>
                        </div>
                        <div className="field-group">
                            <label htmlFor="newEmail">
                            <input
                            type="email"
                            id="newEmail"
                            name="newEmail"
                            value={emailForm.newEmail}
                            onChange={handleEmailChange}
                            required
                            />
                            </label>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ProfilePage;