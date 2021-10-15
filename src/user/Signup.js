import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';


const Signup = ()=>{

    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    })
    const{name, email, password, success, error} = values;

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

   const clickSubmit = (event)=>{
        event.preventDefault();
        setValues({...values, error:false})
        signup({name, email, password})
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error, success:false});
            }else{
                setValues({
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true
                })
            }
        })
   }


    const signupForm = ()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input value={name} className="form-control" type="text" onChange={handleChange('name')}/>
            </div>
    
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
    const showSuccess = ()=>(
        <div className="alert alert-info" style={{display : success ? '' : 'none'}}>
            <p>New account generated. Kindly <Link to="/signin">Login</Link> to continue</p>
        </div>
        );
    
    return(
    <Layout title="Signup Page"
        description="Signup to Continue to MERN stack Ecommerce App" 
        className="col-md-8 offset-md-2" >
            {showError()}
            {showSuccess()}
            {signupForm()}
       
    </Layout>
    )
}

export default Signup;