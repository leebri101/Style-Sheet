"use-client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
    setCurrentStep,
    updateShippingAddress,
    updateBillingAddress,
    setPaymentMethod,
    updateCardDetails,
    processCheckout, 
    clearCheckout,
    clearError,
} from "../../store/checkoutSlice"
import{ clearCart } from "../../store/cartSlice"
import { validateCardDetails, getSupportedPaymentMethods } from "../../services/paymentService"
import{ ChevronLeft, ChevronRight, CreditCard, Truck, CheckCircle, Lock} from "lucide-react"
import "./CheckoutPage.css"


const CheckoutPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux state
  const { items: cartItems, total: cartTotal } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const {
    currentStep,
    shippingAddress,
    billingAddress,
    paymentMethod,
    cardDetails,
    isProcessing,
    error,
    completedOrder,
    paymentResult,
  } = useSelector((state) => state.checkout)

  // Local state
  const [validationErrors, setValidationErrors] = useState({})
  const [paymentMethods] = useState(getSupportedPaymentMethods())

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !completedOrder) {
      navigate("/cart")
    }
  }, [cartItems.length, completedOrder, navigate])

  // Clear checkout state on mount
  useEffect(() => {
    if (currentStep === 4 && !completedOrder) {
      dispatch(clearCheckout())
    }
  }, [])

  // Calculate totals
  const subtotal = cartTotal
  const shipping = cartTotal > 50 ? 0 : 5.99
  const tax = cartTotal * 0.2
  const finalTotal = subtotal + shipping + tax

  // Handle step navigation
  const goToStep = (step) => {
    if (step < currentStep || validateCurrentStep()) {
      dispatch(setCurrentStep(step))
      setValidationErrors({})
    }
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      dispatch(setCurrentStep(currentStep + 1))
      setValidationErrors({})
    }
  }

  const prevStep = () => {
    dispatch(setCurrentStep(currentStep - 1))
    setValidationErrors({})
  }

  // Validation functions
  const validateCurrentStep = () => {
    const errors = {}

    switch (currentStep) {
      case 1: // Shipping
        if (!shippingAddress.firstName) errors.firstName = "First name is required"
        if (!shippingAddress.lastName) errors.lastName = "Last name is required"
        if (!shippingAddress.email) errors.email = "Email is required"
        if (!shippingAddress.address) errors.address = "Address is required"
        if (!shippingAddress.city) errors.city = "City is required"
        if (!shippingAddress.postalCode) errors.postalCode = "Postal code is required"
        break

      case 2: // Payment
        if (paymentMethod === "credit_card" || paymentMethod === "debit_card") {
          const cardValidation = validateCardDetails(cardDetails)
          if (!cardValidation.isValid) {
            Object.assign(errors, cardValidation.errors)
          }
        }
        if (!billingAddress.sameAsShipping) {
          if (!billingAddress.firstName) errors.billingFirstName = "First name is required"
          if (!billingAddress.lastName) errors.billingLastName = "Last name is required"
          if (!billingAddress.address) errors.billingAddress = "Address is required"
          if (!billingAddress.city) errors.billingCity = "City is required"
          if (!billingAddress.postalCode) errors.billingPostalCode = "Postal code is required"
        }
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submissions
  const handleShippingSubmit = (e) => {
    e.preventDefault()
    nextStep()
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    nextStep()
  }

  const handleFinalSubmit = async () => {
    if (!user) {
      setValidationErrors({ general: "Please log in to complete your order" })
      return
    }

    const checkoutData = {
      userId: user.id,
      shippingAddress,
      billingAddress: billingAddress.sameAsShipping ? shippingAddress : billingAddress,
      paymentMethod,
      cardDetails: paymentMethod === "credit_card" || paymentMethod === "debit_card" ? cardDetails : null,
    }

    try {
      await dispatch(processCheckout(checkoutData)).unwrap()
      dispatch(clearCart())
    } catch (error) {
      console.error("Checkout failed:", error)
    }
  }

  // Handle input changes
  const handleShippingChange = (field, value) => {
    dispatch(updateShippingAddress({ [field]: value }))
  }

  const handleBillingChange = (field, value) => {
    dispatch(updateBillingAddress({ [field]: value }))
  }

  const handleCardChange = (field, value) => {
    // Format card number
    if (field === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    }
    // Format expiry date
    if (field === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
    }
    // Format CVV
    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4)
    }

    dispatch(updateCardDetails({ [field]: value }))
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="checkout-step">
            <div className="step-header">
              <Truck className="step-icon" />
              <h2>Shipping Information</h2>
            </div>
            <form onSubmit={handleShippingSubmit} className="checkout-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    value={shippingAddress.firstName}
                    onChange={(e) => handleShippingChange("firstName", e.target.value)}
                    className={validationErrors.firstName ? "error" : ""}
                  />
                  {validationErrors.firstName && <span className="error-text">{validationErrors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    value={shippingAddress.lastName}
                    onChange={(e) => handleShippingChange("lastName", e.target.value)}
                    className={validationErrors.lastName ? "error" : ""}
                  />
                  {validationErrors.lastName && <span className="error-text">{validationErrors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={shippingAddress.email}
                  onChange={(e) => handleShippingChange("email", e.target.value)}
                  className={validationErrors.email ? "error" : ""}
                />
                {validationErrors.email && <span className="error-text">{validationErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => handleShippingChange("phone", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  value={shippingAddress.address}
                  onChange={(e) => handleShippingChange("address", e.target.value)}
                  className={validationErrors.address ? "error" : ""}
                />
                {validationErrors.address && <span className="error-text">{validationErrors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleShippingChange("city", e.target.value)}
                    className={validationErrors.city ? "error" : ""}
                  />
                  {validationErrors.city && <span className="error-text">{validationErrors.city}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code *</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={(e) => handleShippingChange("postalCode", e.target.value)}
                    className={validationErrors.postalCode ? "error" : ""}
                  />
                  {validationErrors.postalCode && <span className="error-text">{validationErrors.postalCode}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  value={shippingAddress.country}
                  onChange={(e) => handleShippingChange("country", e.target.value)}
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Ireland">Ireland</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Spain">Spain</option>
                </select>
              </div>
            </form>
          </div>
        )

      case 2:
        return (
          <div className="checkout-step">
            <div className="step-header">
              <CreditCard className="step-icon" />
              <h2>Payment Information</h2>
            </div>

            <div className="payment-methods">
              <h3>Payment Method</h3>
              <div className="payment-options">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
                    />
                    <div className="payment-option-content">
                      <span className="payment-icon">{method.icon}</span>
                      <div>
                        <div className="payment-name">{method.name}</div>
                        <div className="payment-description">{method.description}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && (
              <form onSubmit={handlePaymentSubmit} className="checkout-form">
                <div className="form-group">
                  <label htmlFor="cardholderName">Cardholder Name *</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={cardDetails.cardholderName}
                    onChange={(e) => handleCardChange("cardholderName", e.target.value)}
                    className={validationErrors.cardholderName ? "error" : ""}
                  />
                  {validationErrors.cardholderName && (
                    <span className="error-text">{validationErrors.cardholderName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={(e) => handleCardChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={validationErrors.cardNumber ? "error" : ""}
                  />
                  {validationErrors.cardNumber && <span className="error-text">{validationErrors.cardNumber}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={(e) => handleCardChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      maxLength="5"
                      className={validationErrors.expiryDate ? "error" : ""}
                    />
                    {validationErrors.expiryDate && <span className="error-text">{validationErrors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      value={cardDetails.cvv}
                      onChange={(e) => handleCardChange("cvv", e.target.value)}
                      placeholder="123"
                      maxLength="4"
                      className={validationErrors.cvv ? "error" : ""}
                    />
                    {validationErrors.cvv && <span className="error-text">{validationErrors.cvv}</span>}
                  </div>
                </div>
              </form>
            )}

            <div className="billing-address">
              <h3>Billing Address</h3>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={billingAddress.sameAsShipping}
                  onChange={(e) => handleBillingChange("sameAsShipping", e.target.checked)}
                />
                Same as shipping address
              </label>

              {!billingAddress.sameAsShipping && (
                <div className="checkout-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="billingFirstName">First Name *</label>
                      <input
                        type="text"
                        id="billingFirstName"
                        value={billingAddress.firstName}
                        onChange={(e) => handleBillingChange("firstName", e.target.value)}
                        className={validationErrors.billingFirstName ? "error" : ""}
                      />
                      {validationErrors.billingFirstName && (
                        <span className="error-text">{validationErrors.billingFirstName}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="billingLastName">Last Name *</label>
                      <input
                        type="text"
                        id="billingLastName"
                        value={billingAddress.lastName}
                        onChange={(e) => handleBillingChange("lastName", e.target.value)}
                        className={validationErrors.billingLastName ? "error" : ""}
                      />
                      {validationErrors.billingLastName && (
                        <span className="error-text">{validationErrors.billingLastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingAddress">Address *</label>
                    <input
                      type="text"
                      id="billingAddress"
                      value={billingAddress.address}
                      onChange={(e) => handleBillingChange("address", e.target.value)}
                      className={validationErrors.billingAddress ? "error" : ""}
                    />
                    {validationErrors.billingAddress && (
                      <span className="error-text">{validationErrors.billingAddress}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="billingCity">City *</label>
                      <input
                        type="text"
                        id="billingCity"
                        value={billingAddress.city}
                        onChange={(e) => handleBillingChange("city", e.target.value)}
                        className={validationErrors.billingCity ? "error" : ""}
                      />
                      {validationErrors.billingCity && (
                        <span className="error-text">{validationErrors.billingCity}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="billingPostalCode">Postal Code *</label>
                      <input
                        type="text"
                        id="billingPostalCode"
                        value={billingAddress.postalCode}
                        onChange={(e) => handleBillingChange("postalCode", e.target.value)}
                        className={validationErrors.billingPostalCode ? "error" : ""}
                      />
                      {validationErrors.billingPostalCode && (
                        <span className="error-text">{validationErrors.billingPostalCode}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="checkout-step">
            <div className="step-header">
              <CheckCircle className="step-icon" />
              <h2>Review Your Order</h2>
            </div>

            <div className="order-review">
              <div className="review-section">
                <h3>Shipping Address</h3>
                <div className="address-display">
                  <p>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </p>
                  <p>{shippingAddress.address}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.postalCode}
                  </p>
                  <p>{shippingAddress.country}</p>
                  <p>{shippingAddress.email}</p>
                </div>
              </div>

              <div className="review-section">
                <h3>Payment Method</h3>
                <div className="payment-display">
                  <p>{paymentMethods.find((m) => m.id === paymentMethod)?.name}</p>
                  {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && (
                    <p>**** **** **** {cardDetails.cardNumber.slice(-4)}</p>
                  )}
                </div>
              </div>

              <div className="review-section">
                <h3>Order Items</h3>
                <div className="items-review">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="review-item">
                      <img src={item.imageUrl || "/placeholder.svg?height=60&width=60"} alt={item.name} />
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>Size: {item.size}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <div className="item-price">£{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="checkout-step">
            <div className="step-header success">
              <CheckCircle className="step-icon success" />
              <h2>Order Confirmed!</h2>
            </div>

            {completedOrder && paymentResult && (
              <div className="order-confirmation">
                <div className="confirmation-details">
                  <h3>Order #{completedOrder.id}</h3>
                  <p>Thank you for your order! We&lsquo;ve sent a confirmation email to {shippingAddress.email}</p>

                  <div className="confirmation-info">
                    <div className="info-item">
                      <strong>Payment Status:</strong> {paymentResult.status}
                    </div>
                    <div className="info-item">
                      <strong>Transaction ID:</strong> {paymentResult.transactionId}
                    </div>
                    <div className="info-item">
                      <strong>Total Paid:</strong> £{finalTotal.toFixed(2)}
                    </div>
                  </div>

                  <div className="next-steps">
                    <h4>What&lsquo;s Next?</h4>
                    <ul>
                      <li>You&lsquo;ll receive an email confirmation shortly</li>
                      <li>We&lsquo;ll send you tracking information once your order ships</li>
                      <li>Estimated delivery: 3-5 business days</li>
                    </ul>
                  </div>

                  <div className="confirmation-actions">
                    <button onClick={() => navigate("/")} className="btn-primary">
                      Continue Shopping
                    </button>
                    <button onClick={() => navigate("/profile")} className="btn-secondary">
                      View Order History
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (cartItems.length === 0 && !completedOrder) {
    return null
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-content">
          {/* Progress indicator */}
          <div className="checkout-progress">
            <div className="progress-steps">
              {[
                { step: 1, label: "Shipping", icon: Truck },
                { step: 2, label: "Payment", icon: CreditCard },
                { step: 3, label: "Review", icon: CheckCircle },
                { step: 4, label: "Confirmation", icon: CheckCircle },
              ].map(({ step, label, icon: Icon }) => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? "active" : ""} ${currentStep === step ? "current" : ""}`}
                  onClick={() => goToStep(step)}
                >
                  <div className="step-circle">
                    <Icon size={20} />
                  </div>
                  <span className="step-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="error-banner">
              <p>{error}</p>
              <button onClick={() => dispatch(clearError())}>×</button>
            </div>
          )}

          {/* Step content */}
          <div className="checkout-main">
            <div className="checkout-form-container">
              {renderStepContent()}

              {/* Navigation buttons */}
              {currentStep < 4 && (
                <div className="checkout-navigation">
                  {currentStep > 1 && (
                    <button onClick={prevStep} className="btn-secondary">
                      <ChevronLeft size={20} />
                      Back
                    </button>
                  )}

                  {currentStep < 3 && (
                    <button onClick={nextStep} className="btn-primary">
                      Continue
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button onClick={handleFinalSubmit} className="btn-primary" disabled={isProcessing}>
                      <Lock size={20} />
                      {isProcessing ? "Processing..." : `Pay £${finalTotal.toFixed(2)}`}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Order summary */}
            {currentStep < 4 && (
              <div className="checkout-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="summary-item">
                      <img src={item.imageUrl || "/placeholder.svg?height=50&width=50"} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="item-total">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax (VAT 20%)</span>
                    <span>£{tax.toFixed(2)}</span>
                  </div>
                  <div className="total-row final-total">
                    <span>Total</span>
                    <span>£{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
