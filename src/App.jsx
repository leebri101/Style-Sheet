import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/pages/HomePage";
import ProductPage from "./components/pages/ProductsPage";
import CategoryPage from "./components/pages/CategorySection";
import MenPage from "./components/pages/MensPage";
import WomenPage from "./components/pages/WomensPage";
import KidsPage from "./components/pages/KidsPage";
import SearchResultsPage from "./components/pages/SearchResultsPage";
import WishlistPage from "./components/pages/WishlistPage";
import AuthPage from "./components/user/AuthPage";
import LoginPage from "./components/user/LoginPage";
import RegistrationPage from "./components/user/RegistrationPage";
import ProfilePage from "./components/user/ProfilePage";
import LogoutPage from "./components/user/LogoutPage";
import ForgotPasswordPage from "./components/user/ForgotPasswordPage";
import ResetPasswordPage from "./components/user/ResetPasswordPage";
import ProductManagement from "./components/products/ProductManagement";
import MockApiInitializer from "./components/layout/MockApiInitializer";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MockApiInitializer>
          <Header />
          <main className="main-content">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<HomePage />} />

              {/* Product Routes */}
              <Route path="/product/:id" element={<ProductPage />} />
              {/* Product Management Route */}
              <Route path="/admin/products" element={<ProductManagement />} />
              
              {/* Category Routes - Updated for FakeStore API categories */}
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/jewelry" element={<CategoryPage />} />

              {/* Search Routes */}
              <Route path="/search-results" element={<SearchResultsPage />} />

              {/* User Routes */}
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Fallback Route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </MockApiInitializer>
      </div>
    </Provider>
  );
}

export default App;