import React, { useState } from "react";
import { useEffect } from "react";
import AnimatedPage from "../components/AnimatedPage";
import Table from "../components/Tables";
import useAxios from "../hooks/useAxios";

const Kezeles = () => {
  const axios = useAxios();
  const [oraAllasok, setOraAllasok] = useState([]);

  useEffect(() => {
    const getOraAllasok = async () => {
      await axios
        .get("http://localhost:3001/oraAllasok?novekvo=false")
        .then((res) => setOraAllasok(res.data))
        .catch(() => setOraAllasok(null));
    };

    getOraAllasok();
  }, []);

  if (!oraAllasok) {
    return <h1>Error</h1>;
  }

  if (oraAllasok.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <AnimatedPage className="py-10">
      <h1 className="text-2xl font-bold text-center">Kezelés</h1>
      <Table oraAllasok={oraAllasok} />
    </AnimatedPage>
  );
};

export default Kezeles;
