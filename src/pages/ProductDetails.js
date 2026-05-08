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
return (
<div>


<img 
src={`https://collegemarketplace.onrender.com/uploads/${product.image}`} 
alt=""
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
          width="150"
        />

        <h4>{item.title}</h4>

        <p>₹{item.price}</p>

      </div>

    </Link>
  ))}
</div>

<h2>Based on Your Search</h2>

<div className="products-container">
  {searchBased.map((item) => (
    <div key={item._id} className="product-card">

      <img
        src={`https://collegemarketplace.onrender.com/uploads/${item.image}`}
        alt=""
        width="150"
      />

      <h4>{item.title}</h4>

      <p>₹{item.price}</p>

    </div>
  ))}
</div>

{lastViewed && (
  <>
    <h2>Recently Viewed</h2>

    <div className="product-card">

      <img
        src={`https://collegemarketplace.onrender.com/uploads/${lastViewed.image}`}
        alt=""
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