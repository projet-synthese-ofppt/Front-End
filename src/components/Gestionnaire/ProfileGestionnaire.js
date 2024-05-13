import './ProfileGestionnaire.css'
 import { useState,useEffect } from "react";
 import { useNavigate, useParams } from 'react-router-dom';
 import axios from 'axios';

 
 function ProfileGestionnaire(){
  
    const navigate = useNavigate();
    
    const userId=useParams().id;
    const [formData1, setFormData1] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        img:'',
    });
    
const [img2,setimg2]=useState();
   
    const [message,setmessage]=useState();
      console.log("ready")
    
    useEffect(() => {
      const checkAuthentification = async () => {
        try {
          const token = localStorage.getItem('token');
         
          if (!token) {
            navigate("/loginAdmin");
          }
           console.log(token)
        } catch (err) {
          console.log("Error checking authentication", err);
          navigate("/loginAdmin");
        }
       
      };
      checkAuthentification(); 
      

      const fetchData = async () => {
        try {
           console.log("getting information")
          const response = await axios.get(`http://localhost:3002/api/Profile/${userId}`);
           console.log(response.data.data)
          setFormData1({firstName: response.data.data.first_name,   lastName: response.data.data.last_name,
            email:  response.data.data.login, password: response.data.data.password});
            setFormData1(prevState => ({
                ...prevState,
                img: response.data.data.image             }));
      
          
          
     
       
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
        setFormData1(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        // let valid = true;
        // const newErrors = { ...errors };
        // if (!formData1.firstName.trim()) {
        //     newErrors.firstName = 'First name is required';
        //     valid = false;
        // } else {
        //     newErrors.firstName = '';
        // }
        // if (!formData1.lastName.trim()) {
        //     newErrors.lastName = 'Last name is required';
        //     valid = false;
        // } else {
        //     newErrors.lastName = '';
        // }
        // if (!formData1.email.trim()) {
        //     newErrors.email = 'Email is required';
        //     valid = false;
        // } else if (!/\S+@\S+\.\S+/.test(formData1.email)) {
        //     newErrors.email = 'Invalid email address';
        //     valid = false;
        // } else {
        //     newErrors.email = '';
        // }
        // if (!formData1.password.trim()) {
        //     newErrors.password = 'Password is required';
        //     valid = false;
        // } else if (formData1.password.length < 6) {
        //     newErrors.password = 'Password must be at least 6 characters';
        //     valid = false;
        // } else {
        //     newErrors.password = '';
        // }
       

      
        // if (valid) {
           
          
            // if(formData1.img===undefined && img2===undefined){
            //     newErrors.image="please insert a picture";
                
            // }
            //     console.log(img2)
            //    console.log(formData1.img);
            //  if(img2)
            //       {  
                   const formDataToSend = new FormData();
                   console.log("going to update2");
                   console.log(formData1)
                    
                   formDataToSend.append('userId', userId);
                   formDataToSend.append('firstName', formData1.firstName);
                   formDataToSend.append('lastName', formData1.lastName);
                   formDataToSend.append('email', formData1.email);
                   formDataToSend.append('password', formData1.password);
                   formDataToSend.append('image', img2);
                   formDataToSend.append('imageOldPath', formData1.img);
               
                   
                

                   const response2= await axios.post('http://localhost:3002/api/Profile/:id',formDataToSend,{ headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                });
                   setmessage(response2.data.message)
                   
                    console.log("should be updated")
        // }
        //     else{
                    
            //  const Datatosend2=[ userId,formData1.firstName, formData1.lastName,formData1.email,formData1.password,formData1.img]
            //  console.log(Datatosend2);
            //        const response2= await axios.post('http://localhost:3002/api/Profile/:id',Datatosend2);
            //        setmessage(response2.data.message)
                   
            //         console.log("should be updated")
                //    }
                    
                
            
           
        // };
        // setErrors(newErrors);
      
        
    };
    
    return(<div className='div1'>
  
    <div className='div2'>
        <h1>Profile Gestionnaire</h1>
        {message &&<p style={{ backgroundColor: 'lightblue', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' ,width:"80%",textAlign:"center"}}>{message}</p>}
    <main className='Profilemain'>
       <div className='imageprofile'><img src={img2 ? URL.createObjectURL(img2) : formData1.img?`http://localhost:3002/uploads/${formData1.img}`  :'profile 1.png'}  width="300px" alt="profile"/> <input type='file' onChange={(e)=>setimg2(e.target.files[0])}/>{errors.image && <div className="invalid-feedback">{errors.image}</div>}</div> 
    <form onSubmit={handleSubmit} className='Profileform'>
        <div className='Profilegroup'>
    <label htmlFor="firstName" className="Profilelabel">Prénom</label>
                            <input
                                type="text"
                                className="Profilecontrol"
                                id="firstName"
                                name="firstName"
                                value={formData1.firstName}
                                onChange={handleChange}
                                required
                                placeholder='Prénom'
                            />
                            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}</div>
                            <div className='Profilegroup'>
                            <label htmlFor="lastName" className="Profilelabel">Nom</label>
                            <input
                                type="text"
                                className="Profilecontrol"
                                id="lastName"
                                name="lastName"
                                value={formData1.lastName}
                                onChange={handleChange}
                                required
                                placeholder='Nom'
                            />
                            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}</div>
                            <div className='Profilegroup'>
                            <label htmlFor="email" className="Profilelabel">Login</label>
                            <input
                                type="email"
                                className="Profilecontrol"
                                id="email"
                                name="email"
                                value={formData1.email}
                                onChange={handleChange}
                                required
                                placeholder='Login'
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}</div>
                            <div className='Profilegroup'>
                            <label htmlFor="password" className="Profilelabel">Mot de passe</label>
                            <input
                                type="password"
                                className="Profilecontrol"
                                id="password"
                                name="password"
                                value={formData1.password}
                                onChange={handleChange}
                                required
                                placeholder='Mot de passe'
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}</div>
                                                    <button type="submit" className="buttonGestion">Valider les changements</button>

        </form></main></div></div>);
 }
 export default ProfileGestionnaire;