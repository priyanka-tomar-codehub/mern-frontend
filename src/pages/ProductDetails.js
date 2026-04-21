import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetails() {

const { id } = useParams();
const [product,setProduct] = useState({});
const [recommended,setRecommended] = useState([]);

useEffect(() =>{
    axios.get(
        `https://collegemarketplace.onrender.com/api/products/recommend?category=${product.category}&id=${product._id}`
    )
    .then(res=>setRecommended(res.data))
},[product]);

useEffect(()=>{
fetchProduct();
},[]);

const fetchProduct = async ()=>{
const res = await axios.get(`https://collegemarketplace.onrender.com/api/products/${id}`);
setProduct(res.data);
};

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
{recommended.map(item => (
<div key={item._id}>

<img
src={`https://collegemarketplace.onrender.com/uploads/${item.image}`}
width="150"
/>

<h4>{item.title}</h4>
<p>₹{item.price}</p>

</div>
))}
</div>


</div>
);
}

export default ProductDetails;