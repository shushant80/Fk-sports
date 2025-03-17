import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../Config/supabase";
import "./OrderSummary.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, address, paymentMethod, userId } = location.state || {};

  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!product || !address || !paymentMethod || !userId) {
      console.error("❌ Missing order details", { product, address, paymentMethod, userId });
      setIsLoading(false);
      return;
    }

    // ✅ Debugging: Check if product name is present before saving
    console.log("🔍 Order Details:", { product, address, paymentMethod, userId });

    if (!product.name) {
      console.error("❌ Error: Product name is missing!");
      setIsLoading(false);
      return;
    }

    const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderId);

    const delivery = new Date();
    delivery.setDate(delivery.getDate() + Math.floor(Math.random() * 3) + 5);
    setDeliveryDate(delivery.toDateString());

    const saveOrder = async () => {
      const { error } = await supabase.from("orders").insert([
        {
          order_id: generatedOrderId,
          user_id: userId,
          product_name: product.name || "Unknown Product", // ✅ Ensure product name is not null
          total_amount: product.price || 0,
          address: JSON.stringify(address),
          payment_method: paymentMethod,
          delivery_date: delivery.toDateString(),
          image_url: product.image_url || "",
          order_date: new Date(),
          created_at: new Date(),
        },
      ]);

      if (error) {
        console.error("❌ Error saving order:", error.message);
      } else {
        console.log("✅ Order saved successfully!");
      }

      setIsLoading(false);
    };

    saveOrder();
  }, [product, address, paymentMethod, userId]);

  if (isLoading) return <h2>🔄 Processing your order...</h2>;

  if (!product || !address || !paymentMethod || !userId) {
    return <h2 className="error">🚨 Error: Missing order details.</h2>;
  }

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <div className="summary-details">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Product:</strong> {product.name || "Unknown"}</p> {/* ✅ Prevent null */}
        <p><strong>Price:</strong> ${product.price || "0.00"}</p>
        <p><strong>Delivery Address:</strong> {address.street}, {address.city}, {address.state}, {address.zipCode}</p>
        <p><strong>Payment Method:</strong> {paymentMethod}</p>
        <p><strong>Estimated Delivery:</strong> {deliveryDate}</p>
        <div className="product-info">
          <img src={product.image_url || "default.jpg"} alt={product.name || "Product"} className="product-image" />
          <p className="thank-you-message"><strong>Thank you for your order! 🎉</strong></p>
        </div>
      </div>
      <div className="confirmation-message">
        Your order has been placed successfully! You will receive a confirmation email shortly.
      </div>
      <button className="back-to-home" onClick={() => navigate("/profile", { replace: true })}>
        Go to Profile
      </button>
    </div>
  );
};

export default OrderSummary;
