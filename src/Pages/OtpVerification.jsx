import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, address, paymentMethod } = location.state || {};

  const [otp, setOtp] = useState("");

  if (!product) return <h2>🚨 Error: Missing checkout details</h2>;

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    alert("Payment Successful!");
    navigate("/order-summary", { state: { product, address, paymentMethod } });
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <form onSubmit={handleOtpSubmit}>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        <button type="submit">Confirm Payment</button>
      </form>
    </div>
  );
};

export default OtpVerification;
