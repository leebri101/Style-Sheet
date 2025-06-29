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

    //Redux state
    const {items: cartItems, total: cartTotal} = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const {
        currentStep,
        shippingAddress,
        billingAddress,
        paymentMethod,
        cardDetails,
        isProcessing,
        error,
        completeOrder,
        paymentResult, 
    } = useSelector((state) => state.checkout)

    // Local state
    const [validationErrors,setValidationErrors] = useState({})
    const [paymentMethods] = useState(getSupportedPaymentMethods())
    
    useEffect(() => {
        if (cartItems.length === 0 && !completeOrder) {
            dispatch(clearCheckout())
        }
    }, [])

    // Calculation of totals 
    const subtotal = cartTotal
    const shipping = cartTotal > 50 ? 0 : 5.99
    const tax = cartTotal * 0.1
    const finalTotal = subtotal + shipping + tax 

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

    // Validation functionality 
    const validateCurrentStep = () => {
        const errors = {}

        switch (currentStep) {
            // Shipping
            case 1: 
                if (!shippingAddress.firstName) errors.firstName = "First name is required"
                if (!shippingAddress.lastName) errors.lastName = "Last name is required"
                if (!shippingAddress.email) errors.email = "Email is required" 
                if (!shippingAddress.address) errors.address = "Address is required"
                if (!shippingAddress.city) errors.city = "City is required"
                if (!shippingAddress.postalCode) errors.postalCode = "Post code is required"
                break

            // Payment
            case 2:
                if (paymentMethod === "debit_card" || paymentMethod === "credit_card"){
                    const cardValidation = validateCardDetails(cardDetails)
                    if (!cardValidation.isValid) {
                        Object.assign(errors, cardValidation.errors)
                    }
                }
                if (!billingAddress.sameAsShipping){
                    if (!billingAddress.firstName) errors.firstName = "First name is required"
                    if (!billingAddress.lastName) errors.lastName = "Last name is required"
                    if (!billingAddress.address) errors.address = "Address is required"
                    if (!billingAddress.city) errors.city = "City is required"
                    if (!billingAddress.postalCode) errors.postalCode = "Post code is required"
                }
                break
            }

            setValidationErrors(errors)
            return Object.keys(errors).length === 0
        }
        // Handling Form Submission
        const handleShippingSubmit = (e) => {
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
                cartItems,
                total: finalTotal,
            }
            try {
                await dispatch(processCheckout(checkoutData)).unwrap()
                dispatch(clearCart())
            } catch (error) {
                console.error("Checkout failed:", error)
            }
        }

        // Handling input changes
        const handleShippingChange = (field, value) => {
            dispatch(updateShippingAddress({ [field]: value }))
        }  

        const handleBillingChange = (field, value) => {
            dispatch(updateBillingAddress({ [field]: value }))
        }

        const handleCardChange = (field, value) => {
            // Format Card Number
            if (field === "cardNumber") {
                value = value
                .replace(/\D/g, "")
                .replace(/(\d{4})(?=\d)/g, "$1 ")
                .trim()
            }
            // Format Expiry Date
            if ()
        }
}

