import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/images/app-logo.png';


const style = {
  backgroundColor: 'whitesmoke', fontWeight: '600', color: 'rgb(248, 77, 15)'
};

export const Header = () => (
  <div className="container header-container">
    <NavLink to="/">
      <img src={logo} alt="site_logo" width="55" height="55" />
    </NavLink>
    <nav>
      <NavLink exact to="/" id="home-page" className="nav-link" activeStyle={style}>Home</NavLink>
      <NavLink exact to="/shop" id="home-page" className="nav-link" activeStyle={style}>Shop</NavLink>
    </nav>
  </div>
);

export default Header;
