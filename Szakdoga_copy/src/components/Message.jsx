import React, { useState } from "react";

const useMessage = (mutate) => {
  const [showMessage, setShowMessage] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  //az ablak bezárása után újratölti az adatokat a diagramban
  const handleClose = () => {
    if (typeof mutate === "function") {
      mutate(); // Refresh the chart
    }

    setShowMessage(false);
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const Message = () => (
    <div
      className={`absolute w-screen h-screen z-50 flex flex-col gap-10 items-center justify-center top-0 left-0 bg-black/20`}
    >
      <div className="w-fit h-fit z-10 px-16 py-8 flex flex-col gap-6 items-center justify-center top-0 left-0 text-white bg-black/80 border-2 border-white/20 backdrop-blur-md">
        {successMsg ? (
          <h1 className="text-3xl">{successMsg}</h1>
        ) : (
          <h1 className="text-3xl">{errorMsg}</h1>
        )}
        <button
          className="text-2xl font-medium px-3 py-2 border-2 border-white/40 rounded-md hover:opacity-70"
          onClick={handleClose}
          tabIndex={1}
        >
          Bezár
        </button>
      </div>
    </div>
  );

  return {
    Message,
    showMessage,
    setShowMessage,
    setSuccessMsg,
    setErrorMsg,
  };
};

export default useMessage;
