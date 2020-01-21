import React, { useState, useEffect } from "react";

const Checkbox = props => {
  const { skill, array, setArray, forEditArray } = props;
  const [value, setValue] = useState("");

  const handleChange = e => {
    const skill = e.target.name;
    const level = e.target.value;
    const selectedObject = { skill, level };
    setValue(e.target.value);

    if (array.filter(object => object.skill === skill)) {
      let filtered = array.filter(function(item) {
        return item.skill != selectedObject.skill;
      });
      setArray(filtered);
    }
    if (selectedObject.level != "0") {
      setArray(prevArray => [...prevArray, selectedObject]);
    }
  };

  const getValue = () => {
    if (forEditArray.filter(object => object.skill === skill)) {
      forEditArray.filter(object => {
        let parsedSkillObject = object;
        if (skill == parsedSkillObject.skill) {
          setValue(parsedSkillObject.level);
          return;
        }
      });
    } else {
      setValue(0);
    }
  };

  useEffect(() => {
    getValue();
  }, [forEditArray]);

  return (
    <label>
      <input
        type="number"
        min="0"
        max="5"
        name={skill}
        value={value}
        className="input-number"
        onChange={e => handleChange(e)}
      />
      {skill}
    </label>
  );
};

export default Checkbox;
