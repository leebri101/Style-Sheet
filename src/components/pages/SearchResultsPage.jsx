import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchProducts } from ".productSlice.js";
import ProductGrid from "../products/ProductGrid";
import "./SearchResults.css";

const SearchResultsPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q")
    const { searchResults, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(searchProducts(searchQuery));
    }, [dispatch, searchQuery]);

    if (status === "loading") {
        return <div className="search-results-loading">Loading...</div>;
    }

    if (status === "failed") {
        return <div className="search-results-error">An error has occurred: {error}</div>;
    }

    return(
        <div className="search-results-page">
            <h1 className="search-results-title">Search Results for &quot;{searchQuery}&quot;</h1>
            {searchResults.length === 0 ? (
                <p className="search-results-empty">No Products Found.</p>
            ) : (
                <ProductGrid products={searchResults} />  
            )}
        </div>
    )
}

export default SearchResultsPage; 