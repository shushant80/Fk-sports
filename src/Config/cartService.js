import { supabase } from "./supabaseClient";  // ✅ Correct relative path


// ✅ Add or update item in Supabase cart
export const addItemToSupabaseCart = async (userId, productId, quantity = 1, sessionId = null) => {
    console.log("📡 Adding item to Supabase cart →", { userId, productId, quantity, sessionId });

    if (!userId && !sessionId) {
        console.error("❌ No userId or sessionId available. Cannot add to Supabase.");
        return;
    }

    // Check if the item already exists
    const { data: existingItem, error: fetchError } = await supabase
        .from("cart")
        .select("quantity")
        .eq("product_id", productId)
        .eq(userId ? "user_id" : "session_id", userId || sessionId)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") {  
        console.error("❌ Error checking existing cart item:", fetchError);
        return;
    }

    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

    // Insert or update item in cart
    const { data, error } = await supabase
        .from("cart")
        .upsert([{ 
            user_id: userId || null, 
            session_id: sessionId || null, 
            product_id: productId, 
            quantity: newQuantity 
        }], { onConflict: ["user_id", "product_id"] });

    if (error) {
        console.error("❌ Error adding/updating item in Supabase cart:", error);
    } else {
        console.log("✅ Item added/updated in Supabase cart:", data);
    }
};


// ✅ Remove item from Supabase cart
export const removeItemFromSupabaseCart = async (userId, productId, sessionId = null) => {
    console.log("🗑️ Removing item from Supabase cart →", { userId, productId, sessionId });

    const identifierColumn = userId ? "user_id" : "session_id";
    const identifierValue = userId || sessionId;

    const { error } = await supabase
        .from("cart")
        .delete()
        .eq("product_id", productId)
        .eq(identifierColumn, identifierValue);

    if (error) {
        console.error("❌ Error removing item from Supabase cart:", error);
    } else {
        console.log("✅ Item removed from Supabase cart:", { productId });
    }
};

// ✅ Update item quantity in Supabase cart
export const updateSupabaseCartQuantity = async (userId, productId, quantity, sessionId = null) => {
    console.log("🔄 Updating cart quantity →", { userId, productId, quantity, sessionId });

    if (quantity <= 0) {
        return removeItemFromSupabaseCart(userId, productId, sessionId);
    }

    const identifierColumn = userId ? "user_id" : "session_id";
    const identifierValue = userId || sessionId;

    const { error } = await supabase
        .from("cart")
        .update({ quantity })
        .eq("product_id", productId)
        .eq(identifierColumn, identifierValue);

    if (error) {
        console.error("❌ Error updating quantity in Supabase cart:", error);
    } else {
        console.log("✅ Quantity updated in Supabase cart:", { productId, quantity });
    }
};

// ✅ Sync local cart with Supabase (bulk upsert instead of multiple calls)
export const syncCartWithSupabase = async (userId, cartItems, sessionId = null) => {
    console.log("🔄 syncCartWithSupabase called!", { userId, cartItems, sessionId });

    if (!cartItems.length) {
        console.warn("⚠️ No items in cart, skipping sync.");
        return;
    }

    const upsertData = cartItems.map(item => ({
        user_id: userId || null,
        session_id: sessionId || null,
        product_id: item.id,
        quantity: item.quantity
    }));

    console.log("📡 Sending data to Supabase:", upsertData);

    const { error } = await supabase
        .from("cart")
        .upsert(upsertData, { onConflict: ["user_id", "session_id", "product_id"] });

    if (error) {
        console.error("❌ Supabase error:", error);
    } else {
        console.log("✅ Cart successfully synced to Supabase!");
    }
};

