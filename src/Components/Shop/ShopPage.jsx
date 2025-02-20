// import React, { useState } from "react";
// import "./ShopPage.css";

// import Filter from "./Filters/Filter";
// import StoreData from "../../Data/StoreData";
// import { Link } from "react-router-dom";
// import { FiHeart } from "react-icons/fi";
// import { FaCartPlus } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../Features/Cart/cartSlice";
// import toast from "react-hot-toast";

// const ShopPage = () => {
//   const dispatch = useDispatch();
//   const [filteredProducts, setFilteredProducts] = useState(StoreData);
//   const [wishList, setWishList] = useState({});

//   const cartItems = useSelector((state) => state.cart.items);

//   const handleWishlistClick = (productID) => {
//     setWishList((prevWishlist) => ({
//       ...prevWishlist,
//       [productID]: !prevWishlist[productID],
//     }));
//   };

//   const handleAddToCart = (product) => {
//     const productInCart = cartItems.find(
//       (item) => item.productID === product.productID
//     );

//     if (productInCart && productInCart.quantity >= 20) {
//       toast.error("Product limit reached", {
//         duration: 2000,
//         style: { backgroundColor: "#ff4b4b", color: "white" },
//         iconTheme: { primary: "#fff", secondary: "#ff4b4b" },
//       });
//     } else {
//       dispatch(addToCart(product));
//       toast.success(`Added to cart!`, {
//         duration: 2000,
//         style: { backgroundColor: "#07bc0c", color: "white" },
//         iconTheme: { primary: "#fff", secondary: "#07bc0c" },
//       });
//     }
//   };

//   return (
//     <div className="shopPage">
//       <div className="shopPage__left">
//         <Filter products={StoreData} setFilteredProducts={setFilteredProducts} />
//       </div>
//       <div className="shopPage__right">
//         <div className="shopPageProducts">
//           <div className="shopPageProductsContainer">
//             {filteredProducts.map((product) => (
//               <div className="productContainer" key={product.productID}>
//                 <div className="productImages">
//                   <Link to="/Product">
//                     <img src={product.frontImg} alt="" className="product_front" />
//                     <img src={product.backImg} alt="" className="product_back" />
//                   </Link>
//                   <h4 onClick={() => handleAddToCart(product)}>Add to Cart</h4>
//                 </div>
//                 <div className="productImagesCart" onClick={() => handleAddToCart(product)}>
//                   <FaCartPlus />
//                 </div>
//                 <div className="productInfo">
//                   <div className="productCategoryWishlist">
//                     <p>{product.category}</p>
//                     <FiHeart
//                       onClick={() => handleWishlistClick(product.productID)}
//                       style={{ color: wishList[product.productID] ? "red" : "#767676", cursor: "pointer" }}
//                     />
//                   </div>
//                   <div className="productNameInfo">
//                     <Link to="/product">
//                       <h5>{product.productName}</h5>
//                     </Link>
//                     <p>${product.productPrice}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;