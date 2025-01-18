import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Carroussel.module.css";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        display: "flex",
        background: "rgba(0, 0, 0, 0.5)",
        cursor: "pointer",
        position: "absolute",
        right: "5px",
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
        left: "5px",
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

const CarrousselCommun = ({ film }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState(null); //Film seectionné
  const [streamingPlatforms, setStreamingPlatforms] = useState([]); //Plateforme de streaming

  const apiKey = "a9f4d3004f4dc397603808cfdd7842b7";

  // EncodeURIComponet(title) = transforme le titre pour qu'il soit compatible avec une URL
  // Parametre title = nom du film que l'utilisateur veut rehercher
  // fonction fléchée qui prend en parametre le 'titre' et retourne une URL de recherche personalisée

  const PLATFORM_SEARCH_LINKS = {
    Netflix: (title) =>
      `https://www.netflix.com/search?q=${encodeURIComponent(title)}`,
    "Amazon Prime Video": (title) =>
      `https://www.primevideo.com/search/ref=atv_nb_sr?phrase=${encodeURIComponent(
        title
      )}`,
    "Disney Plus": (title) =>
      `https://www.disneyplus.com/search/${encodeURIComponent(title)}`,
    "Apple TV+": (title) =>
      `https://tv.apple.com/search/${encodeURIComponent(title)}`,
    "HBO Max": (title) =>
      `https://www.max.com/search?q=${encodeURIComponent(title)}`,
  };

  // Récupérer les plateformes de streaming
  const fetchStreamingPlatforms = async (filmId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${filmId}/watch/providers?api_key=${apiKey}`
      );
      const data = await response.json();
      const providers = data.results?.FR?.flatrate;
      if (providers) {
        setStreamingPlatforms(providers);
      } else {
        setStreamingPlatforms([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des plateformes :", error);
      setStreamingPlatforms([]);
    }
  };

  const handleImageClick = (film) => {
    setSelectedFilm(film); //Enregistre le film selectionné
    fetchStreamingPlatforms(film.id); //Récupère les plateformes
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
    setStreamingPlatforms([]);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 6,
    centerMode: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className={styles.body}>
      <div className={styles.carrousselContainer}>
        <Slider {...settings}>
          {film.map((film) => (
            <div key={film.id} className={styles.sliderItem}>
              <img
                className={styles.sliderImage}
                src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                alt={film.title}
                onClick={() => handleImageClick(film)}
              />
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && selectedFilm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{selectedFilm.title}</h2>
            <p>{selectedFilm.overview}</p>
            {/* Liens vers les plateformes */}
            {streamingPlatforms.length > 0 ? (
              <div className={styles.streamingLinks}>
                <h3>Disponible sur :</h3>
                <ul>
                  {streamingPlatforms.map((platform) => (
                    <li key={platform.provider_id}>
                      <a
                        href={
                          platform.link ||
                          PLATFORM_SEARCH_LINKS[platform.provider_name]?.(
                            selectedFilm.title
                          ) ||
                          "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.platformLink}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w92${platform.logo_path}`}
                          alt={platform.provider_name}
                          className={styles.platformLogo}
                        />
                        {platform.provider_name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Ce film n'est pas disponible en streaming.</p>
            )}
            <button className={styles.closeButton} onClick={closeModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarrousselCommun;
