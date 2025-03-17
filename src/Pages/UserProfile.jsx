import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Config/supabase"; // Ensure correct Supabase import
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data?.user);
      }
      setLoading(false); // ✅ Stop loading after fetching user
    };

    fetchUser();

    // ✅ Listen for auth state changes (e.g., logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login"); // Redirect to login if user logs out
      }
    });

    return () => authListener.subscription.unsubscribe(); // Cleanup listener
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {/* ✅ Show loading until user data is fetched */}
      {loading ? (
        <p>Loading user data...</p>
      ) : user ? (
        <div className="profile-card">
          {/* ✅ Show profile image if available */}
          {user.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-placeholder">👤</div>
          )}

          <h3>👤 {user.user_metadata?.name || "User"}</h3>
          <p>📧 {user.email}</p>
          <p>🏠 {user.user_metadata?.address || "No address added"}</p>

          {/* Edit Profile Button */}
          <button className="edit-profile-btn" onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>

          {/* ✅ Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>⚠️ No user found. Please log in.</p>
      )}

      {/* Profile Sections */}
      <div className="profile-sections">
        <Link to="/order-history" className="profile-link">📦 Order History</Link>
        <Link to="/wishlist" className="profile-link">❤️ Wishlist</Link>
        <Link to="/address-management" className="profile-link">🏡 Manage Address</Link>
        <Link to="/edit-profile" className="profile-link">✏️ Edit Profile</Link>
      </div>
    </div>
  );
};

export default UserProfile;
