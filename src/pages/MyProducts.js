import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("https://collegemarketplace.onrender.com/api/products/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(`https://collegemarketplace.onrender.com/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">My Products</h1>
            <p className="mt-2 text-sm text-slate-500">Manage the products you have listed for sale.</p>
          </div>
          <button
            onClick={() => navigate("/add")}
            className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Add New Product
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div key={product._id} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 shadow-sm">
              <div className="overflow-hidden bg-slate-100">
                <img
                  src={`https://collegemarketplace.onrender.com/uploads/${product.image}`}
                  alt={product.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e2e8f0'/%3E%3Ctext x='150' y='110' fill='%23717c8a' font-family='Arial,sans-serif' font-size='16' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                  className="h-48 w-full object-cover"
                />
              </div>

              <div className="space-y-3 p-5">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{product.title}</h2>
                  <p className="mt-1 text-sm text-slate-500 uppercase tracking-[0.24em]">{product.category || "Uncategorized"}</p>
                </div>
                <p className="text-lg font-semibold text-indigo-600">₹{product.price}</p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate(`/edit/${product._id}`)}
                    className="rounded-2xl border border-indigo-600 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MyProducts;