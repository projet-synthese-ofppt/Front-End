import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from "axios";
import "../Gestionnaire/globalClender.css"
import EventModal from '../Gestionnaire/EventModel'; 

const localizer = momentLocalizer(moment);

export default function FormateurCalender(){
    const [loading, setLoading] = useState(true);
    const [convertedData, setConvertedData] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const id=3;
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3002/api/formateurCalender",{id});
          const data = response.data.formation;
          console.log(data)
          const convertedEvents = data.flatMap((event) => {
            const color=getRandomColor()
            const { planification } = event;
            
            return planification.map((p) => {
              const [year, month, day] = p.jour.split('-');
              const [startHour, startMinute] = p.heure.from.split(':');
              const [endHour, endMinute] = p.heure.to.split(':');
              const startDate = new Date(year, month - 1, day, startHour, startMinute);
              const endDate = new Date(year, month - 1, day, endHour, endMinute);
              return {
                
                title: event.titre,
                start: startDate,
                end: endDate,
                color: color
              };
            });
          });
  
          setConvertedData(convertedEvents);
         
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
  
    const handleSelectEvent = (event) => {
      setSelectedEvent(event);
    };
  
    const handleCloseModal = () => {
      setSelectedEvent(null);
    };
  
    return (
      <div className='GlobalCalender'>
        
        <div className='mycalender'>
          <h1 className='titleCalendrier'>Calendrier des formations</h1>
          {!loading && (
            <Calendar
              localizer={localizer}
              events={convertedData}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color,
                },
              })}
              style={{ height: 500, width: "100%" }}
              onSelectEvent={handleSelectEvent}
            />
          )}
          {loading && <div>Loading...</div>}
        </div>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </div>
    );

}