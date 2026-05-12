import React, { useEffect,useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct(){
    const { id } =useParams();
    const navigate = useNavigate();

    const[title,setTitle] = useState("");
    const[price,setPrice] = useState("");
    const[category,setCategory] = useState("");

    useEffect(()=>{
        const fetchProduct = async () => {
         try {
            const res = await axios.get(`https://collegemarketplace.onrender.com/api/products/${id}`);
            setTitle(res.data.title);
            setPrice(res.data.price);
            setCategory(res.data.category);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
        fetchProduct();
    },[id]);

    

    const handleSubmit=async(e)=>{
        e.preventDefault();

        const token = localStorage.getItem("token");

        await axios.put(
        `https://collegemarketplace.onrender.com/api/products/${id}`,
        {title,price,category},
        {
            headers:{
                Authorization:`Bearers ${token}`
            }
        }
        );

        navigate("/my-products");
    };
return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
    <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Edit Product</h1>
        <p className="mt-2 text-sm text-slate-500">Update your product details and save the changes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">Product Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter product title"
          />
        </div>

        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium text-slate-700">Price</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter product price"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-700">Category</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter product category"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </div>
  </div>
);
}

export default EditProduct;