import { supabase } from "./supabaseClient";

export const searchProducts = async (query) => {
    if (!query) return [];

    const { data, error } = await supabase
        .from("products")
        .select("id, name")
        .ilike("name", query); // ✅ Case-insensitive exact match

    if (error) {
        console.error("Error fetching products:", error);
        return [];
    }
    return data;
};
