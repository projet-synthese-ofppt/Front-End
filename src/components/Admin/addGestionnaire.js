
 import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AddGestionnaire.css'
import Sidebar from "../../Sidebar";

function Ajoutergestionnaire() {
  const navigate = useNavigate();
  
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

  }, [navigate]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: null 
});

let datasent=false;
const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image:''
});

const [message,setMessage]=useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};
const handleImageChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0] // Store the selected image file
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
           
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('image', formData.image); // Append the image file to the form data
            
         const response= await axios.post('http://localhost:3002/api/addGestionnaire', formDataToSend, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
            datasent=true;
            setMessage(response.data.message)
            
          } catch (error) {
            console.error('Error submitting form: ', error);
            // Handle error
          }
        }
        if(datasent){
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            image: null 
        });}
        setErrors(newErrors);
    }
   

return(<div className='div1'>

<div className='div2'>

    <h1>Ajouter Gestionnaire</h1>
    {message &&<p style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' ,width:"80%",textAlign:"center"}}>{message}</p>
}
<main>
<div className='image' > <img src={formData.image ? URL.createObjectURL(formData.image) : 'profile 1.png'} width="200px" alt="Preview"/> <input type='file' onChange={handleImageChange}/></div> 
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
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}</div>
                                             <div >  <button type="submit" className="button">Ajouter</button></div> 

    </form></main></div></div>);
}

export default Ajoutergestionnaire;
