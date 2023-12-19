import React from "react";
import { useEffect, useState } from "react";
import "../style/connexion.scss";
import { Link, Route, Routes } from 'react-router-dom'

export default function Connexion() {
  // VARIABLES POUR CONNEXION DECONNEXION UTILISATEUR
  const [pseudo, set_pseudo] = useState("");
  const [mdp, set_mdp] = useState("");
  const [user_connected, set_user_connected] = useState(false);

  // CONNEXION UTILISATEUR
  const connect = async (event) => {
    event.preventDefault();

    // UTILISATION API AVEC FETCH
    try {
      const response = await fetch("http://localhost:3001/connexion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, mdp }),
      });

      const data = await response.json();

      if (response.ok) {
        // CONNEXION REUSSIE
        console.log(data.message);
        const user_id = data.user_id;
        localStorage.setItem("pseudo", pseudo);
        localStorage.setItem("user_id", user_id);
        window.location.href = "/";
      } else {
        // CONNEXION NON REUSSIE
        console.log(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // DECONNEXION UTILISATEUR ET CLEAR DU LOCALSTORAGE
  const disconnect = () => {
    if (user_connected) {
      if (
        window.confirm(
          "Vous allez être déconnecté et votre panier sera vidé. Êtes-vous sûr de vouloir continuer ?"
        )
      ) {
        // localStorage.clear();
        localStorage.removeItem("pseudo");
        localStorage.removeItem("user_id");
        // localStorage.removeItem("deck"); TODO SI DECK DANS PROJET?
        set_user_connected(false);
        window.location.href = "/";
      }
    } else {
      alert("Aucun utilisateur n'est connecté.");
    }
  };

  // VERIFICATION
  useEffect(() => {
    const user_connected = localStorage.getItem("pseudo");
    if (user_connected) {
      set_user_connected(true);
      alert("Un utilisateur est déjà connecté.");
      document.getElementById("pseudo").disabled = true;
      document.getElementById("mdp").disabled = true;
    }
  }, []);

  return (
    <div className="connexion-page">
      <div className="container">
        <div className="title">
          <h1>Connexion</h1>
        </div>
        <div className="form">
          <form onSubmit={connect}>
            <div className="pseudo">
              <input
                type="text"
                id="pseudo"
                placeholder="Pseudo..."
                value={pseudo}
                onChange={(e) => set_pseudo(e.target.value)}
                disabled={user_connected}
              />
            </div>
            <div className="pwd">
              <input
                type="password"
                id="mdp"
                placeholder="Password..."
                value={mdp}
                onChange={(e) => set_mdp(e.target.value)}
                disabled={user_connected}
              />
            </div>
            <div className="text">
              <Link to="/Connect">Mots de passe oublié ?</Link>
            </div>
            <div className="btn-connect">
              <button onClick={disconnect}>Se déconnecter</button>
              <button type="submit">Se connecter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
