import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProducts } from "../../store/productSlice.js";
import ProductGrid from "../products/ProductGrid";
import "./SearchResults.css";

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q")
    const { searchResults, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (searchQuery) {
          dispatch(searchProducts(searchQuery))
        }
      }, [searchQuery, dispatch])
    
      return (
        <div className="search-results-page">
          <h1 className="search-results-title">Search Results for "{searchQuery}"</h1>
    
          {status === "loading" && <div className="search-results-loading">Loading...</div>}
    
          {status === "failed" && <div className="search-results-error">Error: {error}</div>}
    
          {status === "succeeded" && searchResults.length === 0 && (
            <p className="search-results-empty">No products found for your search.</p>
          )}
    
          {status === "succeeded" && searchResults.length > 0 && (
            <>
              <p className="search-results-count">Found {searchResults.length} products</p>
              <ProductGrid products={searchResults} />
            </>
          )}
        </div>
      )
    }
    
    export default SearchResultsPage
    