import { Link, Route, Routes } from "react-router-dom";
import Homepage from "../components/Homepage";
import Marketplace from "./marketplace";
import Infos from "./infos";
import Register from "./register";
import Connect from "./connect";
import { useState, useEffect } from "react";
import Details from "../components/details";

import "../style/mainpage.scss";
import Personnalisation from "./personnalisation";
import Edit from "../components/edit";

export default function Mainpage() {
  const [user_connected, set_user_connected] = useState(false);
  const storedPseudo = localStorage.getItem("pseudo");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // DECONNEXION UTILISATEUR ET CLEAR DU LOCALSTORAGE
  const disconnect = () => {
    if (user_connected) {
      if (window.confirm("Vous allez être déconnecté...")) {
        localStorage.removeItem("pseudo");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
        set_user_connected(false);
        window.location.href = "/";
      }
    } else {
      alert("Aucun utilisateur n'est connecté.");
    }
  };

  // VERIFICATION
  useEffect(() => {
    const userConnected = localStorage.getItem("pseudo");
    if (userConnected) {
      set_user_connected(true);
      // alert("L'utilisateur est déjà connecté. Veuillez-vous déconnecter pour vous connecter avec un autre compte.");
    }
  }, []);

  return (
    <div className="content">
      <div className="navbar">
        <Link to="/" className="logo">Carte<span className="primary">X</span></Link>
        <div className="link">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/Marketplace">Marketplace</Link></li>
            <li><Link to="/Infos">Infos</Link></li>
            <li><Link to="/Personnalisation">Personnalisation</Link></li>
          </ul>
        </div>
        <div className="acc-btn">
          {storedPseudo ? (
            <>
              <div className="user-info">
                Hi, {capitalizeFirstLetter(storedPseudo)}
              </div>
              <div className="connect" onClick={disconnect}>
                Deconnecter
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
            
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/Marketplace" element={<Marketplace />}></Route>
          <Route path="/Infos" element={<Infos />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Connect" element={<Connect />}></Route>
          <Route path="/Personnalisation" element={<Personnalisation/>}></Route>
          <Route path="/details/:cardId" element={<Details />} />
          <Route path="/edit/:cardId" element={<Edit />} />
        </Routes>
      </div>
    </div>
  );
}
