import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, setCart } from "../../Features/Cart/cartSlice";
import { syncCartWithSupabase } from "../../Config/cartService";
import { Link } from "react-router-dom";
import { supabase } from "../../Config/supabaseClient";
import "./ShoppingCart.css";

const ShoppingCart = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth?.user || null);
    const userId = user?.id || null;

    console.log("📦 Current Cart Items in Redux:", cartItems);

    /** 🔽 FETCH CART FROM SUPABASE ON PAGE LOAD */
    useEffect(() => {
        const fetchCart = async () => {
            if (!userId) {
                console.warn("⚠️ No userId found. Skipping cart fetch.");
                return;
            }

            console.log("🔄 Fetching cart from Supabase for user:", userId);

            const { data, error } = await supabase
                .from("cart")
                .select(`
                    product_id,
                    quantity,
                    products (name, price, image_url)
                `)
                .eq("user_id", userId);

            if (error) {
                console.error("❌ Error fetching cart:", error.message);
                return;
            }

            console.log("✅ Cart fetched from Supabase:", data);

            const formattedCart = data.map(item => ({
                id: item.product_id,
                quantity: item.quantity,
                name: item.products?.name || "Unknown Product",
                price: item.products?.price || 0,
                image_url: item.products?.image_url || "",
            }));

            dispatch(setCart(formattedCart));
        };

        fetchCart();
    }, [userId, dispatch]);

    /** 🔽 SYNC CART TO SUPABASE WHEN CART CHANGES */
    useEffect(() => {
        if (!userId) {
            console.warn("⚠️ No userId found, skipping sync.");
            return;
        }
    
        console.log("🔄 Syncing cart with Supabase for user:", userId, cartItems);
    
        syncCartWithSupabase(userId, cartItems)
            .then(() => console.log("✅ Cart successfully synced with Supabase"))
            .catch((error) => console.error("❌ Sync error:", error));
    }, [cartItems, userId]);

    /** 🔽 HANDLE REMOVE FROM CART */
    const handleRemoveFromCart = async (productId) => {
        console.log(`🗑️ Removing item from cart: ${productId}`);
        dispatch(removeFromCart(productId));

        if (!userId) return;

        try {
            const { error } = await supabase
                .from("cart")
                .delete()
                .match({ user_id: userId, product_id: productId });

            if (error) {
                console.error("❌ Error removing item from Supabase:", error);
            } else {
                console.log(`✅ Successfully removed product ${productId} from Supabase.`);
            }
        } catch (err) {
            console.error("🚨 Unexpected error removing from Supabase:", err);
        }
    };

    /** 🔽 CALCULATE TOTAL PRICE */
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                            <img src={item.image_url} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button 
                                    onClick={() => handleRemoveFromCart(item.id)} 
                                    className="remove-button"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="cart-footer">
                    <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    <Link to="/checkout">
                        <button className="checkout-button">Proceed to Checkout</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;
