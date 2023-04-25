import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import "../styles/loginReg.css";
import axios from "../lib/axios";
import useMessage from "./Message";

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const { Message, showMessage, setShowMessage, setErrorMsg, setSuccessMsg } =
    useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/register", { username, email, pwd })
      .then((res) => {
        setSuccessMsg(res?.data?.message);
        setShowMessage(true);
      })
      .catch((err) => {
        setErrorMsg(err?.response?.data?.error);
        setShowMessage(true);
      });
  };

  // Particles
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div className="container">
      <Particles
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="auth-form-container z-50">
        <h1 className="title">Regisztráció</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Felhasználó név</label>
          <input
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            id="name"
            placeholder="Felhasználó név"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
            required
          />
          <label htmlFor="password">Jelszó</label>
          <input
            defaultValue={pwd}
            onChange={(e) => setPwd(e.target.value)}
            type="password"
            placeholder="*************"
            id="password"
            name="password"
            required
          />
          <button type="submit" id="button">
            Regisztráció
          </button>
        </form>
        <Link to={"/login"} className="link-btn">
          Van már account-ja? Lépjen be.
        </Link>
      </div>
      {showMessage && <Message />}
    </div>
  );
};
