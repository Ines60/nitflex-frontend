import styles from "../styles/Registration.module.css";
import TextFieldComponent from "./TexfieldComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Carroussel from "./Carroussel";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

function Registration() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [film, setFilm] = useState(null);
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [message, setMessage] = useState("");

  const apiKey = "a9f4d3004f4dc397603808cfdd7842b7"; // clé API TMDB

  const regex =
    /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=fr`
        );
        const data = await response.json();
        setFilm(data.results);
      } catch (error) {
        console.error("Error fetching film data:", error);
      }
    };

    fetchFilmData();
  }, [apiKey]);

  const handleSignUp = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Réponse complète du serveur :", data);
        if (data.result) {
          dispatch(
            login({
              token: data.newUser.token,
            })
          );

          setSignupEmail("");
          setSignupPassword("");
          router.push("/profil");
        }
      });
  };

  if (!film) return <div>Loading...</div>;

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.head}>
          <div className={styles.headHead}>
            <img src="" />
            <button className={styles.btn}>S'identifier</button>
          </div>
          <div className={styles.containerHead}>
            <h2 className={`${styles.text} ${styles.title}`}>
              Films et séries en
              <br /> illimité, et bien plus
            </h2>
            <p className={`${styles.text} ${styles.para}`}>
              Prêt à regarder Netflix ? Saisissez votre adresse e-mail pour vous
              abonner ou
              <br /> réactiver votre abonnement.
            </p>
            <div className={styles.info}>
              <TextFieldComponent
                // size={"small"}
                style={{ width: 600 }}
                label={"E-mail"}
                valueSetter={setSignupEmail}
                valueGetter={signupEmail}
              />
              <TextFieldComponent
                style={{ width: 600 }}
                label={"Mot de passe"}
                valueSetter={setSignupPassword}
                valueGetter={signupPassword}
              />
              <button className={styles.btnContai} onClick={handleSignUp}>
                {" "}
                Commencer <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>
        <div className={styles.containerBody}>
          <div className={styles.tendance}>
            <Carroussel film={film} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Registration;
