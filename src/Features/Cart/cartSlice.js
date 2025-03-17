import { createSlice } from "@reduxjs/toolkit";
import { saveGuestCart, clearGuestCart, getGuestCart } from "../../Utils/session"; 
import { 
    syncCartWithSupabase, 
    addItemToSupabaseCart, 
    removeItemFromSupabaseCart, 
    updateSupabaseCartQuantity 
} from "../../Config/cartService"; 

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("guest_cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
    items: loadCartFromStorage(),
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("🛒 Redux Action: Adding to cart →", action.payload);
            
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            let updatedCart;

            if (existingItemIndex !== -1) {
                updatedCart = state.items.map((item, index) => 
                    index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...state.items, { 
                    id: action.payload.id, 
                    name: action.payload.name, 
                    price: action.payload.price, 
                    image_url: action.payload.image_url, 
                    quantity: 1 
                }];
            }

            state.items = updatedCart;
            saveGuestCart(state.items);

            console.log("📦 Updated Cart State:", state.items);

            // If user is logged in, save to Supabase
            const userId = action.payload.userId; 
            if (userId) {
                addItemToSupabaseCart(userId, action.payload.id, 1);
            }
        },

        removeFromCart: (state, action) => {
            console.log("❌ Removing from cart:", action.payload);
        
            // Filter out the removed item
            state.items = state.items.filter(item => item.id !== action.payload);
        
            console.log("📦 Updated Cart after remove:", JSON.parse(JSON.stringify(state.items)));
        
            // Save updated cart in local storage (for guests)
            saveGuestCart(state.items);
        },
        

        updateQuantity: (state, action) => {
            console.log("🔄 Updating quantity:", action.payload);

            const { productId, quantity, userId } = action.payload;
            state.items = state.items.map(item => 
                item.id === productId ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
            );

            saveGuestCart(state.items);
            console.log("📦 Cart after quantity update:", state.items);

            // If user is logged in, update in Supabase
            if (userId) {
                updateSupabaseCartQuantity(userId, productId, quantity);
            }
        },

        setCart: (state, action) => {
            console.log("✅ Setting cart from Supabase:", action.payload);
            state.items = action.payload;
            saveGuestCart(state.items);
        },

        clearCart: (state) => {
            console.log("🗑️ Clearing cart...");
            state.items = [];
            clearGuestCart();
        },

        mergeGuestCartWithSupabase: (state, action) => {
            const { userId, userCart } = action.payload;
            const guestCart = getGuestCart();
            
            console.log("🔄 Merging guest cart with Supabase cart...");
            console.log("👤 User Cart (Supabase):", userCart);
            console.log("🛒 Guest Cart:", guestCart);

            const mergedCart = [...userCart];

            guestCart.forEach((guestItem) => {
                const existingItem = mergedCart.find(item => item.id === guestItem.id);
                if (existingItem) {
                    existingItem.quantity += guestItem.quantity;
                } else {
                    mergedCart.push(guestItem);
                }
            });

            console.log("✅ Merged Cart:", mergedCart);

            state.items = mergedCart;
            if (userId) {
                syncCartWithSupabase(userId, mergedCart);
            }
            clearGuestCart();
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, setCart, clearCart, mergeGuestCartWithSupabase } = cartSlice.actions;
export default cartSlice.reducer;
