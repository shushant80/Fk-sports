import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fdrwqiyrsyfsbwqisrsv.supabase.co"; // Replace with your Supabase URL
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcndxaXlyc3lmc2J3cWlzcnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwODY3MjEsImV4cCI6MjA1NjY2MjcyMX0.7bvqXwl5vtKladqXqc03xhEIWZ14FX0vwn1469AkQLg"; // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
