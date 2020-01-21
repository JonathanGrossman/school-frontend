import React from "react";

const Alert = props => {
  const { type } = props;

  return <div className={type}>{type}</div>;
};

export default Alert;
