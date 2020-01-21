import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Alert from "./Alert";
import axios from "axios";

const AddStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [magicSkills, setMagicSkills] = useState([]);
  const [desiredSkills, setDesiredSkills] = useState([]);
  const [interestedCourses, setInterestedCourses] = useState([]);
  const [formData, setFormData] = useState([]);
  const [alertShowing, setAlertShowing] = useState(false);
  const [alertType, setAlertType] = useState("");

  const magic_skills = [
    "Alchemy",
    "Animation",
    "Conjuror",
    "Disintegration",
    "Elemental",
    "Healing",
    "Illusion",
    "Immortality",
    "Invisibility",
    "Invulnerability",
    "Necromancer",
    "Omnipresent",
    "Omniscient",
    "Poison",
    "Possession",
    "Self-detonation",
    "Summoning",
    "Water breathing"
  ];

  const school_courses = [
    "Alchemy basics",
    "Alchemy advanced",
    "Magic for day-to-day life",
    "Magic for medical professionals",
    "Dating with magic"
  ];

  const handleFirstNameChange = e => {
    const selected = e.target.value;
    if (selected.length > 0) {
      setFirstName(selected);
    }
  };

  const handleLastNameChange = e => {
    const selected = e.target.value;
    if (selected.length > 0) {
      setLastName(selected);
    }
  };

  const sendFormData = () => {
    axios
      .post("http://localhost:7000/api/add-student", formData)
      .then(res => {
        if (res.status === 200) {
          setAlertType("success");
        }
      })
      .catch(err => {
        setAlertType("error");
      });
  };

  useEffect(() => {
    const user_uuid = Math.floor(Math.random() * 1000000000) + 1;
    console.log(user_uuid.toString());
    const data = {
      id: user_uuid.toString(),
      first_name: firstName,
      last_name: lastName,
      create_time: Date.now(),
      update_time: Date.now(),
      existing_skills: magicSkills,
      desired_skills: desiredSkills,
      interested_courses: interestedCourses
    };
    setFormData(data);
  }, [firstName, lastName, magicSkills, desiredSkills, interestedCourses]);

  useEffect(() => {
    setAlertShowing(true);
    setTimeout(() => {
      setAlertShowing(false);
      setAlertType("");
    }, 2000);
  }, [alertType]);

  return (
    <div className="students-wrapper">
      {alertShowing && (
        <div className="alert-container">
          <Alert type={alertType} />
        </div>
      )}
      {!alertShowing && (
        <div className="student-container">
          <h1>Add Student</h1>
          <div className="add-student-details-wrapper">
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="add-student-input"
                onChange={e => handleFirstNameChange(e)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="add-student-input"
                onChange={e => handleLastNameChange(e)}
              />
            </div>
            <div className="student-skills-courses-wrapper">
              <div className="student-detail">
                <h3 className="detail-title">Existing Skills</h3>
                {magic_skills.map(skill => (
                  <div key={skill} className="list-item">
                    <Checkbox
                      skill={skill}
                      array={magicSkills}
                      setArray={setMagicSkills}
                      forEditArray={[]}
                    />
                  </div>
                ))}
              </div>
              <div className="student-detail">
                <h3 className="detail-title">Desired Skills</h3>
                {magic_skills.map(skill => (
                  <div key={skill} className="list-item">
                    <Checkbox
                      skill={skill}
                      array={desiredSkills}
                      setArray={setDesiredSkills}
                      forEditArray={[]}
                    />
                  </div>
                ))}
              </div>
              <div className="student-detail">
                <h3 className="detail-title">Interested Courses</h3>
                {school_courses.map(course => (
                  <div key={course} className="list-item">
                    <Checkbox
                      skill={course}
                      array={interestedCourses}
                      setArray={setInterestedCourses}
                      forEditArray={[]}
                    />
                  </div>
                ))}
              </div>
            </div>
            <Button sendFormData={sendFormData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
