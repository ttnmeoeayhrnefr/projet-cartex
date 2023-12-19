import React from "react";
import { useEffect, useState } from "react";
// import "../styles/register.css";

export default function Register() {
  // VARIABLES POUR INSCRIPTION UTILISATEUR
  const [pseudo, set_pseudo] = useState("");
  const [mdp, set_mdp] = useState("");
  const [user_connected, set_user_connected] = useState(false);

  // INSCRIPTION UTILISATEUR
  const register = async (event) => {
    event.preventDefault();

    // DATA UTILISATEUR
    const new_user = {
      pseudo: pseudo,
      mdp: mdp,
    };

    // VERIFICATION, PAS DE CREATION D'UTILISATEUR "VIDE" ET EVITE PROBLEME SI DEJA CONNECTE
    if (!pseudo || !mdp) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // UTILISATION API AVEC FETCH
      const response = await fetch("http://localhost:3001/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(new_user),
      });

      if (response.ok) {
        // INSCRIPTION REUSSIE
        console.log("Utilisateur ajouté avec succès");
        set_pseudo("");
        set_mdp("");
        window.location.href = "/";
      } else {
        // INSCRIPTION NON REUSSIE
        console.log("Erreur lors de l'ajout de l'utilisateur");
      }
    } catch (err) {
      console.log(err);
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
    <div className="register">
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          id="pseudo"
          value={pseudo}
          onChange={(e) => set_pseudo(e.target.value)}
          disabled={user_connected}
        />

        <label htmlFor="mdp">Mot de passe</label>
        <input
          type="text"
          id="mdp"
          value={mdp}
          onChange={(e) => set_mdp(e.target.value)}
          disabled={user_connected}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
