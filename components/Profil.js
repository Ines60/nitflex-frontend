import React, { useState, useEffect } from "react";
import styles from "../styles/Profil.module.css";
import Modal from "react-modal";
import ModalProfil from "./ModalProfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { updateProfile } from "../reducers/user";

function Profil() {
  const [modalOpen, setModalOpen] = useState(false);
  const [profilsData, setProfilsData] = useState([]);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const [isProfilClicked, setIsProfilClicked] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  //La fonction me permet de récupérer les profil qui correspond à l'user et qui peut etre de nouveau utilisé si besoin
  const fetchProfils = () => {
    fetch("http://localhost:3000/profils")
      .then((response) => response.json())
      .then((data) => {
        setProfilsData(data.profil); // Met à jour l'état avec les profils récupérés
      });
  };

  useEffect(() => {
    fetchProfils(); // Récupérer les profils au premier rendu, de cette facon le back ne tourne pas en boucle
  }, []);

  // Fonction pour ajouter un profil à la liste existante et limiter a 5 profils par user
  const handleAddProfile = (newProfil) => {
    if (profils.length < 5) {
      // Appel à l'API pour créer un nouveau profil
      fetch("http://localhost:3000/profils/signupProfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfil),
      })
        .then((response) => response.json())
        .then(() => {
          fetchProfils(); // Après la création, rafraîchir les profils depuis l'API
        });
    } else {
      alert("Vous ne pouvez pas ajouter plus de 5 profils.");
    }
  };

  //Supprimer le profil qui correspond au click
  const handleDeleteProfil = (profilId) => {
    fetch("http://localhost:3000/profils/deleteProfil", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, profilId: profilId }), //Envoi du token de l'user et de l'id du profil
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          fetchProfils(); //Rafraichir les profils apres la supp
        } else {
        }
      })
      .catch((err) => {
        console.error("Erreur réseau ou du serveur : ", err);
      });
  };

  // Fonction pour ouvrir la modal
  const handleOpenModalProfil = () => {
    setIsIconClicked(true);
    setModalOpen(true);

    //Pour remettre l'icone à la taille normal après 100ms
    setTimeout(() => setIsIconClicked(false), 100);
  };

  // Fonction pour fermer la modal
  const handleCloseModalProfil = () => {
    setModalOpen(false);
  };

  const handleProfils = (profilId, pseudo, avatarSeed) => {
    console.log("Avatar selectionné: ", avatarSeed);

    setIsProfilClicked(profilId);
    dispatch(updateProfile({ pseudo, avatar: avatarSeed }));
    router.push("/acceuil");

    setTimeout(() => setIsProfilClicked(false), 100);
  };

  //Filtre les profils créer pour afficher que ce de l'utilisateur
  const profils = profilsData.filter((profil, i) => {
    return profil.user.token === user.token;
  });

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h2>Profils</h2>

        {/* Laisse le bouton 'ajout d'un profil' s'il y a moins de 5 sinon il l'enleve  */}
        {profils.length < 5 && (
          <FontAwesomeIcon
            icon={faUserPlus}
            className={`${styles.iconProfil} ${
              isIconClicked ? styles.clicked : ""
            }`}
            onClick={handleOpenModalProfil}
          />
        )}
      </div>
      <div className={styles.container}>
        <div>
          {profils.length > 0 && <p className={styles.QET}>Qui es-tu ?</p>}
        </div>
        <div className={styles.containerProfils}>
          {profils.length > 0 ? (
            profils.map((prof) => (
              <div className={styles.profils} key={prof.id}>
                <div className={styles.trashIconContainer}>
                  <FontAwesomeIcon
                    onClick={() => handleDeleteProfil(prof._id)} //Permet de passer l'id du profil au click
                    icon={faTrashCan}
                    className={styles.trashIcon}
                  />
                </div>
                <div>
                  <img
                    src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(
                      prof.avatarSeed
                    )}&size=128`}
                    alt="Avatar"
                    style={{
                      width: 128,
                      height: 128,
                      cursor: "pointer",
                    }}
                    className={
                      isProfilClicked === prof._id ? styles.clickedAvatar : ""
                    }
                    onClick={() =>
                      handleProfils(prof._id, prof.pseudo, prof.avatarSeed)
                    }
                  />
                </div>
                <p style={{ marginBottom: "10px" }}>{prof.pseudo}</p>
              </div>
            ))
          ) : (
            <p className={styles.cvp}> Créer votre profil ! </p>
          )}
        </div>
      </div>

      <div className={styles.containerModal}>
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
    </div>
  );
}

export default Profil;
