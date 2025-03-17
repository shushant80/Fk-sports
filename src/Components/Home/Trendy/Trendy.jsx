import React, { useState, useEffect } from "react";
import "./Trendy.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaStar, FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import supabase from "../../../Config/supabase";

const Trendy = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tab1");
  const [wishList, setWishList] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*").limit(8);
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    const productInCart = cartItems.find((item) => item.id === product.id);

    if (productInCart && productInCart.quantity >= 20) {
      toast.error("Product limit reached!", {
        duration: 2000,
        style: { backgroundColor: "#ff4b4b", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
      });
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart!", {
        duration: 2000,
        style: { backgroundColor: "#07bc0c", color: "white" },
        iconTheme: { primary: "#fff", secondary: "#07bc0c" },
      });
    }
  };

  const filterProducts = () => {
    switch (activeTab) {
      case "tab2":
        return products.slice().reverse(); // New Arrivals
      case "tab3":
        return products.sort((a, b) => b.reviews - a.reviews); // Best Sellers
      case "tab4":
        return products.sort((a, b) => a.price - b.price); // Top Rated
      default:
        return products;
    }
  };

  return (
    <div className="trendyProducts">
      <h2>Our Trendy Products</h2>
      <div className="trendyTabs">
        <div className="tabs">
          <p onClick={() => handleTabClick("tab1")} className={activeTab === "tab1" ? "active" : ""}>All</p>
          <p onClick={() => handleTabClick("tab2")} className={activeTab === "tab2" ? "active" : ""}>New Arrivals</p>
          <p onClick={() => handleTabClick("tab3")} className={activeTab === "tab3" ? "active" : ""}>Best Seller</p>
          <p onClick={() => handleTabClick("tab4")} className={activeTab === "tab4" ? "active" : ""}>Top Rated</p>
        </div>
      </div>

      <div className="trendyMainContainer">
        {filterProducts().map((product) => (
          <div className="trendyProductContainer" key={product.id}>
            <div className="trendyProductImages">
              <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                <img src={product.image_url} alt={product.name} className="trendyProduct_front" />
                <img src={product.image_url} alt={product.name} className="trendyProduct_back" />
              </Link>
              <button className="small-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
            <div className="trendyProductImagesCart" onClick={() => handleAddToCart(product)}>
              <FaCartPlus />
            </div>
            <div className="trendyProductInfo">
              <div className="trendyProductCategoryWishlist">
                <p>{product.category}</p>
                <FiHeart onClick={() => handleWishlistClick(product.id)} style={{ color: wishList[product.id] ? "red" : "#767676", cursor: "pointer" }} />
              </div>
              <div className="trendyProductNameInfo">
                <Link to={`/product/${product.id}`} onClick={scrollToTop}>
                  <h5>{product.name}</h5>
                </Link>
                <p>${product.price}</p>
                <div className="trendyProductRatingReviews">
                  <div className="trendyProductRatingStar">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} color={index < product.rating ? "#FEC78A" : "#ccc"} size={10} />
                    ))}
                  </div>
                  <span>{product.reviews} Reviews</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="discoverMore">
        <Link to="/shop" onClick={scrollToTop}>
          <p>Discover More</p>
        </Link>
      </div>
    </div>
  );
};

export default Trendy;