import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Features/Cart/cartSlice";
import { supabase } from "../Config/supabaseClient";
import "../Components/Shop/shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [priceRange, setPriceRange] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Prevent refetching data
    const isFetched = useRef(false);

    const fetchProducts = useCallback(async () => {
        if (isFetched.current) return;
        isFetched.current = true;
    
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("id", { ascending: true });
    
        if (error) {
            console.error("❌ Error fetching products:", error);
            return;
        }
    
        setProducts(data);
        setBrands([...new Set(data.map((product) => product.brand || "Unknown"))]); // Handle null brands
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return (
                (!selectedBrand || product.brand === selectedBrand) &&
                (!priceRange || (
                    product.price >= Number(priceRange.split("-")[0]) &&
                    product.price <= Number(priceRange.split("-")[1])
                ))
            );
        });
    }, [products, selectedBrand, priceRange]);

    const handleAddToCart = (product) => {
        if (!product || !product.id) {
            console.error("❌ Product is undefined or missing ID!");
            return;
        }
    
        console.log("🛒 Add to Cart clicked!", product);
    
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image_url: product.image_url,
        }));
    };

    return (
        <div className="shop-container">
            <div className="filter-sidebar">
                <h3>Filter Products</h3>
                <label>Brand:</label>
                <select onChange={(e) => setSelectedBrand(e.target.value)} value={selectedBrand}>
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>

                <label>Price Range:</label>
                <select onChange={(e) => setPriceRange(e.target.value)} value={priceRange}>
                    <option value="">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                </select>
            </div>

            <div className="products-section">
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img
    src={product.image_url}
    alt={product.name}
    className="product-image"
    onError={(e) => { e.target.src = "https://via.placeholder.com/200"; }}
/>
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-price">${product.price}</p>

                            {/* ✅ Fixed `to` prop syntax */}
                            <Link to={`/product/${product.id}`} className="buy-now-btn">
                                Buy Now
                            </Link>

                            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
