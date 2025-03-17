import React, { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Config/AuthContext"; // ✅ Auth Context for Real-Time Updates
import { logout } from "../../Config/authService"; // ✅ Supabase Logout Function
import { searchProducts } from "../../Config/productService"; // ✅ Import search function

import logo from "../../Assets/logo1.png";
import { RiMenu2Line, RiShoppingBagLine } from "react-icons/ri";
import { FiSearch, FiHeart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  const cart = useSelector((state) => state.cart || { items: [] });
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // ✅ Get user from Auth Context

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // ✅ Store search results
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const results = await searchProducts(query); // ✅ Fetch results from Supabase
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery("");
      setSearchResults([]);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null); // ✅ Update auth state immediately
    navigate("/auth"); // Redirect to login page after logout
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/shop">SHOP</Link></li>
              <li><Link to="/blog">BLOG</Link></li>
              <li><Link to="/about">ABOUT</Link></li>
              <li><Link to="/contact">CONTACT</Link></li>
            </ul>
          </div>
        </div>

        <div className="iconContainer">
          {/* Search Bar */}
          <div className="searchContainer">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FiSearch size={22} onClick={handleSearchSubmit} style={{ cursor: "pointer" }} />

            {/* 🔹 Search Results Dropdown */}
            {searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((product) => (
                  <li key={product.id}>
                    <Link to={`/product/${product.id}`} onClick={() => setSearchResults([])}>
                      {product.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="profile-dropdown">
            {user ? (
              <div className="dropdown">
                <FaRegUser size={22} onClick={() => setDropdownOpen(!dropdownOpen)} />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth">
                <FaRegUser size={22} />
              </Link>
            )}
          </div>

          {/* Cart Link */}
          <Link to="/cart">
            <Badge badgeContent={cart.items?.length || 0} color="primary">
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>

          <FiHeart size={22} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
