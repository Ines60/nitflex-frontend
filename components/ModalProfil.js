import React, { useState } from "react";
import TextFieldComponent from "./TexfieldComponent";
import styles from "../styles/ModalProfil.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

function ModalProfil({ onAddProfile, handleCloseModal }) {
  const [pseudo, setPseudo] = useState("");
  const [message, setMessage] = useState("");
  const [selectedSeed, setSelectedSeed] = useState(""); // Pour stocker l'avatar sélectionné
  const user = useSelector((state) => state.user.value);

  // Cinq seeds différents pour générer cinq avatars selectionné au préalable
  const avatarSeeds = ["Avery", "Sarah", "Adrian", "Aidan", "uniqueSeed5"];

  const handleAddProfil = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

    if (!pseudo || !selectedSeed) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token, // S'assurer que le token existe, sinon omettre
          pseudo: pseudo, // Envoi du pseudo saisi
          avatarSeed: selectedSeed, //Envoi du seed de l'avatar
        }),
      };

      const response = await fetch(
        "http://localhost:3000/profils/signupProfil",
        options
      );

      if (!response.ok) {
        const errorData = await response.json();

        setMessage("Erreur lors de l'ajout du profil.");
        throw new Error("Erreur lors de l'ajout du profil");
      }

      const data = await response.json();

      // Vérifie que la réponse contient bien le nouveau profil
      if (data && data.result && data.newProfil) {
        onAddProfile(data.newProfil); // Passer le nouveau profil au parent
      } else {
        console.error(
          "Le nouveau profil n'a pas été trouvé dans la réponse :",
          data
        );
      }

      // Réinitialiser le pseudo après soumission
      setPseudo("");

      //Fermer le modal
      handleCloseModal();
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Une erreur est survenue lors de l'ajout du profil.");
    }
  };

  const handlePseudoChange = (newPseudo) => {
    setPseudo(newPseudo);
    if (message) {
      setMessage(""); // Réinitialise le message d'erreur lorsque l'utilisateur commence à saisir
    }
  };

  return (
    <div className={styles.modalContent}>
      <div>
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Choisis toi avatar
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {avatarSeeds.map((seed) => (
            <Avatar
              key={seed}
              seed={seed}
              onClick={() => setSelectedSeed(seed)} // Définir l'avatar sélectionné au clic
              isSelected={selectedSeed === seed} // Met en évidence l'avatar sélectionné
            />
          ))}
        </div>
      </div>
      <form className={styles.form} onSubmit={handleAddProfil}>
        <TextFieldComponent
          size="small"
          label={"Pseudo"}
          valueSetter={handlePseudoChange}
          valueGetter={pseudo}
        />
        {message && <p className={styles.errorMessage}>{message}</p>}
        <button className={styles.btn} type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default ModalProfil;
