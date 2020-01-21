import React from "react";

const Button = props => {
  const { sendFormData } = props;
  const handleClick = () => {
    sendFormData();
  };
  return (
    <button className="button" onClick={e => handleClick(e)}>
      Submit
    </button>
  );
};

export default Button;
