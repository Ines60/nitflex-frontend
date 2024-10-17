import React, { Component } from "react";
import { TextFieldComponent } from "../Component/TextFieldComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Home.module.css";

function SignIn() {
  const [login, setLogin] = useState(false);
  const [connected, setConnected] = useState(false);
  const [clientLogout, setClientLogout] = useState(false);
  const [signInEmail, setSignInEmail] = useState(" ");
  const [signPassword, setSignInPassword] = useState(" ");
  const [signError, setSignError] = useState(" ");

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signPassword,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              email: data.email,
              password: data.password,
            })
          );
          window.location.href = "/clientwelcome";
          setSignInEmail("");
          setSignInPassword("");
        } else {
          console.log(data.error);
          toast.error(data.error);
        }
      });
  };
}

return <TextFieldComponent></TextFieldComponent>;

export default SignIn;
