import React, { useState } from "react";
import VisitorChart from "./VisitorChart";
import { Link, NavLink } from "react-router-dom";
import './sidBar.css';
import { FaList } from "react-icons/fa6";
import { IoListOutline } from "react-icons/io5";

const AdminInterface = () =>{
  
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
    
   
    return(
<div className="container-fluid-no-padding">
  <div className="navbar-admin">
          <ul className="nav-list">
          <div className="left-links"><li className="nav-item "><NavLink to="./AdminInterface"> <button className="mobile-menu-toggle" onClick={toggleSidebar}>
          <IoListOutline /></button>Admin Dashboard</NavLink></li></div>
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
            <div className="row-admin">
            <div className={`col-3 ${sidebarOpen ? 'show' : ''}`}>
                <Link className="nav-item nav-link" to="/admin/GestionDesVoyages">gestion des voyages</Link>
                <Link className="nav-item nav-link" to="/admin/reservations">Reservations</Link>
                <Link className="nav-item nav-link" to="/admin/properties">Properties</Link>
                <Link className="nav-item nav-link" to="/admin/payments">Payments</Link>
                <Link className="nav-item nav-link" to="/admin/payments">Déconnection</Link>
           </div>
           
            <div className="col-9">
                <VisitorChart />
   
        
            </div>
        </div>
        </div>

    );
};
export default AdminInterface;