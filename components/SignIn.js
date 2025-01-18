import styles from "../styles/Signin.module.css";
import TextFieldComponent from "./TexfieldComponent";
import PasswordComponent from "./TexfieldPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../reducers/user";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex =
    /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const user = useSelector((state) => state.user.value);

  const handleSignIn = () => {
    setMessage("");

    fetch("http://localhost:3000/users/signin", {
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
          setMessage("Inscrivez-vous avant de vous connecter !");
        } else if (data.result) {
          dispatch(
            login({
              token: data.user.token,
            })
          );
          setSignupEmail("");
          setSignupPassword("");
          router.push("/profil");
        }
      });
  };

  const handleSignup = () => {
    router.push("/");
  };

  return (
    <main className={styles.main}>
      <div className={styles.head}>
        <div className={styles.signin}>
          <p style={{ display: "flex", justifyContent: "center" }}>
            S'identifier
          </p>
          <TextFieldComponent
            style={{ width: 600 }}
            label={"E-mail"}
            valueSetter={setSignupEmail}
            valueGetter={signupEmail}
          />
          <PasswordComponent
            style={{ width: 600 }}
            label={"Mot de passe"}
            valueSette={setSignupPassword}
            valueGette={signupPassword}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleSignIn} className={styles.btnSignin}>
              S'identifier
            </button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
          <p className={styles.signup}>
            Pas encore indcrit ?
            <span
              onClick={handleSignup}
              style={{
                color: "red",
                cursor: "pointer",
                marginLeft: "0.25rem",
              }}
            >
              Inscrivez-vous
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
