import React, { useState,useEffect } from 'react';
import './History.css';
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function History() {
  const navigate=useNavigate()
    
  const [adminsActions, setAdminsActions] = useState([]);
  const [id,setId]=useState("");
  const [action,setAction]=useState("");
  const [dateDebut,setDateDebut]=useState("")
  const [dateFin,setDateFin]=useState("")
  const[searchHistory,setSearchHistory]=useState([])



  useEffect(() => {
    const getHistory = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/Login");
            return; 
        }
        try {
            const response = await axios.get("http://localhost:3002/api/history", {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            console.log(response.data.adminHistory);
            setAdminsActions(response.data.adminHistory)
            setSearchHistory(response.data.adminHistory)
        } catch (err) {
            console.log(err);
        }
    };

    getHistory();

}, [navigate]);

function isDateBetween(startDate, endDate, targetDate) {
  
  targetDate.setHours(0, 0, 0, 0);

  
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return startDate <= targetDate && endDate >= targetDate;
}

function handleSearch() {
  const filteredActions = adminsActions.filter((a) => {
    const matchesId = id ? a.Actor==id : true;
    const matchesAction = action ? a.action_type.includes(action) : true;
    const matchesDateRange = (dateDebut && dateFin) ? isDateBetween(new Date(dateDebut), new Date(dateFin), new Date(a.action_date)) : true;

    return matchesId && matchesAction && matchesDateRange;
  });

  setSearchHistory(filteredActions)
}

  

  return ( <div className='History'>
       
    <div className="containerHistory">
    
      <div>
        <h1 style={{textAlign:"center",marginBottom:"50px"}}>Actions des administrateurs</h1>
        <label htmlFor="">Id Actor: </label>
        <input
          type="number"
          placeholder="Rechercher par ID"
         
          className='search-input'
          onChange={(e)=>{setId(e.target.value)}}
        />
        <label htmlFor="">Action: </label>
        <select   onChange={(e)=>{setAction(e.target.value)}}>
             <option value="Delete">Delete</option>
             <option value="Ajout">Ajout</option>
             <option value="Update">Update</option>

        </select>
        <label htmlFor="">Date Début: </label>
        <input
          type="date"
          placeholder="Rechercher par ID"
          className='search-input'
          onChange={(e)=>{setDateDebut(e.target.value)}}
        />
          <label htmlFor="">Date Fin: </label>
        <input
          type="date"
          placeholder="Rechercher par ID"
          className='search-input'
          onChange={(e)=>{setDateFin(e.target.value)}}
        />


        <button  className='green-button' onClick={handleSearch}>Rechercher</button>
       
        <div className='myjournalhistory'>
        <table border="3px">
   <tr>
    <th>Id Acteur</th>
     <th>Action</th>
    
     <th>La date d'ffectuation</th>
     <th>Details</th>
   </tr>

  {
    searchHistory.map((j)=>{
      return <tr>
        <td>{j.Actor}</td>
        <td>{j.action_type}</td>
       
        <td>{j.action_date}</td>
        <td>{j.action_details}</td>
      </tr>

    })
  }




 </table>
 </div>
      </div>
      
    </div>
    </div>
  );
}

export default History;