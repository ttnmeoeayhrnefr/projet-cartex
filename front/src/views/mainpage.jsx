import { Link, Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import Marketplace from "./marketplace";
import Infos from "./infos";
import Register from "./register";
import Connect from "./connect";
import Details from "../components/details";

import "../style/mainpage.scss";

export default function Mainpage() {
  return (
    <div className="content">
      <div className="navbar">
        <Link to="/" className="logo">Carte<span className="primary">X</span></Link>
        <div className="link">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/Marketplace">Marketplace</Link></li>
            <li><Link to="/Infos">Infos</Link></li>
          </ul>
        </div>
        <div className="acc-btn">
            <Link to="/Register" className="Link">
              <div className="register">
                Inscription
              </div>
            </Link>
            <Link to="/Connect" className="Link">
              <div className="connect">
                Connexion
              </div>
            </Link>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Marketplace" element={<Marketplace />}></Route>
          <Route path="/Infos" element={<Infos />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Connect" element={<Connect />}></Route>
          <Route path="/details/:cardId" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}
