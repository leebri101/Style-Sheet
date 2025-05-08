import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import fetchCategories from "../../store/productSlice.js";
import "./CategorySection.css";


const CategorySection = () => {
    const dispatch = useDispatch ();
    const categories = useSelector((state) => state.products.categories);
    const status = useSelector((state) => state.products.status);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch]);

    const getCategoryRoute = (category) => {
        if(category.includes("men")) return "/men";
        if(category.includes("women")) return "/women";
        if(category.includes("kids")) return "/kids";
        return "/$category.replace(/[^a-zA-Z0-9]/g, "-")"; // Fallback route
    }

    const formatCategoryName = (category) => {
        return category
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.clice(1))
        .join(" ");
    }

    if (status === "loading" && categories.length === 0) {
        return <div className="category-section-loading">
            Loading categories...
        </div>
    }

    if (categories.length === 0 ){
        return null;
    }

    return (
        <section className = "category-section">
            <h2 className = "category-section-title">
                Shop by Category
            </h2>
            <div className = "category-grid">
                {categories.map((category) => (
                    <Link key={category} to={getCategoryRoute(category)} 
                    className = "category-card">
                        <div className = "category-content">
                            <h3 className = "category-name">
                                {formatCategoryName(category)}
                            </h3>
                            <span className = "category-link">
                                Shop Now
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default CategorySection;