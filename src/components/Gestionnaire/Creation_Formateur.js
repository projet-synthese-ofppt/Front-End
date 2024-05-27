import { useState,useRef } from "react"
import './Creation_Formateur.css'
import DropList from "../subComponents/dropList";
import axios from "axios";


export default function AddFormateur()
{
    const [imgHolder,setImageHolder] = useState('/media/profile.png');
    const fileInputRef = useRef(null);
    const [formateurData,setFormateurData] = useState({});


    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    //Public Data stocking
    const handleChange = (e) =>{
            const {name,value} = e.target;
            setFormateurData(prevState => ({...prevState, [name]:value}))
        }
    
    //Private Data stocking
    const handleChangeDetails  = (e) =>{
            const {name,value} = e.target;
            setFormateurData(prevState => ({...prevState,more_information:{...prevState.more_information,[name]:value}}))
        }

    //Drop list data stocking
    function searchedElement(elementType, elementValue) {
        setFormateurData(prevState => ({...prevState, [elementType]:elementValue}))
    }
        
    //Image Handling
    function handleUploadedImage(e)
    {
        const image = e.target.files[0];
        const reader = new FileReader();

        setFormateurData(prevState => ({...prevState, image}))

        reader.onload = (event) =>
        {
            setImageHolder(event.target.result);
        }

        reader.readAsDataURL(image);
    }
    
    const handleSubmit = (e)=>
        {
            e.preventDefault();
            console.log(formateurData)
            const token = localStorage.getItem('token');

            console.log(formateurData.image)

            axios.post('http://localhost:3002/api/ajouterFormateur',formateurData,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "authorization":`Bearer ${token}`
                }
              })
            .then(res =>
                {
                    console.log(res.data);
                })
            .catch(error => console.error(error))
            
        }

    

    return <div className="addFormateurContainer">
        <h1>Ajouter Formateur</h1>

    
        <form action="" className="AddFormateurForm" onSubmit={handleSubmit}>

            <div className="addFormateurImageContainer">
                <img id="addFormateurImage" src={imgHolder} alt="" onClick={handleImageClick} />
                <input type="file" name="" id="" accept="image/*" ref={fileInputRef} hidden onChange={handleUploadedImage}  />
            </div>

            <div className="addFormteurInputsContainer">
                <div className="inputSubContainer">
                    <label htmlFor="">Nom</label>
                    <input className="addFormateurInput" type="text" name="first_name" id="first_name"  onChange={handleChange} />
                </div>

                <div className="inputSubContainer">
                    <label htmlFor="">Prenom</label>
                    <input className="addFormateurInput" type="text" name="last_name" id="last_name"  onChange={handleChange} />
                </div>

                <div className="inputSubContainer">
                    <label htmlFor="">Login</label>
                    <input className="addFormateurInput" type="text" name="login" id="login"  onChange={handleChange} />
                </div>
                
                <div className="inputSubContainer">
                    <label htmlFor="">Mot de passe</label>
                    <input className="addFormateurInput" type="password" name="password" id="password"  onChange={handleChange} />
                </div>

                <div className="inputSubContainer">
                    <label htmlFor="">Spécialité</label>
                    <input className="addFormateurInput" type="text" name="specialite" id="specialite"  onChange={handleChangeDetails} />
                </div>

                <div className="inputSubContainer">
                    <label htmlFor="">Expériences</label>
                    <textarea className="addFormateurTextArea" name="experience" id="experience" rows='10' cols='5'  onChange={handleChangeDetails} ></textarea>
                    <p id="addFormateurTextAreaHint">Pour ajouter plusieurs expériences, écrivez chacune dans une nouvelle ligne</p>
                </div>

                <DropList paramType = 'type' searchedElement = {searchedElement} />
                <DropList paramType = 'etablissement' searchedElement = {searchedElement} />
            </div>

            <input type="submit" value="Valider" />
        </form>
    </div>
}