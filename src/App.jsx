import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CategoryPage from "./pages/CategoryPage"
import MenPage from "./pages/MenPage"
import WomenPage from "./pages/WomenPage"
import KidsPage from "./pages/KidsPage"
import SearchPage from "./pages/SearchPage"
import SearchResultsPage from "./pages/SearchResultsPage"
import WishlistPage from "./pages/WishlistPage"
import AuthPage from "./pages/AuthPage"
import LoginPage from "./pages/LoginPage"
import RegistrationForm from "./components/RegistrationForm"
import ProfilePage from "./pages/ProfilePage"
import LogoutPage from "./pages/LogoutPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import MockApiInitializer from "./components/MockApiInitializer"
import "./index.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <MockApiInitializer />
          <Header />
          <main className="main-content">
            <Routes>
              {/* Home Route */}
              <Route path="/" element={<HomePage />} />

              {/* Product Routes */}
              <Route path="/product/:id" element={<ProductPage />} />

              {/* Category Routes - Updated for FakeStore API categories */}
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/electronics" element={<CategoryPage />} />
              <Route path="/jewelry" element={<CategoryPage />} />

              {/* Search Routes */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search-results" element={<SearchResultsPage />} />

              {/* User Routes */}
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />

              {/* Fallback Route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  )
}

export default App
