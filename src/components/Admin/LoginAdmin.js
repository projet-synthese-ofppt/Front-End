import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function LoginAdmin() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({username:'',password:''});

const navigate=useNavigate()

  const validateForm = async (e) => {
    e.preventDefault();
    let valid=true;
    const Errors = {...errors};
    if (!username.trim()) {
      Errors.username = 'Username is required';
      valid=false;
    }else{
        Errors.username=''
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
      valid=false;
    }else{
        Errors.password='';
    }
    setErrors(Errors);
    if (valid) {
        
       await axios.post("http://localhost:3002/api/Adminlogin",{username,password})
       .then((res)=>{
          const token=res.data.token
          localStorage.setItem('token',token);
          navigate('/addGestionnaire')
       })
       .catch((err)=>{
          console.log(err)
       });
        
      
      }
    
    
  };

  
   

    return (
        <section className='Loginsection'>
        
            <div className='logopic'><img src='ofppt.png' /></div>
          
                
                    
                        <div className="formContainer">
                            <h1 >Se connecter</h1>
                            <form onSubmit={validateForm} className='Loginform'>
                                <input type="text" className="form-control my-4 py-2" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
                                <input type="password" className="form-control my-4 py-2" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                  <span className='.Loginspan'>Mot de passe oublié?</span>
                                    <button className="logbutton">Login</button>
                                    
                                
                            </form>
                        </div>
                  
                
           
        
    </section>
        
    );
}

export default LoginAdmin;
