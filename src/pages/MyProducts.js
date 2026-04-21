import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyProducts()
{
    const [products,setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
       fetchProducts();
    },[]);

    const fetchProducts = async()=>{
        const token = localStorage.getItem("token");

        const res = await axios.get(
            "https://collegemarketplace.onrender.com/api/products/my",
            {
               headers: {
                Authorization:`Bearer ${token}`
                }
            }
        );
        setProducts(res.data);
    };

    const deleteProduct = async(id)=>{
        const token = localStorage.getItem("token");

        await axios.delete(
            `https://collegemarketplace.onrender.com/api/products/${id}`,
             {
               headers: {
                Authorization:`Bearer ${token}`
                }
            }
        );
        fetchProducts();
    };

    

    return(
        <div>
            <h1>My Products</h1>
            {products.map(product =>(
                <div key={product._id}>
                    <img 
                    src={`https://collegemarketplace.onrender.com/uploads/${product.image}`} 
                    alt=""
                    style={{
                        width:"200px",
                        height:"150px",
                        objectFit:"cover",
                        borderRadius:"8px"
                    }}
                    />
                    <h2>{product.title}</h2>
                    <p>₹{product.price}</p>

                    <button onClick={()=>deleteProduct(product._id)}>
                    Delete
                    </button>

                    <button onClick={()=>navigate(`/edit/${product._id}`)}>
                        Edit
                    </button>
                </div>
            ))}
            
         </div>

    );
}
export default MyProducts;