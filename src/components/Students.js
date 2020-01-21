import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const table_columns = [
    "Last Name",
    "First Name",
    "Existing Skills",
    "Desired Skills",
    "Interested Courses"
  ];
  const getStudents = () => {
    axios
      .get("http://localhost:7000/api/students")
      .then(res => {
        setStudents(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err.response.data, err.response.status));
  };

  useEffect(() => {
    setTimeout(() => {
      getStudents();
    }, 1000);
  }, []);

  return (
    <div className="students-wrapper">
      <h1>List of Students</h1>
      <div className="students-table">
        <div className="student-row-actions">
          <Link to="/add-student" className="student-table-actions">
            +
          </Link>
        </div>
        <div className="student-row">
          {table_columns.map(title => (
            <span key={title} className="student-row-cell-title">
              {title}
            </span>
          ))}
        </div>
        {isLoading && (
          <div className="spinner-students">
            <Spinner />
          </div>
        )}
        {!isLoading &&
          students.map(student => (
            <div key={student.id} className="student-row">
              <span className="student-row-cell">
                <Link to={"/students/" + student.id} className="cell-link">
                  {student.last_name}
                </Link>
              </span>
              <span className="student-row-cell">{student.first_name}</span>
              <span className="student-row-cell">
                {student.existing_skills.map(skill => (
                  <div key={skill} className="list-item">
                    {skill.skill + " " + "L" + skill.level}
                  </div>
                ))}
              </span>
              <span className="student-row-cell">
                {student.desired_skills.map(skill => (
                  <div key={skill} className="list-item">
                    {skill.skill + " " + "L" + skill.level}
                  </div>
                ))}
              </span>
              <span className="student-row-cell">
                {student.interested_courses.map(course => (
                  <div key={course} className="list-item">
                    {course.skill + " " + "L" + course.level}
                  </div>
                ))}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Students;
