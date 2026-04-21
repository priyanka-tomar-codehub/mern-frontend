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
        fetchProduct();
    },[]);

    const fetchProduct =async()=>{
        const res = await axios.get(`https://collegemarketplace.onrender.com/api/products/${id}`);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setCategory(res.data.category);
    };

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
return(
<div>
<h1>Edit Product</h1>

<form onSubmit={handleSubmit}>

<input
type="text"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<br/><br/>

<input
type="number"
value={price}
onChange={(e)=>setPrice(e.target.value)}
/>

<br/><br/>

<input
type="text"
value={category}
onChange={(e)=>setCategory(e.target.value)}
/>

<br/><br/>

<button type="submit">Update</button>

</form>
</div>
);
}

export default EditProduct;