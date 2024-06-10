import { useState, useRef, useEffect } from "react";
import './Creation_Formateur.css';
import DropList from "../subComponents/dropList";
import axios from "axios";
import MultiDropList from "../subComponents/multiDropList";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfilFormateur() {

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [incFormateur,setIncFormateur] = useState({});
    const [formateurData, setFormateurData] = useState({
        first_name: '',
        last_name: '',
        login: '',
        password: '',
        more_informations: {
            specialite: '',
            experience: '',
            competence: []
        },
        type: '',
        etablissement: '',
        image: null
    });

    const idFormateur = useParams().id;
    const [imgHolder, setImageHolder] = useState(``);
    const [alert, setAlert] = useState('');

    
    useEffect(() =>
        {   
            const getFormateurData = async () =>
                {
                    axios.get(`http://localhost:3002/api/getFormateur/${idFormateur}`)
                    .then(res => {
                        console.log(res.data.more_informations)
                        setFormateurData(res.data);
                        setIncFormateur(res.data)
                        console.log(res.data)
                        setImageHolder(`http://localhost:3002/uploads/${res.data.image}`)
                    }).catch(error => {
                        console.error(error)
                    })
                    
                }
                getFormateurData();
        },[idFormateur]);
        

    //Linking image div to file input
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    //image handling
    function handleUploadedImage(e) {
        const image = e.target.files[0];
        const reader = new FileReader();

        setFormateurData(prevState => ({ ...prevState, image }));

        reader.onload = (event) => {
            setImageHolder(event.target.result);
        };

        reader.readAsDataURL(image);
    }



    //public data inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormateurData(prevState => ({ ...prevState, [name]: value }));
    };


    //multi select handling
    const handleChangeDetails = (e) => {
        const { name, value } = e.target;
        setFormateurData(prevState => ({
            ...prevState,
            more_informations: { ...prevState.more_informations, [name]: value }
        }));

        
    };

    //public data select handling
    function searchedElement(elementType, elementValue) {
        setFormateurData(prevState => ({ ...prevState, [elementType]: elementValue }));
    }

    //private data select handling (specialite)
    function setSpecialite(elementType, elementValue)
    {
        
        setFormateurData(prevState => ({...prevState,more_informations:{...prevState.more_informations,[elementType]:elementValue}}));
    }

   //Submit handling
    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        console.log(formateurData);
        // axios.post('http://localhost:3002/api/ajouterFormateur', formateurData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         "authorization": `Bearer ${token}`
        //     }
        // })
        //     .then(res => {
        //         if (res.data.Done) {
        //             setAlert('Formateur bien ajouté');
        //         }
        //     })
        //     .catch(error => console.error(error));
    };

 

    function selectedMulti(x) {
        let T = x.map(x => x.value);
        setFormateurData(prevState => ({
            ...prevState,
            more_informations: { ...prevState.more_informations, competence: T }
        }));
    }

    function goListFormateur() {
        navigate('/trainers')
    }

    return <> { formateurData && <div className="addFormateurContainer">
     
            <h1 className="addFormateurTitle">Ajouter Formateur</h1>
            {alert && <p className="addFormateurAlert">{alert}</p>}
            <form action="" className="addFormateurForm" onSubmit={handleSubmit}>
                <div className="addFormateurImageContainer">
                    <img id="addFormateurImage" src={imgHolder} alt="" onClick={handleImageClick} />
                    <input type="file" accept="image/*" ref={fileInputRef} hidden onChange={handleUploadedImage} />
                </div>
                <div className="addFormteurInputsContainer">
                    <div className="inputSubContainer">
                        <label htmlFor="first_name" className="addFormateurLabel">Nom</label>
                        <input className="addFormateurInput" type="text" name="first_name" id="first_name" value={formateurData.first_name} onChange={handleChange} />
                    </div>
                    <div className="inputSubContainer">
                        <label htmlFor="last_name" className="addFormateurLabel">Prenom</label>
                        <input className="addFormateurInput" type="text" name="last_name" id="last_name" value={formateurData.last_name} onChange={handleChange} />
                    </div>
                    <div className="inputSubContainer">
                        <label htmlFor="login" className="addFormateurLabel">Login</label>
                        <input className="addFormateurInput" type="text" name="login" id="login" value={formateurData.login} onChange={handleChange} />
                    </div>
                   
                    <div className="inputSubContainer">
                        <DropList paramType='specialite' searchedElement={setSpecialite} profilValue = {formateurData.more_informations.specialite} ></DropList>
                    </div>
                    <div className="inputSubContainer full-width" id="multiDrop">
                        <MultiDropList paramType={"competence"} selectedMulti={selectedMulti} profilValue = {formateurData.more_informations.competence} />
                    </div>
                    <div className="inputSubContainer full-width">
                        <DropList paramType='type' searchedElement={searchedElement} profilValue = {formateurData.type}  />
                    </div>
                    <div className="inputSubContainer full-width">
                        <DropList paramType='etablissement' searchedElement={searchedElement}   profilValue = {formateurData.nom}/>
                    </div>
                    <div className="inputSubContainer full-width">
                        <label htmlFor="experience" className="addFormateurLabel">Expérience(s)</label>
                        <textarea className="addFormateurTextArea" name="experience" id="experience" rows="10" cols="5" value={formateurData.more_informations.experience} onChange={handleChangeDetails}></textarea>
                        <p className="addFormateurHint">Pour ajouter plusieurs expériences, écrivez chacune dans une nouvelle ligne</p>
                    </div>
                </div>
                <div className="addFormteurButtonsContainer">
                    <input type="submit" value="Valider" className="addFormateurSubmit" />
                    <button type="button" onClick={goListFormateur} className="listFormateurButton">List des formateurs</button>
               
                </div>
            </form>
        </div>
}</>;
}
