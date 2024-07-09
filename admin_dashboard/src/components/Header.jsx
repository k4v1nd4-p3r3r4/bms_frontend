import React from "react";
import "./header.css";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import Nav from "./Nav";
import { Link } from 'react-router-dom';

function Header({ toggleSidebar }) {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <Logo /> {/*compnany logo get from Logo jsx*/}
      <Searchbar />
      <Nav />
      {/*seacrhbar get from Search bar.jsx*/}
      <Link to="/"><button className="btn btn-danger">Logout</button></Link>
    </header>
  );
}

export default Header;
