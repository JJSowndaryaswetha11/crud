// Footer.js

import React from 'react';
import './Styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} CRUD</p>
      </div>
    </footer>
  );
}

export default Footer;
