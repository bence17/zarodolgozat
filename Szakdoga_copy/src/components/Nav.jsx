import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUnity, FaUser } from "react-icons/fa";
import useUser from "../hooks/useUser";

const Nav = () => {
  const navigate = useNavigate();
  const { user, deleteUserCookie } = useUser();

  const handleLogout = (e) => {
    e.preventDefault();

    deleteUserCookie();
    navigate("/");
  };

  return (
    <nav className="border-b-2 border-white/70 flex items-center justify-between w-full p-5">
      <ul className="flex gap-8">
        <li>
          <Link
            to={"/kezdolap"}
            className="flex items-start gap-3 text-xl font-semibold"
          >
            <FaUnity fontSize={"1.8em"} />
            Kezdőlap
          </Link>
        </li>
        <li>
          <Link to={"/kezeles"} className="text-xl font-semibold">
            Kezelés
          </Link>
        </li>
      </ul>
      <div className="dropdown">
        <Link to={"/login"} className="text-xl font-semibold">
          <button id="dropdownBtn" className="flex gap-2 items-center">
            <FaUser fontSize={"1.2em"} />
            {user ? user.name : "Bejelentkezés"}
          </button>
        </Link>
        <div className="dropdown-content">
          <a href="#">Vissza jelzés</a>
          <a href="#">Szerkesztés</a>
          {user && (
            <a href="#" onClick={handleLogout}>
              Kijelentkezés
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
