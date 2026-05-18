import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://collegemarketplace.onrender.com/api/orders/my", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">My Orders</h1>
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{order?.product?.title  || "Product Deleted"}</h2>
                  <p className="text-sm text-slate-500">Seller: {order?.seller?.name || order?.seller?.email || "Unknown Seller"}</p>
                  <p className="text-sm text-slate-500">Status: {order.status}</p>
                  <p className="text-lg font-semibold text-indigo-600">₹{order.price}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              {order.message && <p className="mt-4 text-slate-600">Message: {order.message}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;