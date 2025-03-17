import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Config/AuthContext"; // ✅ Added AuthProvider
import PrivateRoute from "./Components/PrivateRoute"; // ✅ For protected routes
import { Toaster } from "react-hot-toast";

import "./App.css";

// ✅ Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import AuthPage from "./Pages/AuthPage";
import TermsConditions from "./Pages/TermsConditions";
import NotFound from "./Pages/NotFound";
import SingleProduct from "./Pages/SingleProduct";

// ✅ Components
import Header from "./Components/Header/Navbar";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Popup from "./Components/PopupBanner/Popup";

// ✅ Shopping & Order Pages
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/OrderSuccess";
import OrderSummary from "./Pages/OrderSummary";
import OrderHistory from "./Pages/OrderHistory";

// ✅ User Profile
import UserProfile from "./Pages/UserProfile";
import EditProfile from "./Pages/EditProfile";

// ✅ Other Components
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import BlogDetails from "./Components/Blog/BlogDetails/BlogDetails";

const App = () => {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <BrowserRouter>
        <Popup />
        <ScrollToTop />
        <Header />
        <Toaster /> {/* ✅ Keeps toast notifications inside the app */}

        <Routes>
          {/* ✅ Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* ✅ Protected Routes (Only for Logged-in Users) */}
          <Route path="/checkout/:id" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/order-summary" element={<PrivateRoute><OrderSummary /></PrivateRoute>} />
          <Route path="/payment/:id" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
          <Route path="/order-history" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />

          {/* ✅ User Profile (Protected) */}
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
