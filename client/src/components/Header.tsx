import React from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <nav>
      <img src={logo} alt='logo' />
      <div>Profile Img</div>
    </nav>
  );
};

export default Header;
