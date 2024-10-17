import React, { useState, useEffect } from "react";
import styles from "../styles/Profil.module.css";
import Modal from "react-modal";
import ModalProfil from "./ModalProfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Profil() {
  const [modalOpen, setModalOpen] = useState(false);
  const [profilsData, setProfilsData] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    fetch("http://localhost:3000/profils")
      .then((response) => response.json())
      .then((data) => {
        setProfilsData(data.profil);
      });
  }, [profilsData]);

  // Fonction pour ajouter un profil à la liste existante
  const handleAddProfile = (newProfil) => {
    console.log("Nouveau profil ajouté:", newProfil);
    setProfilsData((prevProfils) => [...prevProfils, newProfil]); // Ajoute le nouveau profil à la liste
    console.log("Après mise à jour des profils:", [...profilsData, newProfil]);
  };

  // Fonction pour ouvrir la modal
  const handleOpenModalProfil = () => {
    setModalOpen(true);
  };

  // Fonction pour fermer la modal
  const handleCloseModalProfil = () => {
    setModalOpen(false);
  };

  const profils = profilsData.filter((profil, i) => {
    return profil.user.token === user.token;
  });

  return (
    <div className={styles.containt}>
      <div className={styles.body}>
        <h2>Profils</h2>

        <FontAwesomeIcon
          icon={faUserPlus}
          className={styles.iconProfil}
          onClick={handleOpenModalProfil}
        />
        {profils.length > 0 ? (
          profils.map((prof, i) => (
            <div key={i || prof.id}>
              <p> Pseudo: {prof.pseudo}</p>
            </div>
          ))
        ) : (
          <p> Créer votre profil ! </p>
        )}
      </div>

      <Modal
        className={styles.modal}
        isOpen={modalOpen}
        onRequestClose={handleCloseModalProfil}
      >
        <ModalProfil
          onAddProfile={handleAddProfile}
          className={styles.profileItem}
          handleCloseModal={handleCloseModalProfil}
        />
      </Modal>
    </div>
  );
}

export default Profil;
