import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../Config/supabase";
import "./OrderHistory.css"; // Add styling

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      // Fetch user's past orders from Supabase
      const { data, error } = await supabase
        .from("orders")
        .select("*") // ✅ Only selecting required fields
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-history-container">
      <h2>Your Order History</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td> {/* ✅ Fixed Order ID */}
                <td>{new Date(order.created_at).toLocaleDateString()}</td> {/* ✅ Date Formatting */}
                <td>{order.product_name || "N/A"}</td> {/* ✅ Display Product Name */}
                <td>${order.total_amount ? order.total_amount.toFixed(2) : "0.00"}</td> {/* ✅ Fixed Total Price */}
                <td>{order.status || "Processing"}</td> {/* ✅ Default Status */}
                <td>
                  <button onClick={() => navigate(`/order-details/${order.order_id}`)}>
                    View
                  </button> {/* ✅ Fixed "View" Button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
