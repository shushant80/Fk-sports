import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve product details from the previous page
  const product = location.state?.product || null;

  // Checkout form states
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!product) {
      navigate("/"); // Redirect if product details are missing
    }
  }, [product, navigate]);

  const handleContinueToPayment = () => {
    if (!street || !city || !state || !zipCode || !paymentMethod) {
      setError("Please enter all address details and select a payment method.");
      return;
    }
    setError(""); // Clear error message

    navigate(`/payment/${id}`, {
      state: {
        product,
        address: { street, city, state, zipCode },
        paymentMethod,
      },
    });
  };

  return (
    <div style={styles.container}>
      <h2>Checkout - Address & Payment</h2>

      {error && <p style={styles.error}>{error}</p>}

      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        placeholder="Street Address"
        required
        style={styles.input}
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
        style={styles.input}
      />
      <input
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder="State"
        required
        style={styles.input}
      />
      <input
        type="text"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        placeholder="ZIP Code"
        required
        style={styles.input}
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        required
        style={styles.select}
      >
        <option value="">Select Payment Method</option>
        <option value="Credit/Debit Card">Credit/Debit Card</option>
        <option value="UPI">UPI</option>
        <option value="Cash on Delivery">Cash on Delivery</option>
      </select>

      <button onClick={handleContinueToPayment} style={styles.button}>
        Continue to Payment
      </button>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default CheckoutPage;
