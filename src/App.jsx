// to change 
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./components/pages/HomePage";
import MensPage from "./components/pages/MensPage.jsx";
import WomensPage from "./components/pages/WomensPage";
import KidsPage from "./components/pages/KidsPage";
import ProductPage from "./components/pages/ProductsPage";
import RegistrationPage from "./components/user/RegistrationPage";
import LoginPage from "./components/user/LoginPage.jsx";
import ProfilePage from "./components/user/ProfilePage";
import LogoutPage from "./components/user/LogoutPage";
import Cart from "./components/cart/Cart.jsx"
import WishlistPage from "./components/pages/WishlistPage";
import Logo from "./components/ui/Logo"
import ForgotPasswordPage from "./components/user/ForgotPasswordPage";
import ResetPasswordPage from "./components/user/ResetPasswordPage.jsx"
import SearchResultsPage from "./components/pages/SearchResultsPage.jsx";

const App = () =>{
    return(
        <Provider store={store}>
                <div>
                    <Header/>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/mens" element={<MensPage />} />
                            <Route path="/womens" element={<WomensPage />} />
                            <Route path="/kids" element={<KidsPage />} />
                            <Route path="/product/:id" element={<ProductPage />} />
                            <Route path="/register" element={<RegistrationPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/cart" element={<Cart />}/>
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/logout" element={<LogoutPage />} />
                            <Route path="/wishlist" element={<WishlistPage />} />
                            <Route path="/logo" element={<Logo />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/reset-password" element={<ResetPasswordPage />}/>
                            <Route path="/search" element={<SearchResultsPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                        </Routes>
                    </main>
                    <Footer/>
                </div>
        </Provider>
    )
}

export default App;