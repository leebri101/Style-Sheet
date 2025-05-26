/**
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @return {Promise} - Promise with response data
 */
export const fetchFromAPI = async (endpoint, options = {}) => {
    const API_BASE_URL = "https://fakestoreapi.com";
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error){
        console.error(`API Error (${url}):`, error);
        throw error
    }
}

/**
 * @param {Object} product - Product data from API
 * @return {Object} - Transformed product data
 */

export const transformProductData = (product) => {
    return {
        id: product.id,
        name: product.title,
        price: product.price,
        category: product.category,
        imageUrl: product.image,
        description: product.description,
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        rating: product.rating,
    }

}
