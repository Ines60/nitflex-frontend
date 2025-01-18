import { useState, useEffect } from "react";
import styles from "../styles/Acceuil.module.css";
import Carroussel from "./CarrousselAcceuil";
import CarrousselCommun from "./CarrousselCommun";
import Header from "./Header";

function Acceuil() {
  const [film, setFilm] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filmsByGenre, setFilmsByGenre] = useState({
    action: [],
    comedy: [],
    drama: [],
    horror: [],
    romance: [],
    fantastique: [],
    adventure: [],
    animation: [],
    documentary: [],
    family: [],
    fiction: [],
    music: [],
    mystery: [],
    history: [],
  });
  const apiKey = "a9f4d3004f4dc397603808cfdd7842b7";

  useEffect(() => {
    const fetchFilm = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&language=fr`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFilm(data.results || []); // Fournir un tableau vide par défaut
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilm();
  }, [apiKey]);

  useEffect(() => {
    const fetchFilmsByGenre = async () => {
      try {
        const genreResponse = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=fr-FR`
        );
        const genreData = await genreResponse.json();

        const genreIds = genreData.genres.map((genre) => genre.id);

        const fetchFilmsForGenre = async (genreId, genreName) => {
          let allFilms = [];
          const totalPages = 5; // Nombre de pages à récupérer

          for (let page = 1; page <= totalPages; page++) {
            const filmsResponse = await fetch(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=fr-FR&sort_by=popularity.desc&page=${page}`
            );
            const filmsData = await filmsResponse.json();

            allFilms = [...allFilms, ...filmsData.results];
          }

          setFilmsByGenre((prevState) => ({
            ...prevState,
            [genreName]: allFilms,
          }));
        };

        const genreNames = [
          "action",
          "comedy",
          "drama",
          "horror",
          "romance",
          "fantastique",
          "adventure",
          "animation",
          "documentary",
          "family",
          "fiction",
          "music",
          "mystery",
          "history",
        ];

        genreNames.forEach((genreName, index) => {
          fetchFilmsForGenre(genreIds[index], genreName);
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des films par genre :",
          error
        );
      }
    };

    fetchFilmsByGenre();
  }, [apiKey]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className={styles.body}>
      <Header />
      {film.length > 0 ? (
        <div className={styles.carroussel}>
          <Carroussel film={film} />
        </div>
      ) : (
        <div>Aucun film à afficher.</div>
      )}
      {/* Afficher les films par genre */}
      {Object.keys(filmsByGenre).map((genreName) => {
        const films = filmsByGenre[genreName];
        return films.length > 0 ? (
          <div key={genreName} className={styles.filmsByGenre}>
            <span className={styles.title}>
              {genreName.charAt(0).toUpperCase() + genreName.slice(1)}
            </span>
            <CarrousselCommun
              film={films}
              className={styles.carrousselAction}
            />
          </div>
        ) : null;
      })}
    </div>
  );
}

export default Acceuil;
