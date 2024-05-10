import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export default function GestionnaireLogin() {

    const navigate = useNavigate();

    // les variables
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email:'',password:''});


    // validation 

    const validation = async (e) =>{
        e.preventDefault();

        let valid = true
        const Errors = {...errors};
        if(!email.trim()){
            Errors.email = "entrer votre email"
            valid = false 
        }
        else{
            Errors.username = ""
        }

        if (!password.trim()) {
          Errors.password = "entrer votre mot de passe";
          valid = false;
        } else {
          Errors.password = "";
        }
        setErrors(Errors);

        if(valid){
         
            await axios.post("http://localhost:3002/api/GestionnaireLogin",{email,password})
              .then((res) => {
                const token = res.data.token;
                localStorage.setItem("token", token);
                navigate("/Creation_Formation");
                console.log(token);
              })
              .catch((err) => {
                console.log(err);
              });
        }
    }
    
    
    
    return (
      <>
        <section>
          <h1>se connecter</h1>
          <form onSubmit={validation}>
            <label htmlFor="email"> Email : </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="email"
              onChange={(e) => setemail(e.target.value)}
            />
            {errors.email}

            <label htmlFor="password"> mot de passe : </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password}
            <button type="submit">se connecter </button>
          </form>
        </section>
      </>
    );
}