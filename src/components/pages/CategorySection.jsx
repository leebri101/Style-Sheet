import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../store/productSlice.js";
import "./CategorySection.css";

const mainCategories = [
  {
    name: "Men's",
    route: "/mens",
    description: "Discover your threads",
    available: true,
  },
  {
    name: "Women's",
    route: "/womens",
    description: "Find your perfect fit",
    available: true,
  },
  {
    name: "Kids",
    route: "/kids",
    description: "Have a pajama party",
    available: true,
  },
];

const comingSoonCategories = [
  {
    name: "Accessories",
    description: "Bags, Belts, and Beyond",
    launchDate: "Spring 2025",
  },
  {
    name: "Jewelry",
    description: "Shine bright like a diamond",
    launchDate: "Summer 2026",
  },
];

const CategorySection = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading" && categories.length === 0) {
    return <div className="category-section-loading">Loading categories...</div>;
  }

  const renderMainCategories = () => (
    <div className="category-grid">
      {mainCategories.map((category) => (
        <Link
          key={category.name}
          to={category.route}
          className="category-card main-category"
        >
          <div className="category-content">
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <span className="category-link">Shop Now</span>
          </div>
        </Link>
      ))}
    </div>
  );

  const renderComingSoonCategories = () => (
    <div className="coming-soon-section">
      <h3 className="coming-soon-title">Coming Soon</h3>
      <div className="coming-soon-grid">
        {comingSoonCategories.map((category) => (
          <div key={category.name} className="category-card coming-soon-card">
            <div className="category-content">
              <div className="coming-soon-badge">Coming Soon</div>
              <h4 className="category-name">{category.name}</h4>
              <p className="category-description">{category.description}</p>
              <span className="launch-date">
                Expected: {category.launchDate}
              </span>
              <button className="notify-btn">Notify Me</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="category-section">
      <h2 className="category-section-title">Shop by Category</h2>
      {renderMainCategories()}
      {renderComingSoonCategories()}
    </section>
  );
};

export default CategorySection;