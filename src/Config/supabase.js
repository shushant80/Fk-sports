// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "process.env.https://fdrwqiyrsyfsbwqisrsv.supabase.co"; 
// const supabaseAnonKey = "process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcndxaXlyc3lmc2J3cWlzcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODY3MjEsImV4cCI6MjA1NjY2MjcyMX0.7bvqXwl5vtKladqXqc03xhEIWZ14FX0vwn1469AkQLg";

// const supabase = createClient(supabaseUrl, supabaseAnonKey, {
//   auth: { persistSession: true }, // ✅ Keeps user logged in
// });

// export default supabase;


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fdrwqiyrsyfsbwqisrsv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcndxaXlyc3lmc2J3cWlzcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODY3MjEsImV4cCI6MjA1NjY2MjcyMX0.7bvqXwl5vtKladqXqc03xhEIWZ14FX0vwn1469AkQLg";

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true }, // ✅ Keeps user logged in
});

export default supabase;

// const { createClient } = require("@supabase/supabase-js");

// const SUPABASE_URL = "https://fdrwqiyrsyfsbwqisrsv.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcndxaXlyc3lmc2J3cWlzcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODY3MjEsImV4cCI6MjA1NjY2MjcyMX0.7bvqXwl5vtKladqXqc03xhEIWZ14FX0vwn1469AkQLg";

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// module.exports = supabase;


// const { createClient } = require("@supabase/supabase-js");

// // ⬇️ Replace these with your actual Supabase project credentials
// const SUPABASE_URL = "https://fdrwqiyrsyfsbwqisrsv.supabase.co";
// const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcndxaXlyc3lmc2J3cWlzcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODY3MjEsImV4cCI6MjA1NjY2MjcyMX0.7bvqXwl5vtKladqXqc03xhEIWZ14FX0vwn1469AkQLg";

// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// export default supabase;