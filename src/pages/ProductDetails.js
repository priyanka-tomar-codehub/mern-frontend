import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";

function ProductDetails() {

const { id } = useParams();
const [product,setProduct] = useState({});
const [recommended,setRecommended] = useState([]);


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

const handleClick = (product) => {
  localStorage.setItem("lastViewed", JSON.stringify(product));
};
const lastViewed = JSON.parse(localStorage.getItem("lastViewed"));

const lastSearch = localStorage.getItem("lastSearch");

const searchBased = recommended.filter((item) =>
  lastSearch
    ? item.title.toLowerCase().includes(lastSearch.toLowerCase())
    : false
);

console.log(lastSearch);
console.log(searchBased);

return (
<div>


<img 
src={`https://collegemarketplace.onrender.com/uploads/${product.image}`} 
alt=""
onError={(e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='250' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%23e2e8f0'/%3E%3Ctext x='200' y='130' fill='%23717c8a' font-family='Arial,sans-serif' font-size='20' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
}}
className="product-image"
/>

<h2>{product.title}</h2>

<p>₹ {product.price}</p>

<p>{product.category}</p>

<p>{product.description}</p>



<h2>Recommended for you</h2>


<div className="products-container">
  {recommended.map((item) => (
    
    <Link
      key={item._id}
      to={`/product/${item._id}`}
      onClick={() => handleClick(item)}
      style={{ textDecoration: "none", color: "black" }}
    >

      <div className="product-card">

        <img
          src={`https://collegemarketplace.onrender.com/uploads/${item.image}`}
          alt=""
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='100' viewBox='0 0 150 100'%3E%3Crect width='150' height='100' fill='%23e2e8f0'/%3E%3Ctext x='75' y='55' fill='%23717c8a' font-family='Arial,sans-serif' font-size='14' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
          width="150"
        />

        <h4>{item.title}</h4>

        <p>₹{item.price}</p>

      </div>

    </Link>
  ))}
</div>

{/* <h2>Based on Your Search</h2> */}

<div className="products-container">
  {searchBased.map((item) => (
    <div key={item._id} className="product-card">

      <img
        src={`https://collegemarketplace.onrender.com/uploads/${item.image}`}
        alt=""
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='100' viewBox='0 0 150 100'%3E%3Crect width='150' height='100' fill='%23e2e8f0'/%3E%3Ctext x='75' y='55' fill='%23717c8a' font-family='Arial,sans-serif' font-size='14' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
        }}
        width="150"
      />

      <h4>{item.title}</h4>

      <p>₹{item.price}</p>

    </div>
  ))}
</div>

{lastViewed && (
  <>
    <h2 className="text-2xl font-bold mt-6">Recently Viewed</h2>

    <div className="product-card">

      <img
        src={`https://collegemarketplace.onrender.com/uploads/${lastViewed.image}`}
        alt=""
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='100' viewBox='0 0 150 100'%3E%3Crect width='150' height='100' fill='%23e2e8f0'/%3E%3Ctext x='75' y='55' fill='%23717c8a' font-family='Arial,sans-serif' font-size='14' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
        }}
        width="150"
      />

      <h4>{lastViewed.title}</h4>

      <p>₹{lastViewed.price}</p>

    </div>
  </>
)}

</div>
);
}

export default ProductDetails;