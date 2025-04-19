import React from "react";
import './nav.css';
import { BrowserRouter as Router, Routes, Route,Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar =() => {
    return (
      <div className="navbar" style={{color:"FFFFFF"}}>
      <ul className="nav-list">
        <li className="nav-item">
        <NavLink to="./AdminInterface">Admin</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="./signin">Sign In</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to="/Accueil">Accueil</NavLink>
        </li>
      </ul>
    </div>

    
  );
};
export default Navbar ;