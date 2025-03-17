import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebookF, FaXTwitter, FaInstagram, FaPinterest } from "react-icons/fa6";
import supabase from "../Config/supabase";
import { getCurrentUser } from "../Config/authService";
import "./SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
      if (error) console.error("❌ Error fetching product:", error);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  const handleBuyNow = async () => {
    const user = await getCurrentUser();
    if (!user) {
      // Redirect to auth page with a query param to return to checkout
      return navigate(`/auth?redirect=/checkout/${id}`);
    }
    // If logged in, go directly to checkout
    navigate(`/checkout/${id}`, { state: { product } });
  };

  return (
    <div className="single-product-container">
      <h1>{product.name}</h1>
      <img src={product.image_url} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default SingleProduct;
