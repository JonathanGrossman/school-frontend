import React, { useEffect } from "react";

const Alert = props => {
  const { type, h } = props;

  useEffect(() => {
    if (type === "success") {
      setTimeout(() => {
        h.push("/students");
      }, 1000);
    }
  }, []);

  return <div className={type}>{type}</div>;
};

export default Alert;
