// Simulate payment processing 
export const processPayment = async (paymentDetails) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { paymentMethod, amount, cardDetails, billingAddress} = paymentData

    // simulate payment outcome
    const random = Math.random();

    if(random < 0.05) {
        // 5% chance of payment failure
        throw new Error("Payment has been declined. Please check your card details ans try again.")
    } else if (random < 0.1){
        // 5% chance of insufficient funds
        throw new Error("Insufficient funds. Please use a different payment method.")
    }

    // Generation of transaction ID
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9 )}`
    
    return {
        success: true,
        transactionId,
        amount, 
        paymentMethod,
        timestamp: new Date().toISOString(),
        status: "completed",
        message: "Payment Approved",
    };
}

// Validation of card details
export const validateCardDetails = (cardDetails) => {
    const errors = {}
    
    // Validate card number (basic Luhn algorithm)
    const cardNumber = cardDetails.cardNumber.replace(/\s/g, "")
    if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
        errors.cardNumber = "Please enter a valid card number"
    }

    // Validation of expiry date
    const [month, year] = cardDetails.expiryDate.split("/")
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100 // Get last two digits of the year
    const currentMonth = currentDate.getMonth() + 1 // Months are 0-indexed in JS

    if (!month || !year || month <1 || month >12) {
        errors.expiryDate = "Please enter a valid expiry date (MM/YY)"
    } else if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
    ) {
        errors.expiryDate = "Your card has expired, please use a different card."
    }

    // Validation of CVV
    if (!cardDetails.cvv || cardDetails.cvv.length < 3 || cardDetails.cvv.length > 4) {
        errors.cvv = "Please enter a valid CVV"
    }

    // Validation of cardholder name
    if (!cardDetails.cardholderName || cardDetails.cardholderName.trim().length <2){
        errors.cardholderName = "Please enter a valid cardholder name"
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

export const getSupportedPaymentMethods = () => {
    return [
        {
            id:"debit_card",
            name: "Debit Card",
            icon: "💳",
            description: "Visa | MAsterCard | American Express",
        },
        {
            id: "credit_card",
            name: "Credit Card",
            icon: "💳",
            description: "Visa | MasterCard | American Express",
        },
    ]
}