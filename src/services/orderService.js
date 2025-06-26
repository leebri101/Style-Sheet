// Creation of new order
export const createOrder = async (orderData) => {
    await new Promise((resolve ) => setTimeout(resolve,1000))

    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2,6).toUpperCase()}`

    const order = {
        id: orderId,
        ...orderData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    
    return order
}

// Update of order status
export const updateOrderStatus = async (orderId, status, paymentDetails = null  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const orderIndex = orders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) {
        throw new Error("Order not found");
    }

    orders[orderIndex] = {
        ...orders[orderIndex],
        status, 
        updatedAt: new Date().toISOString(),
        ...(paymentDetails && { paymentDetails })
    }

    localStorage.setItem("orders", JSON.stringify(orders));
    return orders[orderIndex];

}

// Get order By ID
export const getOrderById = async (orderId) => {

    await new Promise ((resolve) => setTimeout(resolve, 300))

    const orders = JSON.parse(localStorage.getItem("orders") || "[]")
    const order = orders.find((order) => order.id === orderId)

    if (!order) {
        throw new Error("Order not found");
    }
    return order;
}

// Get user orders
export const getUserOrders = async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    return orders.filter((order) => order.userId === userId);
}