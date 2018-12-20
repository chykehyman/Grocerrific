import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/app-logo.png';


export const Header = () => (
  <div className="container header-container">
    <NavLink to="/">
      <img src={logo} alt="site_logo" width="55" height="55" />
    </NavLink>
    <nav>
      <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
      <NavLink exact to="/shop" className="nav-link" activeClassName="active">Shop</NavLink>
    </nav>
  </div>
);

export default Header;
