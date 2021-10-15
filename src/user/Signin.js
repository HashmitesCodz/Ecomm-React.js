import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate, isAuthenticated } from '../auth';


const Signin = ()=>{

    const [values, setValues] = useState({
        email:"kail@gmail.com",
        password:"H@$hm!t3$",
        error:"",
        loading:false,
        redirectToReferrer:false
    })
    const{email, password, loading, error, redirectToReferrer} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

   const clickSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, error:false, loading:true})
        signin({email, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error, loading:false});
            }else{
                authenticate(data, ()=>{
                    setValues({
                        redirectToReferrer:true
                     })
                })
            }
        })
   }


    const signupForm = ()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" value={email} className="form-control" onChange={handleChange('email')}/>
            </div>
    
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" value={password} className="form-control" onChange={handleChange('password')}/>
            </div>
    
            <button className="btn btn-warning" onClick={clickSubmit}>Register</button>
        </form>
    );

    const showError = ()=>(
        <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>
            {error}
        </div>
);
    const showLoading = ()=>
        loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
    
    const redirect = ()=>{
        if(redirectToReferrer){
        if(user && user.role === 1){
            return <Redirect to="/admin/dashboard"/>
        }else{
            return <Redirect to="/user/dashboard"/>
        }
    }
    if(isAuthenticated()){
        return <Redirect to="/"/>
    }
    } 
    
    return(
    <Layout title="Signup Page"
        description="Signup to Continue to MERN stack Ecommerce App" 
        className="col-md-8 offset-md-2" >
            {showError()}
            {showLoading()}
            {signupForm()}
            {redirect()}
       
    </Layout>
    )
}

export default Signin;