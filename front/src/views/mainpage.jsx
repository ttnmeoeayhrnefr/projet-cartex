import { Link, Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import Marketplace from "./marketplace";
import Infos from "./infos";
import Register from "./register";

import "../style/mainpage.scss";

export default function Mainpage() {
  return (
    <div className="content">
      <div className="navbar">
        <div className="logo">CarteX</div>
        <div className="link">
          <Link to="/">Accueil</Link>
          <Link to="/Marketplace">Marketplace</Link>
          <Link to="/Infos">Infos</Link>
        </div>
        <div className="register">
          <Link to="/Register" className="Link">
            Register
          </Link>
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Marketplace" element={<Marketplace />}></Route>
          <Route path="/Infos" element={<Infos />}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}
