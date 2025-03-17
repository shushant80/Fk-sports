import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, signUp } from "../Config/authService";
import { useAuth } from "../Config/AuthContext";
import { getGuestCart, clearGuestCart } from "../Utils/session"; // Import guest cart utilities
import supabase from "../Config/supabase";
import { useDispatch } from "react-redux";
import { addToCart } from "../Features/Cart/cartSlice"; // Import cart actions

const AuthPage = () => {
  const { user, loading, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // For updating Redux store

  // Get redirect URL from query params (e.g., ?redirect=/checkout/123)
  const redirectTo = new URLSearchParams(location.search).get("redirect") || "/";

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Additional fields for Sign Up
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");

  // Redirect if the user is already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, navigate, redirectTo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingSubmit(true);

    try {
      let loggedInUser;
      if (isLogin) {
        loggedInUser = await login(email, password);
      } else {
        loggedInUser = await signUp(email, password, { fullName, phone, address, dob });
      }

      if (!loggedInUser) {
        throw new Error("Authentication failed");
      }

      setUser(loggedInUser);

      // 🔥 Merge Guest Cart after login
      await mergeGuestCart(loggedInUser.id);

      navigate(redirectTo, { replace: true }); // Redirect to the intended page
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // 🔥 Function to Merge Guest Cart with Supabase
  const mergeGuestCart = async (userId) => {
    const guestCart = getGuestCart();
    
    if (guestCart.length === 0) return; // No guest cart, nothing to merge

    try {
      for (const item of guestCart) {
        // Check if the product already exists in user's cart
        const { data: existingItem } = await supabase
          .from("cart")
          .select("id, quantity")
          .eq("user_id", userId)
          .eq("product_id", item.id)
          .single();

        if (existingItem) {
          // If item exists, update quantity
          await supabase
            .from("cart")
            .update({ quantity: existingItem.quantity + item.quantity })
            .eq("id", existingItem.id);
        } else {
          // If item doesn't exist, insert a new row
          await supabase.from("cart").insert([
            {
              user_id: userId,
              product_id: item.id,
              quantity: item.quantity,
            },
          ]);
        }

        // Also update Redux store
        dispatch(
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image_url: item.image_url,
            quantity: item.quantity,
          })
        );
      }

      console.log("✅ Guest cart merged successfully!");
      clearGuestCart(); // Remove guest cart after merging
    } catch (err) {
      console.error("❌ Error merging guest cart:", err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={styles.input}
        />

        {/* Additional fields for Sign Up */}
        {!isLogin && (
          <>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
              style={styles.input}
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
              style={styles.input}
            />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
              style={styles.input}
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              style={styles.input}
            />
          </>
        )}

        <button type="submit" style={styles.button} disabled={loadingSubmit}>
          {loadingSubmit ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
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
  },
  toggleButton: {
    marginTop: "10px",
    backgroundColor: "transparent",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default AuthPage;
