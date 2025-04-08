import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px 20px', background: '#f8f8f8', borderBottom: '1px solid #ccc' }}>
    <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: '#7c3aed', fontWeight: 'bold' }}>
      Home
    </Link>
    <Link to="/debug" style={{ textDecoration: 'none', color: '#333' }}>
      Debug Chatbot
    </Link>
  </nav>
);

export default Navbar;
