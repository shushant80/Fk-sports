import React, { useState } from "react";
import "./Navbar.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

import logo from "../../Assets/logo1.png";

import { RiMenu2Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBagLine } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

// Social Icons
import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

import Badge from "@mui/material/Badge";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Initialize navigate

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${searchQuery}`); // Navigate with query
      setSearchQuery(""); // Clear search input
      setMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  // Submit on "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className="navBar">
        <div className="logoLinkContainer">
          <div className="logoContainer">
            <Link to="/" onClick={scrollToTop}>
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="linkContainer">
            <ul>
              <li><Link to="/" onClick={scrollToTop}>HOME</Link></li>
              <li><Link to="/shop" onClick={scrollToTop}>SHOP</Link></li>
              <li><Link to="/blog" onClick={scrollToTop}>BLOG</Link></li>
              <li><Link to="/about" onClick={scrollToTop}>ABOUT</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>CONTACT</Link></li>
            </ul>
          </div>
        </div>
        <div className="iconContainer">
          {/* Search Input */}
          <div className="searchContainer">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
            <FiSearch size={22} onClick={handleSearchSubmit} style={{ cursor: "pointer" }} />
          </div>

          <Link to="/loginSignUp" onClick={scrollToTop}><FaRegUser size={22} /></Link>
          <Link to="/cart" onClick={scrollToTop}>
            <Badge badgeContent={cart.items.length || "0"} color="primary">
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
          <FiHeart size={22} onClick={scrollToTop} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav>
        <div className="mobile-nav">
          {mobileMenuOpen ? (
            <MdOutlineClose size={22} onClick={toggleMobileMenu} />
          ) : (
            <RiMenu2Line size={22} onClick={toggleMobileMenu} />
          )}
          <div className="logoContainer">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>
          <Link to="/cart">
            <Badge badgeContent={cart.items.length || "0"} color="primary">
              <RiShoppingBagLine size={22} color="white" />
            </Badge>
          </Link>
        </div>

        {/* Mobile Search */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-menuSearchBar">
            <input 
              type="text" 
              placeholder="Search products" 
              value={searchQuery} 
              onChange={handleSearchChange} 
              onKeyDown={handleKeyDown}
            />
            <FiSearch size={22} onClick={handleSearchSubmit} />
          </div>

          <div className="mobile-menuList">
            <ul>
              <li><Link to="/" onClick={toggleMobileMenu}>HOME</Link></li>
              <li><Link to="/shop" onClick={toggleMobileMenu}>SHOP</Link></li>
              <li><Link to="/blog" onClick={toggleMobileMenu}>BLOG</Link></li>
              <li><Link to="/about" onClick={toggleMobileMenu}>ABOUT</Link></li>
              <li><Link to="/contact" onClick={toggleMobileMenu}>CONTACT</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
