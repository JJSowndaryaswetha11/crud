// Navbar.js
import React, { useState } from 'react';
import './Styles/Navbar.css'


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <a href="/">CRUD</a>
        </div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="/">Home</a></li>
           
          </ul>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className={`bar ${isOpen ? 'change' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
