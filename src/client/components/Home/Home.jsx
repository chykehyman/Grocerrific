import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = () => (
  <div className="jumbotron mt-4">
    <h1 className="display-4">STOP AND SHOP</h1>
    <p><i style={{ color: '#777' }}>Your one stop shop for your grocery items</i></p>
    <p className="lead">
      <Link to="/shop" className="btn btn-lg">Shop Now</Link>
    </p>
  </div>
);

export default HomePage;
