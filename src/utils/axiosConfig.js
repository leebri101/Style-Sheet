// Axios configuration with interceptors and error handling
import axios from "axios"

// Create axios instance for FakeStore API (fallback only)
const fakeStoreInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for FakeStore API
fakeStoreInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (import.meta.env.MODE === "development") {
      console.log("🚀 FakeStore API Request:", {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        params: config.params,
      })
    }

    return config
  },
  (error) => {
    console.error("❌ FakeStore Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor for FakeStore API
fakeStoreInstance.interceptors.response.use(
  (response) => {
    if (import.meta.env.MODE === "development") {
      console.log("✅ FakeStore API Response:", {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }
    return response
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || "An error occurred"
    const statusCode = error.response?.status

    console.error("❌ FakeStore API Error:", {
      status: statusCode,
      message: errorMessage,
      url: error.config?.url,
    })

    if (statusCode === 401) {
      localStorage.removeItem("userToken")
      localStorage.removeItem("userData")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

// Export the instance
export default fakeStoreInstance