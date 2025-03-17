import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../Config/supabase"; // Import Supabase
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, address, paymentMethod } = location.state || {}; // Get passed state

  // State for card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  // State for UPI Payment
  const [upiId, setUpiId] = useState("");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error) {
        setUserId(data?.user?.id);
      }
    };
    fetchUser();
  }, []);

  console.log("Received address:", address);

  if (!product || !address || !paymentMethod) {
    return <h2>🚨 Error: Payment details are missing!</h2>;
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setError("");

    if (paymentMethod === "Credit/Debit Card") {
      if (!/^\d{16}$/.test(cardNumber)) {
        setError("❌ Invalid card number. Enter a 16-digit number.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setError("❌ Invalid expiry date. Format: MM/YY.");
        return;
      }
      if (!/^\d{3}$/.test(cvv)) {
        setError("❌ Invalid CVV. Enter a 3-digit number.");
        return;
      }
      setShowOtpField(true);
    } else if (paymentMethod === "UPI") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+$/.test(upiId)) {
        setError("❌ Invalid UPI ID. Format: example@upi.");
        return;
      }
      setPaymentProcessing(true);
      setTimeout(() => {
        navigate("/order-summary", { state: { product, address, paymentMethod, userId } });
      }, 3000);
    } else if (paymentMethod === "Cash on Delivery") {
      navigate("/order-summary", { state: { product, address, paymentMethod, userId } });
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp)) {
      setError("❌ Invalid OTP. Enter a 6-digit code.");
      return;
    }
    navigate("/order-summary", { state: { product, address, paymentMethod, userId } });
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <p><strong>Product:</strong> {product?.name || "Unknown"} - ${product?.price || "N/A"}</p>

      {/* ✅ Fixed Address Rendering */}
      <p>
        <strong>Delivery Address:</strong>{" "}
        {address
          ? `${address.street}, ${address.city}, ${address.state} - ${address.zipCode}`
          : "❌ Address details missing"}
      </p>

      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      {error && <p className="error">{error}</p>}

      {paymentMethod === "Credit/Debit Card" && !showOtpField && (
        <form onSubmit={handlePayment}>
          <label>Card Number:</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength="16" required />

          <label>Expiry Date:</label>
          <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" required />

          <label>CVV:</label>
          <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength="3" required />

          <button type="submit">Proceed</button>
        </form>
      )}

      {showOtpField && (
        <form onSubmit={handleOtpSubmit}>
          <label>Enter OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" required />

          <button type="submit">Confirm Payment</button>
        </form>
      )}

      {paymentMethod === "UPI" && !paymentProcessing && (
        <form onSubmit={handlePayment}>
          <label>Enter UPI ID:</label>
          <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} required />

          <button type="submit">Proceed with UPI</button>
        </form>
      )}

      {paymentMethod === "Cash on Delivery" && (
        <button className="cod-button" onClick={handlePayment}>
          Confirm Order (COD)
        </button>
      )}

      {paymentProcessing && <p>🔄 Payment request sent... Waiting for confirmation.</p>}
    </div>
  );
};

export default Payment;
