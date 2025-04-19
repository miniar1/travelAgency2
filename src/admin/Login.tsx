import Navbar from "../Navbar";

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

import './login.css';
import { ImAirplane, ImUser, ImUserPlus } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaGoogle, FaUser, FaUserPlus } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
    const[activeTab,setActiveTab]=useState('login');
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  
    const handleLoginChange = (e: { target: { name: any; value: any; }; }) => {
      setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSignupChange = (e: { target: { name: any; value: any; }; }) => {
      setSignupData({
        ...signupData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleLoginSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log('Login data:', loginData);
      // Ici vous ajouteriez votre logique d'authentification
    };
  
    const handleSignupSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      console.log('Signup data:', signupData);
      // Ici vous ajouteriez votre logique d'inscription
    };
      
    return(
    
           <div className="auth-container">
  {/* Onglets Login/Sign Up */}
  <div className="auth-tabs">
    <button 
      className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
      onClick={() => setActiveTab('login')}
    >
      <ImUser /> Login
    </button>
    <button 
      className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
      onClick={() => setActiveTab('signup')}
    >
      <ImUserPlus /> Sign Up
    </button>
  </div>

  {/* Formulaire Login */}
  {activeTab === 'login' && (
    <form className="auth-form">
      <h2><ImAirplane /> Welcome Back</h2>
      
      <div className="form-group">
        <label htmlFor="login-email"><MdEmail /> Email</label>
        <input 
          type="email" 
          id="login-email" 
          placeholder="your@email.com" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password"><RiLockPasswordFill /> Password</label>
        <input 
          type="password" 
          id="login-password" 
          placeholder="••••••••" 
        />
      </div>

      <div className="form-options">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#">Forgot password?</a>
      </div>

      <button type="submit" className="submit-button">
        <Login /> Login
      </button>

      <div className="auth-divider">
        <span>or continue with</span>
      </div>

      <div className="social-auth">
        <button type="button" className="social-button">
          <FaGoogle /> Google
        </button>
        <button type="button" className="social-button">
          <FaFacebook /> Facebook
        </button>
      </div>
    </form>
  )}

  {/* Formulaire Sign Up */}
  {activeTab === 'signup' && (
    <form className="auth-form">
      <h2><ImAirplane /> Join Our Travel Community</h2>
      
      <div className="form-group">
        <label htmlFor="signup-name"><FaUser /> Full Name</label>
        <input 
          type="text" 
          id="signup-name" 
          placeholder="John Doe" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="signup-email"><MdEmail /> Email</label>
        <input 
          type="email" 
          id="signup-email" 
          placeholder="your@email.com" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="signup-password"><RiLockPasswordFill /> Password</label>
        <input 
          type="password" 
          id="signup-password" 
          placeholder="••••••••" 
        />
      </div>

      <div className="form-group">
        <label htmlFor="signup-confirm"><RiLockPasswordFill /> Confirm Password</label>
        <input 
          type="password" 
          id="signup-confirm" 
          placeholder="••••••••" 
        />
      </div>

      <div className="form-options">
        <label>
          <input type="checkbox" /> I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
        </label>
      </div>

      <button type="submit" className="submit-button">
        <FaUserPlus /> Create Account
      </button>
    </form>
  )}
</div>
    
    );
};
export default Login;