import React from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Carroussel.module.css";
import { useState } from "react";

function SampleNextArrow(props) {
  const [message, setMessage] = useState("");

  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        background: "rgba(0, 0, 0, 0.5)",
        cursor: "pointer",
        position: "absolute",
        right: "-35px", // Positionnement par rapport au slider
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "30px",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faChevronRight}
        style={{ fontSize: "30px", color: "white" }}
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        cursor: "pointer",
        position: "absolute",
        left: "-20px", // Positionnement par rapport au slider
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "30px",
        height: "100px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        style={{ fontSize: "25px", color: "white" }}
      />
    </div>
  );
}

const CarrousselRegist = ({ film }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour ouvrir le modal
  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5, // Montre nb films par slide
    slidesToScroll: 4, // Tourne nb de films par click
    centerMode: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles.body}>
      <div className={styles.carrousselContainer}>
        <Slider {...settings}>
          {film.map((film, index) => (
            <div key={index} className={styles.sliderItem}>
              <img
                className={styles.sliderImage}
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                onClick={handleImageClick}
              />
            </div>
          ))}
        </Slider>
      </div>
      {/* isModalOpen est 'true' quand on clique sur une image de film sinon elle est 'false' automatiquement  */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Inscrit toi</h2>
            <p>
              Pour voir plus de détails sur ce film, inscris-toi dès maintenant
              !
            </p>
            <button className={styles.closeButton} onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarrousselRegist;
