import React, { useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminInterface from './admin/AdminInterface';
import Login from './admin/Login';
import Accueil from './Accueil';
import GestionDesVoyages from './admin/GestionDesVoyages';


function App() {

 
 
    return (
        <div className="container-fluid no-padding">
            <Router>
      <div className="container-fluid no-padding">
      
        <Routes>
          <Route path ='/' element ={<Accueil />}/>
          <Route path="/AdminInterface" element={<AdminInterface />} />
          <Route path ='/Accueil' element ={<Accueil />}/>
          <Route path="/admin/GestionDesVoyages" element={<GestionDesVoyages />} />
          
          


        </Routes>
      </div>
    </Router>
              
   </div>                      
  
    );

  };
export default App;
