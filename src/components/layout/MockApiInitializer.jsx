"use client"

// MockAPI Initializer - Now handles FakeStore API status
import { useState, useEffect } from "react"
import "./MockApiInitializer.css"

const MockApiInitializer = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [apiStatus, setApiStatus] = useState("checking")

  useEffect(() => {
    checkFakeStoreApiStatus()
  }, [])

  const checkFakeStoreApiStatus = async () => {
    try {
      setApiStatus("checking")
      console.log("🔍 Checking FakeStore API status...")

      // Test FakeStore API connectivity
      const response = await fetch("https://fakestoreapi.com/products?limit=1")

      if (!response.ok) {
        throw new Error(`FakeStore API returned status: ${response.status}`)
      }

      const testData = await response.json()

      if (!testData || testData.length === 0) {
        throw new Error("FakeStore API returned empty data")
      }

      console.log("✅ FakeStore API is accessible and working")
      setApiStatus("ready")
      setIsLoading(false)
    } catch (error) {
      console.error("❌ FakeStore API check failed:", error)
      setError(error.message)
      setApiStatus("error")
      setIsLoading(false)
    }
  }

  const retryConnection = () => {
    setError(null)
    setIsLoading(true)
    checkFakeStoreApiStatus()
  }

  if (isLoading) {
    return (
      <div className="api-initializer">
        <div className="api-initializer-content">
          <div className="api-initializer-spinner"></div>
          <h2>Connecting to FakeStore API</h2>
          <p>{apiStatus === "checking" && "Checking API connectivity..."}</p>
          <div className="api-initializer-progress">
            <div className="api-initializer-progress-bar"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="api-initializer">
        <div className="api-initializer-content error">
          <div className="api-initializer-error-icon">⚠️</div>
          <h2>API Connection Failed</h2>
          <p>Unable to connect to FakeStore API:</p>
          <div className="api-initializer-error-message">{error}</div>
          <div className="api-initializer-actions">
            <button onClick={retryConnection} className="api-initializer-retry-btn">
              🔄 Retry Connection
            </button>
          </div>
          <div className="api-initializer-help">
            <h3>Troubleshooting:</h3>
            <ul>
              <li>Check your internet connection</li>
              <li>Verify that fakestoreapi.com is accessible</li>
              <li>Try refreshing the page</li>
              <li>Check browser console for additional errors</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      {/* API Status Indicator */}
      <div className="api-status-indicator">
        <div className={`api-status-dot ${apiStatus}`}></div>
        <span className="api-status-text">
          {apiStatus === "ready" && "FakeStore API Connected"}
          {apiStatus === "error" && "API Connection Error"}
        </span>
      </div>
    </>
  )
}

export default MockApiInitializer
