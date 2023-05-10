import "./header.css";
import logo from "/Users/elsaletallieur/LeReacteur/4.React/Marvel/Marvel-front/src/assets/Img/logo.png";
import { Link } from "react-router-dom";

// src/assets/Img/logo.png
// /Users/elsaletallieur/LeReacteur/4.React/Marvel/Marvel-front/src/assets/Img/logo.png

const Header = () => {
  return (
    <div className="header">
      <section className="header-logo">
        <img src={logo} alt="Marvel logo written in white on red background " />
      </section>
      <section className="header-menu">
        <Link to="/">The characters</Link>
        <Link to="/comics">The comics</Link>
        <Link to="/favorites">My favorites</Link>
      </section>
    </div>
  );
};

export default Header;
