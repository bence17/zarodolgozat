import React from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import useMessage from "./Message";
import { motion } from "framer-motion";
import Input from "./Input";
import useOraAllasok from "../hooks/useOraallasok";
import useAxios from "../hooks/useAxios";

const FelvitelForm = () => {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState();
  const [inputValues, setInputValues] = useState({
    gaz: 0,
    villany: 0,
    viz: 0,
  });
  const { mutate } = useOraAllasok();
  const { Message, showMessage, setShowMessage, setErrorMsg, setSuccessMsg } =
    useMessage(mutate);

  //text-black/80
  const selectedDateClass =
    "text-xl text-white dark:text-white bg-slate-300/30 p-2 mt-2 rounded-md text-center";

  let dayPickerFooter = <p className={selectedDateClass}>Dátum választása</p>;
  if (selectedDate) {
    dayPickerFooter = (
      <p className={selectedDateClass}>
        Kiválaszott dátum {format(selectedDate, "yyyy-MM-dd")}
      </p>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof selectedDate === "undefined") {
      setErrorMsg("Dátum megadása kötelező!");
      setShowMessage(true);
      return;
    }

    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    await axios
      .post(`/oraAllasok`, {
        gaz: inputValues.gaz,
        villany: inputValues.villany,
        viz: inputValues.viz,
        datum: formattedDate,
      })
      .then((res) => {
        setSuccessMsg(res?.data?.message);
        setShowMessage(true);
      })
      .catch((err) => {
        setErrorMsg(err?.response?.data?.error);
        setShowMessage(true);
      });
  };

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  const dayPickerDayHover = `.rdp-button:hover {
    background-color: white;
    color: black;
    font-weight: bold;
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -150 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-7 self-start"
    >
      <style>{dayPickerDayHover}</style>
      {/* Ha a showMessage értéke igaz akkor a Message komponens megjelenik */}
      {showMessage && <Message />}
      <h1 className="text-5xl font-bold">Új óraállás hozzáadása</h1>

      {/* Inputs */}
      <form className="grid gap-3 self-auto" onSubmit={handleSubmit}>
        {/* Gáz */}
        <label htmlFor="gaz" className="text-3xl">
          Gáz
        </label>
        <Input
          id="gaz"
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              gaz: Number(e.target.value),
            }))
          }
          defaultValue={inputValues.gaz}
          type="number"
          min={0}
          step={0.1}
          required
        />

        {/* Villany */}
        <label htmlFor="villany" className="text-3xl">
          Villany
        </label>
        <Input
          id="villany"
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              villany: Number(e.target.value),
            }))
          }
          defaultValue={inputValues.villany}
          type="number"
          min={0}
          step={0.1}
          required
        />

        {/* Víz */}
        <label htmlFor="viz" className="text-3xl">
          Víz
        </label>
        <Input
          id="viz"
          onChange={(e) =>
            setInputValues((prev) => ({
              ...prev,
              viz: Number(e.target.value),
            }))
          }
          defaultValue={inputValues.viz}
          type="number"
          min={0}
          step={0.1}
          required
        />

        {/* Date */}
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          footer={dayPickerFooter}
          modifiersStyles={{
            selected: {
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            },
          }}
          className="justify-self-center"
        />
        {/* Submit */}
        <button
          type="submit"
          className="text-xl font-semibold border-2 border-indigo-900
              dark:border-white opacity-90 hover:opacity-100 px-5 py-1
               rounded-md justify-self-end"
        >
          Felvitel
        </button>
      </form>
    </motion.div>
  );
};

export default FelvitelForm;
