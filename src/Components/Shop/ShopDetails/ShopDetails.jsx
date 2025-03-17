import React, { useState, useEffect } from "react";
import "./ShopDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const ShopDetails = () => {
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({ category: "all", sortBy: "default" });
  const [filteredProducts, setFilteredProducts] = useState(StoreData);

  const cartItems = useSelector((state) => state.cart.items);

  /** ✅ Handle Wishlist Toggle */
  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  /** ✅ Handle Filtering */
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  /** ✅ Smooth Scroll to Top */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /** ✅ Open/Close Filter Drawer */
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setIsDrawerOpen(false);

  /** ✅ Handle Add to Cart */
  const handleAddToCart = (product) => {
    console.log("🛒 Add to Cart clicked!", product);

    const formattedProduct = {
      id: product.productID,  // Ensure this matches Redux
      name: product.productName,
      price: product.productPrice,
      image_url: product.frontImg,
      quantity: 1,
    };

    const productInCart = cartItems.find((item) => item.id === formattedProduct.id);

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
      });
    } else {
      dispatch(addToCart(formattedProduct));
      console.log("🛍️ Product dispatched to Redux:", formattedProduct);

      toast.success(`Added to cart!`, {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#07bc0c" },
      });
    }
  };

  /** ✅ Apply Filters & Sorting */
  useEffect(() => {
    const filtered = StoreData.filter((product) =>
      filters.category === "all" ? true : product.category === filters.category
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "lowToHigh":
          return a.productPrice - b.productPrice;
        case "highToLow":
          return b.productPrice - a.productPrice;
        case "a-z":
          return a.productName.localeCompare(b.productName);
        case "z-a":
          return b.productName.localeCompare(a.productName);
        default:
          return 0;
      }
    });

    setFilteredProducts(sorted);
  }, [filters]);

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          <div className="shopDetails__left">
            <Filter products={StoreData} setFilteredProducts={setFilteredProducts} />
          </div>

          <div className="shopDetails__right">
            {/* 🔹 Sorting & Breadcrumb */}
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>Home</Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select name="sortBy" onChange={handleFilterChange}>
                  <option value="default">Default Sorting</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to High</option>
                  <option value="highToLow">Price, High to Low</option>
                </select>
              </div>
            </div>

            {/* 🔹 Products List */}
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {filteredProducts.map((product) => (
                  <div className="sdProductContainer" key={product.productID}>
                    <div className="sdProductImages">
                      <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                        <img src={product.frontImg} alt={product.productName} className="sdProduct_front" />
                        <img src={product.backImg} alt={product.productName} className="sdProduct_back" />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
                    </div>

                    <div className="sdProductImagesCart" onClick={() => handleAddToCart(product)}>
                      <FaCartPlus />
                    </div>

                    <div className="sdProductInfo">
                      <div className="sdProductNameInfo">
                        <Link to={`/product/${product.productID}`} onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>
                      </div>

                      {/* Wishlist Button */}
                      <FiHeart
                        onClick={() => handleWishlistClick(product.productID)}
                        style={{
                          color: wishList[product.productID] ? "red" : "#767676",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
