import React from "react";
import FelvitelForm from "../components/FelvitelForm";
import LineChart from "../components/LineChart";
import AnimatedPage from "../components/AnimatedPage";

export default function Kezdolap() {
  return (
    <AnimatedPage className="self-center w-screen h-auto overflow-x-hidden flex flex-col items-center justify-center gap-28 px-5 py-[1em] md:min-[1380px]:flex-row">
      <FelvitelForm />
      <LineChart />
    </AnimatedPage>
  );
}
