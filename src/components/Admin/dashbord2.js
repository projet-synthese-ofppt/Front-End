import React, { useEffect, useState }from "react";
import Chart from "react-apexcharts";
import "./dashbord2.css";
import Sidebar from "../../Sidebar";
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";




export default function Dashbord2(){
  const [journal,setJournal]=useState([])

  const [chartFormation,setChartFormation]=useState({
    options: {
      labels: ['Finis', 'En cours', 'Pas en cours commencée'],
      chart: {
       
        type: 'donut'
      },
      colors:  ['#77ddf9', '#ffa0a3', '#FFFF00'],
      
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 0,
        options: {
          
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    series: []
  })

  const [state,setState]=useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      
      xaxis: {
        categories: [],
        
      }
      
    },
    
    series: [
      {
        name: "Compétences des formateurs",
        data: []
      }
    ]
  })


  const [chartFormateur,setChartFormateur]=useState({
    options: {
      labels: ['formateurs', 'Office', 'Invités'],
      chart: {
       
        type: 'donut'
      },
      
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 0,
        options: {
          
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    series: []
  })

  const [state2, setState2] = useState({
    options: {
      labels: ['Formateurs Participés', 'Formateurs pas en cours participés'],
      chart: {
       
        type: 'donut'
      },
      colors:  ['#77ddf9', '#ffa0a3', '#FFFF00'],
      
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    series: []
  });

  const [state3,setState3] = useState({
    options: {
      labels: [ 'Responsables invités', 'Responsables office'],

      chart: {
        type: 'donut'
      },
      
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    series: []
  });

  const navigate = useNavigate();


 

  //getInfoFormateur

  useEffect(() => {
    const getDashbord = async () => {

      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/Login");
          
      }

      try {
        
        const response = await axios.get("http://localhost:3002/api/dashbord",
        {
          headers:
          {"authorization":`Bearer ${token}`}
        });

        const formateursData = response.data.formateurs[0];
        let office=0;
        let guest=0;
        
        formateursData.forEach((f) => {
          if(f.type==="guest")
            guest+=1
          else
          office+=1
          
        });

        const total=response.data.formateurOffice[0][0].c1+response.data.formateurGuest[0][0].c2

        setChartFormateur({...chartFormateur,series:[response.data.formateurOffice[0][0].c1,response.data.formateurGuest[0][0].c2,total]})
  
        const compSet = new Set();
        formateursData.forEach((f) => {
          f.more_informations.compethences.forEach((comp) => {
            compSet.add(comp);
          });
        });
  
        const comp = Array.from(compSet);
  
        const competenceCount = {};
        formateursData.forEach((f) => {
          f.more_informations.compethences.forEach((comp) => {
            competenceCount[comp] = (competenceCount[comp] || 0) + 1;
          });
        });
  
        const compArray = comp.map((comp) => competenceCount[comp] || 0);
  
        setState({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: comp,
            },
          },
          series: [
            {
              name: "Compétences des formateurs",
              data: compArray,
            },
          ],} )
          setChartFormation({...chartFormation,series:[response.data.formationsFinis[0][0].n1,response.data.formationsEncours[0][0].n2,response.data.formationNotStart[0][0].n3]})

           setState2({...state2,series:[response.data.formateurPart[0][0].n4,response.data.formateurNotPart[0][0].n5]})
           setState3({...state3,series:[response.data.RespoGuest[0][0].n6,response.data.RespoOffice[0][0].n7]})
        
        
      } catch (error) {
        console.log(error);
      
      }
    };
  
    getDashbord();
  }, []);

 
    
   
      

      

    
      const [chartGestonnaire,setGestionnaire]=useState({
        options: {
          labels: ['Gestionnaire', 'Online', 'Offline'],
          chart: {
           
            type: 'donut'
          },
          colors: ['#afaadf', '#aadfcc','#ffa0a3'],
          
          legend: {
            position: 'bottom'
          },
          responsive: [{
            breakpoint: 0,
            options: {
              
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        series: [30, 25, 5]
      })
      
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
               
                const sortedEntries = response.data.adminHistory.sort((a, b) => {
                  return new Date(b.action_date) - new Date(a.action_date);
              });
      
              
              const latestEntries = sortedEntries.slice(0, 11);
      
              setJournal(latestEntries);
            } catch (err) {
                console.log(err);
            }
        };
    
        getHistory();
    
    }, [navigate]);
      
      
 return <div className="mydashbordContainer">
    {/* <div className="ImaneMenu">

    </div> */}
  
    <div className="mydashbord">
        <div className="mydashtitle">
            <p style={{fontSize:"38px"}}>Dashboard</p>
        </div>
        <div className="mydashbordCards">
            <div className="card1">
                <p style={{marginLeft:"5px",fontSize:"18px",fontWeight:"bold",color:"#2196F3"}}>Formateurs</p>
                <Chart options={chartFormateur.options} series={chartFormateur.series} type="donut" width="210" />
            </div>
            <div className="card2">
            <p style={{marginLeft:"5px",fontSize:"18px",fontWeight:"bold",color:"#ffa0a3"}}>Formations</p>
                <Chart options={chartFormation.options} series={chartFormation.series} type="donut" width="210" />
            </div>
            <div className="card3">
            <p style={{marginLeft:"5px",fontSize:"18px",fontWeight:"bold",color:"#afaadf"}}>Gestionnaires</p>
                <Chart options={chartGestonnaire.options} series={chartGestonnaire.series} type="donut" width="210" />
            </div>
            
        </div>
        <div className="part2Dashbord">
        <div className="myCharts">
            <div className="barChart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
              
            />
            

            </div>
            <div className="dountChart">
            <Chart options={state2.options} series={state2.series} type="donut" width="300" />
            <Chart options={state3.options} series={state3.series} type="donut" width="300" />

            </div>
            
         </div>
         <div className="myjournalDashbord">
         <h4><Link to="/history"> Les plus récents actions <FontAwesomeIcon icon={faArrowRight} style={{marginLeft:"10px"}}/></Link></h4>
 
 <table border="3px">
   <thead>
    <tr>
      <th>Action</th>
      
      <th>La date d'ffectuation</th>
    </tr>
   </thead>
   <tbody>
   {
    journal.map((j,index)=>{
      return <tr key={index}>
        <td>{j.action_details}</td>
        <td>{j.action_date}</td>
      </tr>

    })
  }
   </tbody>

  




 </table>
         </div>

        </div>
        

    </div>

 </div>  
}