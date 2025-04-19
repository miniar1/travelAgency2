import React, { useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import bckg from './assets/bckg.jpg'; // Image de fond
import Navbar from './Navbar';
import BestDestination from './BestDestination';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import { ImAirplane } from "react-icons/im";
import { MdHotel } from "react-icons/md";
import { FaCarAlt } from "react-icons/fa";

interface Airport {
  departure: {
    airport: string;
    iata: string;
  };
destination: {
    airport: string;
    iata: string;
  };
}

const App = () => {
   const [content, setContent] = useState('default');
   const [departure, setDeparture] = useState('');
   const [destination, setDestination] = useState('');
   const [departureDate, setDepartureDate] = useState('');
   const [returnDate, setReturnDate] = useState('');
   const[passengers, setPassengers] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [airports, setAirports] = useState<Airport[]>([]); 
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

  
   function handleContentChange(typeImage: React.SetStateAction<string>) {
    setContent(typeImage);
  }

  const handleSubmit = async(e: { preventDefault: () => void; }) => { e.preventDefault();
  console.log({ 
    departure,
    destination,
    departureDate,
    returnDate,
    passengers
});};
const apiUrl = `https://api.aviationstack.com/v1/flights`;

// Fetch airport data on component mount
useEffect(() => {
  const fetchAirports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flights');
      setAirports(response.data.data);
      setLoading(false);
    } catch (err:unknown) {
  
      setLoading(false);
    }
  };

  fetchAirports();
}, []);


  
 
    return (
        <div className="container-fluid no-padding">
          <Navbar/>
            <div className="hero" style={{ backgroundImage: `url(${bckg})` }}>
                <div className="row text-white py-5">
                    <h1 className="col-6 mb-4">
                        The Best Experience on One Click
                    </h1>
                </div>
  <div className="container">
  <div className="col-4 option">
                <ul>
                    <li onClick={() => handleContentChange('flight')}><ImAirplane /></li>
                    <li onClick={() => handleContentChange('hotel')}><MdHotel /></li>
                    <li onClick={() => handleContentChange('car')}><FaCarAlt /></li>
               </ul></div>
         <div className="col-12 search">
          {content ==='default' && (
            <div className="flight-booking-container">
            <h1>Flight Booking</h1>
            <form className="container flight-form">
              <div className="row">
                      <div className="col-4 form-group">
                        <label htmlFor="departure">Departure</label>
                        <select 
                                 id="departure" 
                                 value={departure} 
                                 onChange={(e) => setDeparture(e.target.value)}
                              >
                                 <option value="">Select Airport</option>
                                 {airports.map((airport, index) => (
                                    <option key={index} value={airport.departure.iata}>
                                       {airport.departure.airport} ({airport.departure.iata})
                                    </option>
                                 ))}
                              </select>
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="destination">Destination</label>
                        <select 
                                 id="departure" 
                                 value={departure} 
                                 onChange={(e) => setDeparture(e.target.value)}
                              >
                                 <option value="">Select Airport</option>
                                 {airports.map((airport, index) => (
                                    <option key={index} value={airport.destination.iata}>
                                       {airport.destination.airport} ({airport.destination.iata})
                                    </option>
                                 ))} 
                              </select>
                      </div>
                      <div className="col-4 form-group">
                        <label htmlFor="departure-date">Departure Date:</label>
                        <input type="date" id="departure-date" />
                      </div>
                      </div>
                      <button type="submit" className="submit-button">
                       search
                      </button>
                    </form>
                  
                  </div>
         )}
          {content === 'flight' &&(
         <div className="flight-booking-container">
         <h1>Flight Booking</h1>
         <form className="container flight-form">
           <div className="row">
                   <div className="col-3 form-group">
                         <label htmlFor="passengers">Number of Passengers:</label>
                         <input type="number" id="passengers" min="1" value={passengers} onChange={(e) => setPassengers(e.target.value)}/>
                   </div>
                   <div className="col-3 form-group">
                     <label htmlFor="departure">Departure</label>
                     <select 
                              id="departure" 
                              value={departure} 
                              onChange={(e) => setDeparture(e.target.value)}
                           >
                              <option value="">Select Airport</option>
                              {airports.map((airport, index) => (
                                 <option key={index} value={airport.departure.iata}>
                                    {airport.departure.airport} ({airport.departure.iata})
                                 </option>
                              ))}
                           </select>
                   </div>
                   <div className="col-3 form-group">
                     <label htmlFor="destination">Destination</label>
                     <select 
                              id="departure" 
                              value={departure} 
                              onChange={(e) => setDeparture(e.target.value)}
                           >
                              <option value=""></option>
                              {airports.map((airport, index) => (
                                 <option key={index} value={airport.destination.iata}>
                                    {airport.destination.airport} ({airport.destination.iata})
                                 </option>
                              ))} 
                           </select>
                   </div>
                   <div className="col-3 form-group">
                     <label htmlFor="departure-date">Departure Date:</label>
                     <input type="date" id="departure-date" />
                   </div>
                   </div>
                   <button type="submit" className="submit-button">
                     Book Flight
                   </button>
                 </form>
               
               </div>
        )}
        {content === 'hotel' && (
          <p className="text-center">Hotel Booking Form (Coming Soon)</p>
        )}
        {content === 'car' && (
          <p className="text-center">Car Rental Form (Coming Soon)</p>
        )}
      </div>
    </div>
    </div>
    <BestDestination />
     </div>        
  
    );
  };

export default App;
