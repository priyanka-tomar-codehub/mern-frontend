import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `https://collegemarketplace.onrender.com/uploads/${encodeURIComponent(image)}`;
};

function ProductDetails() {

const { id } = useParams();
const [product,setProduct] = useState({});
const [recommended,setRecommended] = useState([]);
const [recentlyViewed, setRecentlyViewed] = useState([]);
const [message, setMessage] = useState("");


useEffect(() => {
    const fetchProduct = async () => {
        try {
            const res = await axios.get(`https://collegemarketplace.onrender.com/api/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchProduct();
}, [id]);

useEffect(() =>{
    if (product?._id) {
    axios.get(
        `https://collegemarketplace.onrender.com/api/products/recommend?category=${product.category}&id=${product._id}`
    )
    .then(res=>setRecommended(res.data))
    .catch(err => console.error(err));
}
},[product]);
useEffect(() => {
  if (product?._id) {
    let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    viewed = viewed.filter((item) => item._id !== product._id);

    viewed.unshift(product);

    viewed = viewed.slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));

    setRecentlyViewed(viewed);
  }
}, [product]);

// const handleClick = (product) => {
//   localStorage.setItem("lastViewed", JSON.stringify(product));
// };

const handleBuyNow = async () => {
  if (!product?._id) {
    toast.error("Product not loaded yet.");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You must be logged in to place an order.");
    return;
  }

  try {
    await axios.post(
      "https://collegemarketplace.onrender.com/api/orders",
      {
        productId: product._id,
        message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
   
    toast.success("Order placed successfully!");

    window.open(
      `https://wa.me/91${product.phone}`,
      "_blank"
    );
  } catch (error) {
    console.error("Order creation failed:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to place order");
  }
};

// const lastViewed = JSON.parse(localStorage.getItem("lastViewed"));

const lastSearch = localStorage.getItem("lastSearch");

const searchBased = recommended.filter((item) =>
  lastSearch
    ? item.title.toLowerCase().includes(lastSearch.toLowerCase())
    : false
);

console.log(lastSearch);
console.log(searchBased);

return (
  <div className="min-h-screen bg-slate-100 px-4 py-10">
    <div className="mx-auto max-w-7xl space-y-10">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
          <div className="overflow-hidden rounded-[1.75rem] bg-slate-100">
            <img
              src={getImageUrl(product.image)}
              alt={product.title || "Product image"}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect width='800' height='500' fill='%23e2e8f0'/%3E%3Ctext x='400' y='260' fill='%23717c8a' font-family='Arial,sans-serif' font-size='24' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
              }}
              className="h-[400px] w-full object-contain bg-white"
            />
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">{product.title}</h1>
                <p className="mt-2 text-sm text-slate-500 uppercase tracking-[0.24em]">{product.category || "Uncategorized"}</p>
              </div>
              {/* <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                ₹ {product.price}
              </span> */}
              <div className="flex gap-3 items-center">
                {product.isSold && (
                  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                    SOLD
                  </span>
                )}

                <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  ₹ {product.price}
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-slate-50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">Product Description</h2>
              <p className="text-slate-600">{product.description || "No description available."}</p>
            </div>

            <div className="rounded-[1.5rem] bg-slate-50 p-6">
              <h2 className="mb-3 text-xl font-semibold text-slate-900">Buy Now</h2>
              <textarea
                placeholder="Optional message to seller..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 mb-4"
                rows="3"
              />
              {/* <button
                onClick={handleBuyNow}
                className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
              >
                Contact Seller & Buy Now
              </button> */}
              <button
                onClick={handleBuyNow}
                disabled={product.isSold}
                className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition
                ${
                  product.isSold
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                }`}
              >
                {product.isSold ? "Product Sold" : "Contact Seller & Buy Now"}
            </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {recentlyViewed.length > 0 && (
  <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
    <h2 className="mb-4 text-xl font-semibold text-slate-900">
      Recently Viewed
    </h2>

    <div className="space-y-4">
      {recentlyViewed.map((item) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          className="flex items-start gap-4"
        >
          <img
            src={getImageUrl(item.image)}
            alt={item.title}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='100' viewBox='0 0 150 100'%3E%3Crect width='150' height='100' fill='%23e2e8f0'/%3E%3Ctext x='75' y='55' fill='%23717c8a' font-family='Arial,sans-serif' font-size='14' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
            className="h-24 w-24 rounded-[1.5rem] object-cover"
          />

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  ₹{item.price}
                </p>
              </div>
            </Link>
          ))}
    </div>
  </div>
)}

          {searchBased.length > 0 && (
            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="mb-4 text-xl font-semibold text-slate-900">Search Related</h2>
              <div className="space-y-4">
                {searchBased.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='80' viewBox='0 0 100 80'%3E%3Crect width='100' height='80' fill='%23e2e8f0'/%3E%3Ctext x='50' y='45' fill='%23717c8a' font-family='Arial,sans-serif' font-size='12' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                      }}
                      className="h-20 w-20 rounded-[1.5rem] object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-500">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {recommended.length > 0 && (
        <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">Recommended for you</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {recommended.map((item) => (
              <Link
                key={item._id}
                to={`/product/${item._id}`}
                // onClick={() => handleClick(item)}
                className="block rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 transition hover:shadow-lg"
              >
                <div className="overflow-hidden rounded-[1.5rem] bg-slate-100">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='180' viewBox='0 0 300 180'%3E%3Crect width='300' height='180' fill='%23e2e8f0'/%3E%3Ctext x='150' y='95' fill='%23717c8a' font-family='Arial,sans-serif' font-size='14' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                    className="h-40 w-full object-contain bg-white"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-500">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default ProductDetails;