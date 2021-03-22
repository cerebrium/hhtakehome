import React from 'react'
import logo from '../images/logo-symbol.svg';

const Header = () => {
  return (
    <header className="headerContainer">
      <img src={logo} alt="Helpful Human" className="helpfulHumanLogo"/>
    </header>
  )
}

export default Header