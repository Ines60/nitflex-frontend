import React, { useState } from "react";
import TextFieldComponent from "./TexfieldComponent";
import styles from "../styles/ModalProfil.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

function ModalProfil({ onAddProfile, handleCloseModal }) {
  const [pseudo, setPseudo] = useState("");
  const user = useSelector((state) => state.user.value);

  const handleAddProfil = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire

    if (!pseudo) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: user.token, // S'assurer que le token existe, sinon omettre
          pseudo: pseudo, // Envoi du pseudo saisi
        }),
      };

      const response = await fetch(
        "http://localhost:3000/profils/signupProfil",
        options
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur du serveur:", errorData);
        throw new Error("Erreur lors de l'ajout du profil");
      }

      const data = await response.json();
      console.log("Profil ajouté avec succès :", data);

      // Vérifie que la réponse contient bien le nouveau profil
      if (data && data.result && data.newProfil) {
        console.log("Nouveau profil reçu:", data.newProfil);
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
      alert("Une erreur est survenue lors de l'ajout du profil.");
    }
  };

  return (
    <div className={styles.modalContent}>
      <form className={styles.form} onSubmit={handleAddProfil}>
        <TextFieldComponent
          style={{ width: 200 }}
          label={"Pseudo"}
          valueSetter={setPseudo}
          valueGetter={pseudo}
        />
        <button className={styles.btn} type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default ModalProfil;
