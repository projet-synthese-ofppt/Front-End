
import axios from 'axios';
import React, { useState,useEffect } from 'react';

import Select from 'react-select';
import './multiDropList.css';

export default function  MultiDropList(props) {

    const paramType = props.paramType;
    const [options,setOptions] = useState([]);
    const [label,setLabel] = useState("");
    const [droppedData,setDroppedData]= useState([]);

    const customStyles = {
        control: (base) => ({
            ...base,
           
            width:400, // Set a max-width for the Select component
            overflow: 'hidden'
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#f0f0f0' // Customize background color of selected options
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: '#333' 
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: '#666',
            ':hover': {
                backgroundColor: '#d3d3d3',
                color: '#000'
            }
        })
    };


    useEffect( () =>
        {
            axios.get(`http://localhost:3002/api/data/parameter/${paramType}`)
            .then(res =>
                {
                    
                    console.log(res.data)
                    let T = [];
                    res.data.param_data.map(x => T.push({value:x,label:x}));
                    setOptions(T);
                    setLabel(res.data.parameter)
                    
                }
            )
            .catch(error =>
                {
                    console.error(error);
                }
            )
        },[paramType])

        function handleMultiChange(selected)
        {
            props.selectedMulti(selected)
        }
    return <div className="multiDropList">
    <label className="dropListLabel">{label}:</label>
    <Select
    
    isMulti
    name="colors"
    options={options}
    className="basic-multi-select"
    styles={customStyles}
    classNamePrefix="select"
    onChange={handleMultiChange} />
    
    </div>
}
  

