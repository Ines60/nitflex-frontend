import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/CarrousselAcceuil.module.css";

const Carroussel = ({ film }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Affiche une image à la fois
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    arrows: false,
  };

  return (
    <div className={styles.body}>
      <div className={styles.carrousselContainer}>
        <Slider {...settings}>
          {film &&
            film.map((filmItem, index) => (
              <div key={index} className={styles.sliderItem}>
                <div className={styles.imageContainer}>
                  <img
                    className={styles.sliderImage}
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${filmItem.backdrop_path})`,
                    }}
                    src={`https://image.tmdb.org/t/p/original${filmItem.backdrop_path}`}
                    alt={filmItem.title || filmItem.name}
                  />
                  <div className={styles.overlay}>
                    <h3 className={styles.title}>
                      {filmItem.title || filmItem.name}
                    </h3>
                    <p className={styles.rating}>
                      Note : {filmItem.vote_average} / 10
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carroussel;
