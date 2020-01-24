import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import Button from "./Button";
import { Redirect } from "react-router";

const Student = () => {
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

  const deleteUser = () => {
    axios
      .post(
        "https://arcane-coast-18801.herokuapp.com/api/delete-student/" +
          params.id
      )
      .then(res => {
        return console.log(res);
      })
      .catch(err => console.log(err.response.data, err.response.status));
  };

  useEffect(() => {
    setTimeout(() => {
      getStudent();
    }, 1500);
  }, []);

  return (
    <div className="students-wrapper">
      {isLoading && (
        <div className="spinner-students">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="student-container">
          <h1>{student.first_name + " " + student.last_name}</h1>
          <div className="students-table">
            <div className="student-row-actions">
              <Link
                to={"/edit-student/" + student.id}
                className="student-table-actions"
              >
                *
              </Link>
            </div>
            <p className="list-item">
              {"Created: " + Date(student.create_time)}
            </p>
            <p className="list-item">
              {"Last Updated: " + Date(student.update_time)}
            </p>
            <div className="student-details-wrapper">
              <div className="student-detail">
                <h3 className="detail-title">Existing Skills</h3>
                {student.existing_skills.map(skill => (
                  <div key={skill} className="list-item">
                    {skill.skill + " " + "L" + skill.level}
                  </div>
                ))}
              </div>
              <div className="student-detail">
                <h3 className="detail-title">Desired Skills</h3>
                {student.desired_skills.map(skill => (
                  <div key={skill} className="list-item">
                    {skill.skill + " " + "L" + skill.level}
                  </div>
                ))}
              </div>
              <div className="student-detail">
                <h3 className="detail-title">Interested Courses</h3>
                {student.interested_courses.map(course => (
                  <div key={course} className="list-item">
                    {course.skill + " " + "L" + course.level}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        Delete deleteUser
        <Button sendFormData={deleteUser} />
      </div>
    </div>
  );
};

export default Student;
