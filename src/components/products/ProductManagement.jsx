import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchProducts } from "../../store/productSlice"
import productService from "../../services/productService"
import "./ProductManagement.css"

const ProductManagement = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [customProducts, setCustomProducts] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        stockQuantity: "",
        sizes: "",
    })
    const [editingProduct, setEditingProduct] = useState(null)
    const [imagePreview, setImagePreview] = useState("")

    useEffect(() => {
        loadCustomProducts()
    }, [])
    
    const loadCustomProducts = () => {
        const products = productService.getCustomProducts()
        setCustomProducts(products)
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const imageUrl = e.target.result
                setFormData((prev) =>({
                    ...prev,
                    image: imageUrl,
                }))
                setImagePreview(imageUrl)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const productData = {
                ...formData,
                price: Number.parseFloat(formData.price),
                stockQuantity: Number.parseInt(formData.stockQuantity) || 0,
                sizes: formData.sizes.split(",").map((s) => s.trim()).filter((s) => s),
                inStock: true,
                images: [formData.image, formData.image, formData.image],
            }

            if  (editingProduct) {
                await productService.updateCustomProduct(editingProduct.id, productData)
            } else {
                await productService.createCustomProduct(productData)
            }

            // Refreshes products in Redux store
            dispatch(fetchProducts())
            loadCustomProducts()
            resetForm()
            alert(editingProduct ? "Product updated successfully!" : "Product added successfully!")
        } catch (error) {
            alert("Error saving product: " + error.message)
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name || product.title,
            price: product.price.toString(),
            description: product.description,
            category: product.category,
            image: product.image,
            stockQuantity: product.stockQuantity.toString() || "0",
            sizes: product.sizes.join(", ") || "", 
        })
        setImagePreview(product.images[0])
        setIsOpen(true)
    }

    const handleDelete = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await productService.deleteCustomProduct(productId)
                dispatch(fetchProducts())
                loadCustomProducts()
                alert("Product deleted successfully!")
            } catch (error) {
                alert("Error deleting product: " + error.message)
            }
        }
    }

    const resetForm = () => {
        setFormData({
            name: "",
            price: "",
            category: "",
            description: "",
            image: "",
            stockQuantity: "",
            sizes: "",
        })
        setEditingProduct(null)
        setImagePreview("")
        setIsOpen(false)
    }
    
    return (
        <div className="product-management">
            <div className="product-management-header">
                <h2>Product Management</h2>
                <button className="add-product-btn" onClick={() => setIsOpen(true)}>
                    Add Product
                </button>
            </div>

            {/* Custom Products List */}
            <div className="custom-products-list">
                <h3>Custom Products ({customProducts.length})</h3>
                <div className="product-grid">
                    {customProducts.map((product) => (
                        <div key={product.id} className="custom-product-card">
                            <img 
                            src={product.image || "/placeholder.svg?height=150&width=150"}
                            alt={product.name}
                            className="product-image"
                            />
                            <div className="product-info">
                                <h4>{product.name}</h4>
                                <p className="product-price">£{product.price}</p>
                                <p className="product-category">{product.category}</p>
                                <div className="product-actions">
                                    <button className="edit-btn" onClick={() => handleEdit(product)}>
                                    Edit
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Product Form Modal */}
            {isOpen &&  (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                            <button className="close-btn" onClick={resetForm}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="product-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Product Name:</label>
                                    <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Price(£):</label>
                                    <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    required
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category:</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                                        <option value="">Select Category</option>
                                        <option value="mens clothing">Mens Clothing</option>
                                        <option value="womens clothing"> Womens Clothing</option>
                                        <option value="kids clothing">Kids Clothing</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Description:</label>
                                    <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    required/>
                                </div>
                                <div className="form-group">
                                    <label>Product Image:</label>
                                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                                    <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleImageChange}
                                    placeholder="Or enter image URL"
                                    />
                                    {imagePreview && (
                                        <div className="image-preview">
                                            <img src={imagePreview || "/placeholder.svg"} alt="Preview"/>
                                        </div>
                                    )}
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Stock Quantity:</label>
                                        <input
                                        type="number"
                                        name="stockQuantity"
                                        value={formData.stockQuantity}
                                        onChange={handleInputChange}
                                        min="0"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Sizes (comma separated):</label>
                                        <input
                                        type="text"
                                        name="sizes"
                                        value={formData.sizes}
                                        onChange={handleInputChange}
                                        placeholder="S, M, L, XL"
                                        />
                                    </div>
                                </div>
                                <div className="form-actions">
                                    <button type="button" onClick={resetForm} className="cancel-btn">
                                        Cancel
                                    </button>
                                    <button type="submit" className="submit-btn">
                                        {editingProduct ? "Update Product" : "Add Product"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductManagement