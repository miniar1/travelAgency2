import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from "react-router-dom";
import './sidBar.css';
import { motion } from "framer-motion";
import { FaAngleDown } from "react-icons/fa";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { RxUpdate } from "react-icons/rx";
import axios from 'axios';
import { IoListOutline } from "react-icons/io5";

type Voyage = {
  id: number;
  nomVoyage: string;
  description: string;
  prix: number;
  image: string;
  dateDepart: string;
  dateRetour: string;
  type_voyage: string;
  promotion: number;
};
const GestionDesVoyages = () => {
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const [formData, setFormData] = useState({
    nomVoyage: '',
    description: '',
    prix: '',
    image: '',
    dateDepart: '',
    dateRetour: '',
    typeVoyage: '',
    promotion: ''
  });
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState<File | null>(null);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setImage(e.target.files[0]);
  }
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = new FormData();
  form.append("nomVoyage", formData.nomVoyage);
  form.append("description", formData.description);
  form.append("prix", formData.prix);
  form.append("dateDepart", formData.dateDepart);
  form.append("dateReturn", formData.dateRetour);
  form.append("typeVoyage", formData.typeVoyage);
  form.append("promotion", formData.promotion);
  if (image) {
    form.append("image", image);
  }

  try {
    await axios.post('http://localhost:5000/api/voyages', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert("Voyage ajouté !");
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'ajout");
  }
};
//  affichage des voyage
  const [voyages, setVoyages] = useState<Voyage[]>([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/voyages')
      .then(res => setVoyages(res.data))
      .catch(err => console.error(err));
  }, []);
   const [sidebarOpen, setSidebarOpen] = useState(false);
      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };
  return (
    <div className="container-fluid no-padding">
     <div className="navbar-admin" style={{color:"FFFFFF"}}>
      <ul className="nav-list">
      <div className="left-links">
        <li className="nav-item ">
        <NavLink to="./AdminInterface"> Admin Dashboard</NavLink></li></div>
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
          <motion.div
            style={{ cursor: 'pointer', display: 'inline-block', padding: '30px' }}
            onClick={toggleForm}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
           <h5>Ajouter un voyage<FaAngleDown /></h5>
          </motion.div>

          {showForm && (
            <motion.form
              className="form-wrapper mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ marginRight: '50px' }}
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="nomVoyage">Nom de Voyage</label>
                  <input type="text" id="nomVoyage" name="nomVoyage" value={formData.nomVoyage} onChange={handleChange} className="form-control" placeholder="Voyage" />

                  <label htmlFor="idDestination">Description</label>
                  <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                  <label htmlFor="nomVoyage">Prix en DT</label>
                  <input type="text" id="prix" name="prix"className="form-control" value={formData.prix} onChange={handleChange}placeholder="prix en DT" />
                  <label htmlFor="nomVoyage">Promotion</label>
                  <input type="promotion" name="promotion"
                  className="form-control" value={formData.promotion} onChange={handleChange}placeholder="prix en DT" />
                  </div>
              
                <div className="form-group col-6">
                  <label htmlFor="imageVoyage">Image</label>
                  <input type="file" className="form-control-file" name ="image"id="image" onChange={handleImageChange}/>

                  <div className="custom-control custom-radio">
  <input type="radio" id="alleretour" name="typeVoyage" value="alleretour" onChange={handleChange} className="custom-control-input"/>
  <label className="custom-control-label" htmlFor="alleretour">Aller et retour</label>
</div>

<div className="custom-control custom-radio" >
  <input type="radio" id="aller" name="typeVoyage" value="aller" onChange={handleChange} className="custom-control-input"/>
  <label className="custom-control-label" htmlFor="aller">Aller seulement</label>
</div>


                  <div className="nativeDateTimePicker mt-3">
                    <label htmlFor="depart">Date de départ :</label>
                    <input type="datetime-local" id="depart" name="dateDepart" value={formData.dateDepart} onChange={handleChange} className="form-control" />
                    <label htmlFor="retour" className="mt-2">Date de retour :</label>
                    <input type="datetime-local" id="retour" name="dateRetour" value={formData.dateRetour} onChange={handleChange} className="form-control" />
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-success">Ajouter</button>
                </div>
              </div>
            </motion.form>
          )}

          {/* TABLEAU DES VOYAGES */}
          <div className="mt-5 px-5" >
            <h5>Liste des voyages</h5>
            <div className="table-responsive-wrapper  mt-4">
               <table className="table table-striped table-bordered">
  <thead className="thead-dark">
    <tr>
      <th scope="col">N°</th>
      <th scope="col">Nom de Voyage</th>
      <th scope="col">Description</th>
      <th scope="col">Prix</th>
      <th scope="col">Promo</th>
      <th scope="col">type de voyage</th>
      <th scope="col">Date de départ</th>
      <th scope="col">Date de retour</th>
      <th scope="col">Image</th>
      <th scope="col">Gestion</th>
    </tr>
  </thead>
  <tbody>
    {voyages.map(v => ( 
    <tr>
      <th scope="row">1</th>
      <td>{v.nomVoyage}</td>
              <td>{v.description}</td>
              <td>{v.prix} DT</td>
              <td>{v.promotion}DT</td>
              <td><img src={v.image} alt="img" width="80" /></td>
              <td>{new Date(v.dateDepart).toLocaleString()}</td>
              <td>{new Date(v.dateRetour).toLocaleString()}</td>
              <td>{v.type_voyage}</td>
      <td>
      <Button variant="outlined" size="small" startIcon={<RxUpdate />
}>Update</Button>
      <Button variant="outlined" size="small" startIcon={<DeleteIcon />}>
  Delete
</Button>
     </td>
    </tr>
    ))}
  </tbody>
</table>
</div>
</div>
          </div>
        </div>
      </div>
   
  );
};

export default GestionDesVoyages;
