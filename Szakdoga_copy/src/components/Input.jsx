import React from "react";

const Input = (props) => {
  return (
    //A kapott props elemeket továbbítja stílussal
    <input
      {...props}
      className={`${props.className} bg-white/10 border-2 border-white/80 font-bold px-3 py-2 rounded-md invalid:bg-red-600/80 text-inherit`}
    />
  );
};

export default Input;
