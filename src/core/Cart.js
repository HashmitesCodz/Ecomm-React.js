import React, {useState, useEffect} from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCart } from "./cartHelpers";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = ()=>{
    const [items, setItems] = useState([])


    useEffect(()=>{
        setItems(getCart())
    }, [items]);

    const showItems = items =>{
        return(
            <div>
                <h2>You shopped {`${items.length}`} items </h2>
                <hr/>
               
                {items.map((product, i)=>(
                <Card key={i} product={product} 
                showAddToCartButton={false} 
                cartUpdate={true}
                showRemoveProductButton={true}/>))}
                
            </div>
        )
    }
    const noItemsMessage = () =>(
        <h2>
            Empty Cart? <br/><Link to="/shop">Let's Shop</Link>
        </h2>
    )


    return(
        <Layout title="Shopping Cart" description="Manage your purchases, Add, remove, checkout or continue shopping."
         className="container-fluid">
            
    <div className="row">
        <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemsMessage() }
        </div>

        <div className="col-6">
            <h2>Shopping Summary</h2>
            <Checkout products={items}/>
        </div>
    </div>
    
        </Layout>
        )
}

export default Cart;