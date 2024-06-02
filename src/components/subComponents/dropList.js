import axios from "axios"
import { useEffect, useState } from "react"
import './dropList.css'



export default function DropList(props)
{
    const paramType = props.paramType;
    const [label,setLabel] = useState("");
    const [droppedData,setDroppedData]= useState([]);
    const [selectedValue,setSelectedValue]= useState('');

    
    useEffect(() =>
    {
        if(props.reset)
            setSelectedValue('');
    },[props.reset])
    
    function handleDropListChange(e)
    {
        
        setSelectedValue(e.target.value);

        
        if(paramType === "ville")
            props.searchedElement(paramType,e.target.value)
        else if(paramType === "competence")
            props.searchedElement(paramType,e.target.value)
        else if(paramType === "etablissement")
            props.searchedElement(paramType,e.target.value)
        else if(paramType === "Specialite")
            props.searchedElement(paramType,e.target.value)
        else if(paramType === "type")
            props.searchedElement(paramType,e.target.value)
        
    }    

    useEffect( () =>
    {
        axios.get(`http://localhost:3002/api/data/parameter/${paramType}`)
        .then(res =>
            {
               
                setLabel(res.data.parameter);
                setDroppedData(res.data.param_data);
            }
        )
        .catch(error =>
            {
                console.error(error);
            }
        )
    },[paramType])

    
    return <div className="dropList">
        <label className="dropListLabel" htmlFor="">{label}:</label>
        <select className="dropListSelect" name="" id="" onChange={handleDropListChange} value={selectedValue}>
            <option value=""></option>
            {droppedData.map((v,key) =>(
                <option key={key} value={v}>{v}</option>
))}
        </select>
    </div>
}