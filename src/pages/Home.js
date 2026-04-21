import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function Home() {
    

const [products, setProducts] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");

useEffect(() => {
fetchProducts();
}, []);

const fetchProducts = async () => {
const res = await axios.get("https://collegemarketplace.onrender.com/api/products");
setProducts(res.data);
};

const filteredProducts = products.filter(product=>
    product.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || product.category === category)
);


return (
<div>

<h1>All Products</h1>


<input
type="text"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
style={{
padding:"8px",
marginBottom:"20px",
width:"250px"
}}
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
>
    
<option value="">All</option>
<option value="Book">Books</option>
<option value="Electronics">Electronics</option>
<option value="Laptop">Laptop</option>
<option value="Notes">Notes</option>
</select>



<div className="products-container">
{filteredProducts.map((product) => (
<div key={product._id} className = "product-card" >



<img 
src={`https://collegemarketplace.onrender.com/uploads/${product.image}`} 
alt=""
className="product-image"
// style={{width:"100%",height:"160px",objectFit:"cover",borderRadius:"10px"}}
/>

<h3>{product.title}</h3>

<p>₹ {product.price}</p>

<p>{product.category}</p>


<Link to={`/product/${product._id}`}>
<button style={{
background:"#2563eb",
color:"white",
border:"none",
padding:"8px 12px",
borderRadius:"6px",
cursor:"pointer"
}}>
View
</button>
</Link>

</div>
))}
</div>

</div>


);
}

export default Home;