import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/loginReg.css";
import axios from "../lib/axios";
import useMessage from "./Message";

export const Login = (props) => {
  // Username can be an email or an username
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const { Message, showMessage, setShowMessage, setErrorMsg } = useMessage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/login", { username, pwd })
      .then(() => navigate("/kezdolap"))
      .catch((err) => {
        setErrorMsg(err?.response?.data?.error);
        setShowMessage(true);
      });
  };

  return (
    <div className="container">
      <div className="auth-form-container">
        <h1 className="title">Bejelentkezés</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Felhasználónév</label>
          <input
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="youremail@gmail.com, user01"
            id="username"
            name="username"
            required
          />
          <label htmlFor="password">Jelszó</label>
          <input
            defaultValue={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            required
          />
          <button type="submit" id="button">
            Belépés
          </button>
        </form>
        <Link to={"/register"} className="link-btn">
          Nincs még accont-ja? Regisztráljon itt.
        </Link>
      </div>
      {showMessage && <Message />}
    </div>
  );
};
