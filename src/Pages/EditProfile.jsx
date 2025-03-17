import React, { useState, useEffect } from "react";
import supabase from "../Config/supabase"; // Import Supabase config
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(data?.user);
        setName(data?.user?.user_metadata?.name || "");
        setAddress(data?.user?.user_metadata?.address || "");
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { name, address }, // Update name & address
    });

    if (error) {
      alert("Error updating profile:", error.message);
    } else {
      alert("Profile updated successfully!");
      navigate("/profile"); // Redirect back to profile
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {user ? (
        <form>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Address:</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />

          <button type="button" onClick={handleUpdate}>Save Changes</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProfile;
