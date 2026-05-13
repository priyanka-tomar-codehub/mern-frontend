import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `https://collegemarketplace.onrender.com/uploads/${encodeURIComponent(image)}`;
};

function Home() {


const [products, setProducts] = useState([]);
const [category, setCategory] = useState("");

useEffect(() => {
fetchProducts();
}, []);

const fetchProducts = async () => {
const res = await axios.get("https://collegemarketplace.onrender.com/api/products");
setProducts(res.data);
};



const finalProducts = products.filter((product) => {
  return category ? product.category === category : true;

});


return (
  <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 grid gap-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 sm:grid-cols-[1.4fr_0.8fr] sm:items-center">
        <div>
          
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">All Products</h1>
          
        </div>

        <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">Filter</p>
            <p className="text-xs text-slate-500">Select a category</p>
          </div>

          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-transparent bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 sm:w-64"
          >
            <option value="">All</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Laptop">Laptop</option>
            <option value="Notes">Notes</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {finalProducts.map((product) => (
          <div
            key={product._id}
            className="overflow-hidden rounded-[2rem] bg-white p-5 shadow-lg shadow-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="overflow-hidden rounded-[1.75rem] bg-slate-100">
              <img
                src={
                  product.image
                    ? getImageUrl(product.image)
                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23e2e8f0'/%3E%3Ctext x='200' y='130' fill='%23717c8a' font-family='Arial,sans-serif' font-size='20' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E"
                }
                alt={product.title || "Product image"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23e2e8f0'/%3E%3Ctext x='200' y='130' fill='%23717c8a' font-family='Arial,sans-serif' font-size='20' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                }}
                className="h-52 w-full object-cover"
              />
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
                <p className="mt-2 text-sm font-semibold text-indigo-600">₹ {product.price}</p>
              </div>

              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{product.category}</p>

              <div className="flex items-center justify-between gap-3 pt-4">

                <Link to={`/product/${product._id}`}>
                  <button className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                    View
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Home;
