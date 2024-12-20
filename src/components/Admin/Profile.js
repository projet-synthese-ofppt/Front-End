import './Profile.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [id,setId]=useState("")
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        login: '',
        password: ''
    });
    const [message,setMessage]=useState("")
    const [style,setStyle]=useState({})
    useEffect(()=>{
        const getAdminId= async()=>{
            const token = localStorage.getItem('token');
            if (!token) {
              navigate("/Login");
                
            }
            const response=await axios.get("http://localhost:3002/api/admin/profile",{
            headers:{"authorization":`Bearer ${token}`}
             })
             console.log(response.data)
            setId(response.data.person_id)

            setFormData({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            login: response.data.login,
            password: response.data.password,
            });
        }

        getAdminId()
    },[navigate])

    // useEffect(() => {
    //     const checkAuthentification = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) {
    //                 navigate("/loginAdmin");
    //             }
    //         } catch (err) {
    //             console.log("Error checking authentication", err);
    //             navigate("/loginAdmin");
    //         }
    //     };
    //     checkAuthentification(); 

    //     const getAdminProfile= async () => {
    //         try {
    //             console.log(id)
    //             const response = await axios.get(`http://localhost:3002/api/admin/profile/${id}`);
                
    //             setFormData({first_name : response.data.data.first_name, last_name : response.data.data.last_name,
    //             login : response.data.data.login, password : response.data.data.password});
    //         } catch (err) {
    //             console.log(err);
    //         }   
    //     };
    //     getAdminProfile();  
    // },[navigate,id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image:'',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        const newErrors = { ...errors };
        if (!formData.first_name.trim()) {
            newErrors.firstName = 'First name is required';
            valid = false;
        } else {
            newErrors.firstName = '';
        }
        if (!formData.last_name.trim()) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        } else {
            newErrors.lastName = '';
        }
        if (!formData.login.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.login)) {
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
                const DataToSend = {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    login: formData.login,
                    password: formData.password
                };
                const response2 = await axios.post(`http://localhost:3002/api/admin/profile/${id}`, DataToSend);
                console.log(response2);
                setMessage("Le profil a été mis à jour avec succès.");
                setStyle({color:"green",textAlign:"center"})

            } catch (error) {
                setMessage("Erreur lors de la mise à jour du profil ");
                setStyle({color:"red",textAlign:"center"})
            }
        }
        setErrors(newErrors);
    };

    return (
        <div className="containerProfilAdmin">
            <div className="form1-containerProfilAdmin">
                <p style={style}>{message}</p>
                <h2>Profil Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Prénom</label>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required placeholder='prenom'/>
                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div>
                        <label>Nom</label>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required placeholder='nom'/>
                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                    <div>
                        <label>Login</label>
                        <input type="text" name="login" value={formData.login} onChange={handleChange} required placeholder='login'/>
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder='password'/>
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <button type="submit" className="buttonEnregistrer">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;