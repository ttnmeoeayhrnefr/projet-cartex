import React from "react";
import { useState } from "react";
// import "../styles/register.css";

export default function Register() {
  const [pseudo, set_pseudo] = useState("");
  const [mot_de_passe, set_mot_de_passe] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const nouveau_utilisateur = {
      pseudo: pseudo,
      mot_de_passe: mot_de_passe,
    };

    try {
      //Ajout user dans BDD
      const response = await fetch("http://localhost:3001/utilisateurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveau_utilisateur),
      });

      if (response.ok) {
        console.log("Utilisateur ajouté avec succès");
        set_pseudo("");
        set_mot_de_passe("");
        window.location.href = "/"; //Redirection vers la page d'accueil
      } else {
        console.log("Erreur lors de l'ajout de l'utilisateur");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        />

        <label htmlFor="mot_de_passe">Mot de passe</label>
        <input
          type="text"
          id="mot_de_passe"
          value={mot_de_passe}
          onChange={(e) => set_mot_de_passe(e.target.value)}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
