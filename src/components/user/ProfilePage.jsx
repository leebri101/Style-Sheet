
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeClosed, CircleAlert, AlertTriangle } from "lucide-react";
import { Dialog, DialogPanel, DialogTitle, Description} from "@headlessui/react";
import "./ProfilePage.css";

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

    //UI states for password visibility
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState(""); 
    
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
        setPasswordForm((prev) => ({
            ...prev,
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
    const handleDeleteAccount = async () => {
        try {
            if(!passwordConfirmation){
                alert("Please enter your password to delete your account.")
                return
            }console.log("Account Deletion Requested with password verification")
            alert("Account Successfully Deleted")
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
                        <div className="field-group">
                            <label htmlFor="emailPassword">Confirm Password</label>
                            <div className="password-input-container">
                                <input
                                type={showPassword.current ? "text" : "password"}
                                id="emailPassword"
                                name="password"
                                value={emailForm.password}
                                onChange={handleEmailChange}
                                required
                                />
                                <button
                                type="button"
                                className="password-toggle"
                                onClick={() => 
                                    setShowPassword((prev) => ({
                                    ...prev,
                                    current: !prev.current,
                                }))}
                                >
                                    {showPassword.current ? <EyeClosed size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="submit-button">
                            Change Email
                        </button>
                    </form>
                </section>
                {/*Password change form & Input*/}
                <section className="profile-section">
                    <h2 className="section-title">Change Password</h2>
                    <form onSubmit={handlePasswordSubmit} className="password-form">
                        <div className="field-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <div className="password-input-container">
                                <input 
                                type={showPassword.current ? "text" : "password"}
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordForm.currentPassword}
                                onChange={handlePasswordChange}
                                required
                                />
                                <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        current: !prev.current,
                                    }))
                                }
                                >
                                    {showPassword.current ? <EyeClosed size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="field-group">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="password-input-container">
                                <input
                                type={showPassword.new ? "text" : "password"}
                                id="newPassword"
                                name="newPassword"
                                value={passwordForm.newPassword}
                                onChange={handlePasswordChange}
                                required
                                />
                                <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        new: !prev.new,
                                    }))
                                }
                                >
                                    {showPassword.new ? <EyeClosed size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="field-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="password-input-container">
                                <input
                                type={showPassword.confirm ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={passwordForm.confirmPassword}
                                onChange={handlePasswordChange}
                                required
                                />
                                <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((prev) => ({
                                        ...prev,
                                        confirm: !prev.confirm,
                                    }))
                                }
                                >
                                    {showPassword.confirm ? <EyeClosed size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="submit-button">
                            Change Password
                        </button>
                    </form>
                </section>
                {/*Order History*/}
                <section className="profile-section">
                    <h2 className="section-title">Order History</h2>
                    <div className="order-history">
                        {orderHistory.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <span className="order-id">{order.id}</span>
                                        <span className="order-date">{order.date}</span>
                                    </div>
                                    <span className={`order-status status-${order.status.
                                    toLowerCase()}`}>{order.status}</span>
                                </div>
                                <div className="order-items">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <div className="item-details">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-quantity">Quantity: {item.quantity}</span>
                                            </div>
                                            <span className="item-price">£{item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-footer">
                                    <span className="order-total">Total: £{order.total.toFixed(2)}</span>
                                    <button className="view-details-button">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                {/*Delete Account section*/}
                <section className="profile-section">
                    <h2 className="section-title">Delete Account</h2>
                    <div className="delete-account">
                        <div className="warning-message">
                            <CircleAlert className="warning-icon"/>
                            <p>WARNING: Are you sure you want to delete your account? All your data will be 
                                permanently deleted.
                            </p>
                        </div>
                        <button className="delete-button" onClick={() => setIsDeleteModalOpen(true)}>
                            Delete Account
                        </button>
                    </div>
                </section>
                {/*Delete Account Modal*/}
                <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} 
                className="modal-overlay">
                    <div className="modal-container">
                        <DialogPanel>
                            <DialogTitle className="modal-title">Delete Account Confirmation</DialogTitle>
                            <Description className="modal-description">
                                <AlertTriangle>
                                    This action cannot be undone. Please enter your password to confirm.
                                </AlertTriangle>
                            </Description>
                            <input
                            type="password"
                            className="delete-confirmation-input"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Enter your password"
                            />
                            <div className="modal-actions">
                                <button className="cancel-button" onClick={() => 
                                    setIsDeleteModalOpen(false)}>
                                    Cancel
                                </button>
                                <button className="confirm-delete-button" 
                                onClick={handleDeleteAccount}
                                disabled={!passwordConfirmation}>
                                    Confirm
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default ProfilePage;