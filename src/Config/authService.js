import { supabase } from "./supabaseClient";


/** 
 * 🔹 Get Current User Session
 * @returns {Object|null} User object if logged in, otherwise null.
 */
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) return null;
    return data.user;
  } catch (error) {
    console.error("❌ Error in getCurrentUser:", error.message);
    return null;
  }
};

/** 
 * 🔹 Listen to Auth Changes (Auto Refresh UI)
 * @param {function} callback - Function to execute on auth change.
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user || null);
  });
};

/** 
 * 🔹 Login User
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User session data
 */
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error("Invalid email or password.");
    return data;
  } catch (error) {
    console.error("❌ Login error:", error.message);
    throw error;
  }
};

/** 
 * 🔹 Sign Up User (Stores Full Name, Phone, Address & DOB in Metadata)
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} additionalData - Extra user details (fullName, phone, address, dob)
 * @returns {Object} Registered user session
 */
export const signUp = async (email, password, { fullName, phone, address, dob }) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fullName, phone, address, dob }, // Store extra data in Supabase user metadata
      },
    });

    if (error) throw new Error("Could not create account. Try again.");
    return data;
  } catch (error) {
    console.error("❌ Sign-up error:", error.message);
    throw error;
  }
};

/** 
 * 🔹 Logout User
 * @returns {boolean} `true` if logout is successful, `false` otherwise.
 */
export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error("Error logging out. Try again.");

    // ✅ Ensure logout worked by checking if the session is now null
    const checkUser = await getCurrentUser();
    if (!checkUser) {
      console.log("✅ Logout successful.");
      return true;
    } else {
      console.warn("⚠️ Logout might not have fully processed.");
      return false;
    }
  } catch (error) {
    console.error("❌ Logout error:", error.message);
    throw error;
  }
};
