// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../Features/Cart/cartSlice"; // Corrected path
// import supabase from "../Config/supabase"; // Corrected path
// import "../Components/Product/ProductDetails.css"; // Corrected path
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .eq("id", id)
//         .single();

//       if (error) {
//         console.error("Error fetching product details:", error);
//       } else {
//         setProduct(data);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleBuyNow = () => {
//     navigate("/checkout", { state: { product } });
//   };

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//     toast.success("Added to Cart!", {
//       duration: 2000,
//       style: {
//         backgroundColor: "#07bc0c",
//         color: "white",
//       },
//       iconTheme: {
//         primary: "#fff",
//         secondary: "#07bc0c",
//       },
//     });
//   };

//   if (!product) return <div className="loading">Loading...</div>;

//   return (
//     <div className="product-details-container">
//       <h1>{product.name}</h1>
//       <img src={product.image_url} alt={product.name} className="product-image" />
//       <p>{product.description}</p>
//       <p className="product-price">${product.price}</p>

//       <div className="product-actions">
//         <button className="buy-now-btn" onClick={handleBuyNow}>
//           Buy Now
//         </button>
//         <button className="add-to-cart-btn" onClick={handleAddToCart}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
