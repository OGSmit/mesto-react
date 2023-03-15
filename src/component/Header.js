import '../index.css';
import React from 'react';
import logo from '../images/logo.svg'
function Header() {
  return(
  <header className="header">
    <img alt="Логотип - Место" src={logo} className="header__logo"/>
  </header>
  )
}

export default Header

