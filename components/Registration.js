import styles from "../styles/Registration.module.css";
import TextFieldComponent from "./TexfieldComponent";
import PasswordComponent from "./TexfieldPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Carroussel from "./CarrousselRegist";
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

  const emailRegex =
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
    if (!emailRegex.test(signupEmail)) {
      setMessage("Veuillez entrer un email valide !");
      return;
    }

    setMessage("");

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
        if (data.error) {
          setMessage(
            "Cet email existe déjà. Veuillez utiliser un autre email."
          );
        } else if (data.result) {
          dispatch(
            login({
              token: data.newUser.token,
            })
          );

          setSignupEmail("");
          setSignupPassword("");
          router.push("/profil");
        }
      })
      .catch((error) => {
        setMessage(
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
        );
      });
  };

  const handleSignInClick = () => {
    router.push("/signin");
  };

  if (!film) return <div className={styles.loading}>Loading...</div>;

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.head}>
          <div className={styles.headHead}>
            <img src="" />
            <button onClick={handleSignInClick} className={styles.btn}>
              S'identifier
            </button>
          </div>
          <div className={styles.containerHead}>
            <h2 className={`${styles.text} ${styles.title}`}>
              Trouver une idée de <br />
              films ou séries pour votre soirée
            </h2>
            <p className={`${styles.text} ${styles.para}`}>
              Besoin d'inspiation ?<br />
              Inscrivez-vous, WIM est la pour vous aider !!!
            </p>
            <div className={styles.info}>
              <TextFieldComponent
                label={"E-mail"}
                valueSetter={setSignupEmail}
                valueGetter={signupEmail}
              />
              <PasswordComponent
                label={"Mot de passe"}
                valueSette={setSignupPassword}
                valueGette={signupPassword}
                type="password"
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className={styles.btnContai} onClick={handleSignUp}>
                  {" "}
                  Commencer <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
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
