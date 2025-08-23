import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Plus, Edit, Trash2, Upload, LinkIcon, X, Save } from "lucide-react"
import productService from "../../services/productService"
import "./ProductManagement.css"

const ProductManagement = () => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [imagePreview, setImagePreview] = useState("")
  const [imageUploadMethod, setImageUploadMethod] = useState("url") // 'url' or 'file'
  const [customProducts, setCustomProducts] = useState([])

  {/*basic form data set*/}
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stockQuantity: "",
    sizes: "",
  })

  const categories = [
    "mens clothing",
    "womens clothing",
    "kids clothing",
    "accessories",
  ]

  useEffect(() => {
    loadCustomProducts()
  }, [])

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || editingProduct.title || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
        image: editingProduct.image || "",
        stockQuantity: editingProduct.stockQuantity || "",
        sizes: editingProduct.sizes ? editingProduct.sizes.join(", ") : "",
      })
      setImagePreview(editingProduct.image || "")
    }
  }, [editingProduct])

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

    if (name === "image" && imageUploadMethod === "url") {
      setImagePreview(value)
    }
  }
  /*image upload*/
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setFormData((prev) => ({
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

    const productData = {
      ...formData,
      title: formData.name, 
      price: Number.parseFloat(formData.price),
      stockQuantity: Number.parseInt(formData.stockQuantity) || 0,
      sizes: formData.sizes ? formData.sizes.split(",").map((size) => size.trim()) : [],
      id: editingProduct ? editingProduct.id : Date.now(),
      inStock: true,
      images: [formData.image, formData.image, formData.image],
    }

    try {
      if (editingProduct) {
        await productService.updateCustomProduct(productData)
      } else {
        await productService.createCustomProduct(productData)
      }
      
      loadCustomProducts()
      resetForm()
      setIsModalOpen(false)
      alert(editingProduct ? "Product updated successfully!" : "Product added successfully!")
    } catch (error) {
      alert("Error saving product: " + error.message)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteCustomProduct(productId)
        loadCustomProducts()
        alert("Product deleted successfully!")
      } catch (error) {
        alert("Error deleting product: " + error.message)
      }
    }
  }

  /*Reset state for form*/
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
      stockQuantity: "",
      sizes: "",
    })
    setEditingProduct(null)
    setImagePreview("")
    setImageUploadMethod("url")
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  return (
    <div className="product-management">
      <div className="product-management-header">
        <h1>Product Management</h1>
        <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add New Product
        </button>
      </div>
      {/*product grid format*/}
      <div className="products-grid">
        {customProducts && customProducts.length > 0 ? (
          customProducts.map((product) => (
            <div key={product.id} className="product-management-card">
              <div className="product-image-container">
                <img
                  src={product.image || "/placeholder.svg?height=200&width=200"}
                  alt={product.name || product.title}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=200&width=200"
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name || product.title}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-stock">Stock: {product.stockQuantity || 0}</p>
                {product.sizes && product.sizes.length > 0 && (
                  <p className="product-sizes">Sizes: {product.sizes.join(", ")}</p>
                )}
              </div>
              <div className="product-actions">
                <button className="edit-btn" onClick={() => handleEdit(product)}>
                  <Edit size={16} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-products">
            <h3>No Custom Products</h3>
            <p>Start by adding your first custom product</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
              <button className="close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="stockQuantity">Stock Quantity</label>
                  <input
                    type="number"
                    id="stockQuantity"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Product Image</label>
                <div className="image-upload-methods">
                  <button
                    type="button"
                    className={`method-btn ${imageUploadMethod === "url" ? "active" : ""}`}
                    onClick={() => setImageUploadMethod("url")}
                  >
                    <LinkIcon size={16} />
                    URL
                  </button>
                  <button
                    type="button"
                    className={`method-btn ${imageUploadMethod === "file" ? "active" : ""}`}
                    onClick={() => setImageUploadMethod("file")}
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                </div>

                {imageUploadMethod === "url" ? (
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                ) : (
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                )}

                {imagePreview && (
                  <div className="image-preview">
                    <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="sizes">Sizes (comma separated)</label>
                <input
                  type="text"
                  id="sizes"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  placeholder="e.g. S, M, L, XL"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  <Save size={16} />
                  {editingProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement