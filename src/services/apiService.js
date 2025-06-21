// Generic API service using Axios
import axiosInstance from "../utils/axiosConfig"

// Generic GET request
export const get = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "GET request failed")
  }
}

// Generic POST request
export const post = async (endpoint, data = {}) => {
  try {
    const response = await axiosInstance.post(endpoint, data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "POST request failed")
  }
}

// Generic PUT request
export const put = async (endpoint, data = {}) => {
  try {
    const response = await axiosInstance.put(endpoint, data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "PUT request failed")
  }
}

// Generic DELETE request
export const del = async (endpoint) => {
  try {
    const response = await axiosInstance.delete(endpoint)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "DELETE request failed")
  }
}

// Generic PATCH request
export const patch = async (endpoint, data = {}) => {
  try {
    const response = await axiosInstance.patch(endpoint, data)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || "PATCH request failed")
  }
}
