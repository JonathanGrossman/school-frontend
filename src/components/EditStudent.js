import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Checkbox";
import Button from "./Button";
import Alert from "./Alert";
import axios from "axios";
import Spinner from "./Spinner";

const EditStudent = props => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [magicSkills, setMagicSkills] = useState([]);
  const [desiredSkills, setDesiredSkills] = useState([]);
  const [interestedCourses, setInterestedCourses] = useState([]);
  const [formData, setFormData] = useState([]);
  const [alertShowing, setAlertShowing] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let params = useParams();

  const getStudent = () => {
    axios
      .get("https://arcane-coast-18801.herokuapp.com/" + params.id)
      .then(res => {
        setStudent(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err.response.data, err.response.status));
  };

  useEffect(() => {
    setTimeout(() => {
      getStudent();
    }, 1500);
  }, []);

  useEffect(() => {
    if (student.first_name != undefined && student.last_name != undefined) {
      setFirstName(student.first_name);
      setLastName(student.last_name);
    }
    if (student.existing_skills != undefined) {
      let parsedArray = [];
      student.existing_skills.map(object => {
        parsedArray.push(object);
      });
      setMagicSkills(parsedArray);
    }
    if (student.desired_skills != undefined) {
      let parsedArray = [];
      student.desired_skills.map(object => {
        parsedArray.push(object);
      });
      setDesiredSkills(parsedArray);
    }
    if (student.interested_courses != undefined) {
      let parsedArray = [];
      student.interested_courses.map(object => {
        parsedArray.push(object);
      });
      setInterestedCourses(parsedArray);
    }
  }, [student]);

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
      .post(
        "https://arcane-coast-18801.herokuapp.com/api/edit-student/" +
          params.id,
        formData
      )
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setAlertType("success");
        }
      })
      .catch(err => {
        setAlertType("error");
      });
  };

  useEffect(() => {
    const data = {
      id: params.id,
      first_name: firstName,
      last_name: lastName,
      create_time: student.create_date,
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
    }, 1500);
  }, [alertType]);

  return (
    <div className="students-wrapper">
      {isLoading && (
        <div className="spinner-students">
          <Spinner />
        </div>
      )}
      {!isLoading && alertShowing && (
        <div className="alert-container">
          <Alert type={alertType} h={props.history} />
        </div>
      )}
      {!isLoading && !alertShowing && (
        <div className="student-container">
          <h1>Edit Student</h1>
          <div className="add-student-details-wrapper">
            <div>
              <input
                type="text"
                value={firstName}
                className="add-student-input"
                onChange={e => handleFirstNameChange(e)}
              />
              <input
                type="text"
                value={lastName}
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
                      forEditArray={student.existing_skills}
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
                      forEditArray={student.desired_skills}
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
                      forEditArray={student.interested_courses}
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

export default EditStudent;
