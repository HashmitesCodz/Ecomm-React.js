import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Home from "./core/Home";
import Dashboard from './user/Dashboard';
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import ManageProducts from './admin/ManageProducts';
import updateProduct from "./admin/updateProduct";

const Routes = ()=>{

    return(
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/product/:productId" exact component={Product}/>
            <Route path="/shop" exact component={Shop}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
            <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
            <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
            <AdminRoute path="/create/category" exact component={AddCategory}/>
            <AdminRoute path="/create/product" exact component={AddProduct}/>
            <AdminRoute path="/admin/orders" exact component={Orders}/>
            <AdminRoute path="/admin/products" exact component={ManageProducts}/>
            <AdminRoute path="/admin/product/update/:productId" exact component={updateProduct}/>
            <Route path="/cart" exact component={Cart}/>
            <PrivateRoute path="/profile/:userId" exact component={Profile}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;