import React, { useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin'
const ManageProducts = ()=>{

    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () =>{
        getProducts().then(data=>{
            if(data.error){
                console.log(error)
            }else{
                setProducts(data)
            }
        })
    }

    const destroyProduct = productId =>{
        deleteProduct(productId, user._id, token)
        .then(data=>{
            if(data.error){
                console.log(error)
            }else{
                loadProducts()
            }
        })
    }

    useEffect(()=>{
        loadProducts();
    }, [])


       return(

    <Layout title="Manage Products" description="Products Management Section"
     className="container-fluid">

         <div className="row">
             <div className="col-12">
                 <h2 className="text-center">
                     Total {products.length} products
                 </h2>
                 <hr/>
                 <ul className="list-group">
                {products.map((p, i)=>(
                    <li key={i} 
                    className="list-group-item d-flex
                     justify-content-between align-items-center">
                    <strong>{p.name}</strong>
                    <Link to={`/admin/product/update/${p._id}`}>
                        <span
                        className="badge badge-warning badge-pill">Update</span>
                    </Link>  
                    <span onClick={()=> destroyProduct(p._id)}
                    className="badge badge-danger badge-pill">Delete</span>   
                     </li>
                ))}
                 </ul>
             </div>
         </div>
   


    </Layout>
    )
}

export default ManageProducts;