import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSummary.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, address, paymentMethod } = location.state || {};

  if (!product || !address || !paymentMethod) {
    return <h2>🚨 Error: Missing order details!</h2>;
  }

  return (
    <div className="order-summary-container">
      <h2>🎉 Order Confirmed!</h2>
      <p>✅ Thank you for your order.</p>
      
      <h3>Order Details:</h3>
      <p><strong>Product:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Delivery Address:</strong> {address}</p>
      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default OrderSummary;
