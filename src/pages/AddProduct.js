import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      await axios.post("https://collegemarketplace.onrender.com/api/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/");
      toast.success("Product added successfully 🛒");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900">Add New Product</h1>
          <p className="mt-2 text-sm text-slate-500">Enter product details and upload an image to list it on the marketplace.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">Product Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-slate-700">Price</label>
              <input
                id="price"
                type="number"
                placeholder="₹ Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="mb-2 block text-sm font-medium text-slate-700">Product Image</label>
            <input
              id="image"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none file:cursor-pointer file:rounded-full file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:hover:bg-indigo-700"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;