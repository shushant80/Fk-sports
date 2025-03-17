import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"; // Import CSS

const Product = ({ products }) => {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));

    if (!product) return <h2>Product Not Found</h2>;

    return (
        <div className="product-details-container">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-price">${product.price}</p>
                <p className="product-description">{product.description}</p>
                <button className="buy-now-button">Buy Now</button>
            </div>
        </div>
    );
};

export default Product;
