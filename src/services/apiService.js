import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem("userToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Log request details in development
    if (import.meta.env.NODE_ENV === "development") {
      console.log("🚀 API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        params: config.params,
      })
    }

    return config
  },
  (error) => {
    // Log request errors
    console.error("❌ Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor for handling responses and errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.NODE_ENV === "development") {
      console.log("✅ API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    return response
  },
    (error) => {
        // enhanced error handling
        const errorMessage = error.response?.data?.message || 
        error.message || "An error has occurred"
        const statusCode = error.response?.status

        // Log error details
        console.error("❌ API Error:", {
            message: errorMessage,
            status: statusCode,
            url: error.config?.url,
        })

        // Handling of specific error codes
        if (statusCode === 401) {
            // Handle unauthorized access
            localStorage.removeItem("userToken") // Clear token
            localStorage.removeItem("userData") // Clear user data
            window.location.href = "/login" // Redirect to login page
            console.warn("Unauthorized access - redirecting to login")
        } else if (statusCode === 403) {
            // Handle forbidden access
            console.warn("Forbidden access - insufficient permissions")
        } else if (statusCode >= 500) {
            // Handle server errors
            console.error("Server error - please try again later")
        }
        else if (statusCode >= 400) {
            // Handle client errors
            console.error(`Client error (${statusCode}) - ${errorMessage}`)
        } else if (statusCode === 404) {
            // Handle not found errors
            console.error("Resource not found - check the URL")
        } 

        return Promise.reject(error)
    }
)

export default axiosInstance