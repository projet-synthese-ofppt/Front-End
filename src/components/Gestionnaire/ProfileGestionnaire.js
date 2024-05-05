import './ProfileGestionnaire.css'
 import { useState,useEffect } from "react";
 import { useNavigate, useParams } from 'react-router-dom';
 import axios from 'axios';
import Sidebar from '../../Sidebar';

 
 function ProfileGestionnaire(){
    const navigate = useNavigate();
    
    const userId=useParams().id;
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [img,setimg]=useState();
    
    useEffect(() => {
      const checkAuthentification = async () => {
        try {
          const token = localStorage.getItem('token');
         
          if (!token) {
            navigate("/loginAdmin");
          }
        } catch (err) {
          console.log("Error checking authentication", err);
          navigate("/loginAdmin");
        }
      };
      checkAuthentification(); 
      const fetchData = async () => {
        try {
           
          const response = await axios.get(`http://localhost:3002/api/Profile/${userId}`);
        
          setFormData({firstName: response.data.data.first_name,   lastName: response.data.data.last_name,
            email:  response.data.data.login, password: response.data.data.password})
          
          
     
       
        } catch (err) {
          console.log(err);
        }
      };
 
      fetchData();
  
    }, [navigate]);
    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image:'',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        let valid = true;
        const newErrors = { ...errors };
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            valid = false;
        } else {
            newErrors.firstName = '';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        } else {
            newErrors.lastName = '';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        } else {
            newErrors.email = '';
        }
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        } else {
            newErrors.password = '';
        }
       

      
        if (valid) {
            console.log("going to update")
            if(img===undefined){
                newErrors.image="please insert a picture";
                
            }
                console.log("going to update");
               console.log(formData);
                    const DataToSend = [userId,formData.firstName,formData.lastName, formData.email,
                   formData.password,img] 
                    console.log(DataToSend)
                   const response2= await axios.post('http://localhost:3002/api//Profile/:id',DataToSend);
                    console.log(response2)
                    console.log("should be updated")
                    
                
            
           
        }; setErrors(newErrors);
    };
    return(<div className='div1'>
   <Sidebar/>
    <div className='div2'>
        <h1>Profile Gestionnaire</h1>
    <main>
       <div className='image'><img src={img=== undefined ?'media/profile 1.png': img} width="300px" alt="profile"/> <input type='file' onChange={(e)=>setimg(e.target.value)}/>{errors.image && <div className="invalid-feedback">{errors.image}</div>}</div> 
    <form onSubmit={handleSubmit}>
        <div>
    <label htmlFor="firstName" className="label">Prénom</label>
                            <input
                                type="text"
                                className="control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                placeholder='Prénom'
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}</div>
                            <div>
                            <label htmlFor="lastName" className="label">Nom</label>
                            <input
                                type="text"
                                className="control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder='Nom'
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}</div>
                            <div>
                            <label htmlFor="email" className="label">Login</label>
                            <input
                                type="email"
                                className="control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='Login'
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
                            <div>
                            <label htmlFor="password" className="label">Mot de passe</label>
                            <input
                                type="password"
                                className="control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder='Mot de passe'
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}</div>
                                                    <button type="submit" className="buttonGestion">Valider les changements</button>

        </form></main></div></div>);
 }
 export default ProfileGestionnaire;