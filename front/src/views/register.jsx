import React from "react";
import { useState } from "react";
// import "../styles/register.css";

export default function Register() {
  const [pseudo, set_pseudo] = useState("");
  const [mdp, set_mdp] = useState("");

  const register = async (event) => {
    event.preventDefault();

    const nouveau_utilisateur = {
      pseudo: pseudo,
      mdp: mdp,
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
        set_mdp("");
        window.location.href = "/";
      } else {
        console.log("Erreur lors de l'ajout de l'utilisateur");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={register}>
        <label htmlFor="pseudo">Pseudo</label>
        <input
          type="text"
          id="pseudo"
          value={pseudo}
          onChange={(e) => set_pseudo(e.target.value)}
        />

        <label htmlFor="mdp">Mot de passe</label>
        <input
          type="text"
          id="mdp"
          value={mdp}
          onChange={(e) => set_mdp(e.target.value)}
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
