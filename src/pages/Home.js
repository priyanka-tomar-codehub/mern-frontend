import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



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
<div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md shadow-slate-200 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">CampusMart</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">All Products</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">Browse the latest listings and filter by category to find exactly what you need.</p>
      </div>

      <div className="flex w-full max-w-sm items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm sm:w-auto">
        <label htmlFor="category" className="mr-3 text-sm font-medium text-slate-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-2xl border border-transparent bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All</option>
          <option value="Book">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Laptop">Laptop</option>
          <option value="Notes">Notes</option>
        </select>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {finalProducts.map((product) => (
        <div key={product._id} className="product-card overflow-hidden rounded-3xl bg-white p-5 shadow-lg shadow-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
          <img
            src={`https://collegemarketplace.onrender.com/uploads/${product.image}`}
            alt={product.title}
            className="product-image mb-5 h-52 w-full rounded-3xl object-cover"
          />

          <div className="space-y-3">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
              <p className="mt-2 text-sm font-medium text-indigo-600">₹ {product.price}</p>
            </div>

            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{product.category}</p>

            <div className="flex items-center justify-between gap-3 pt-3">
              <Link
                to={`/product/${product._id}`}
                onClick={() => localStorage.setItem("lastViewed", JSON.stringify(product))}
                className="text-sm font-medium text-slate-700 transition hover:text-indigo-600"
              >
                View details
              </Link>

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