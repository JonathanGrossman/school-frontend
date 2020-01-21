import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./Chart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [existingSkillsNames, setExistingSkillsNames] = useState([]);
  const [existingSkillsCounts, setExistingSkillsCounts] = useState([]);
  const [desiredSkillsNames, setDesiredSkillsNames] = useState([]);
  const [desiredSkillsCounts, setDesiredSkillsCounts] = useState([]);
  const [interestedCoursesNames, setInterestedCoursesNames] = useState([]);
  const [interestedCoursesCounts, setInterestedCoursesCounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const skills = [
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
    "Self_detonation",
    "Summoning",
    "Water_breathing"
  ];

  const courses = [
    "Alchemy basics",
    "Alchemy advanced",
    "Magic for day to day life",
    "Magic for medical professionals",
    "Dating with magic"
  ];

  const getData = () => {
    axios
      .get("http://localhost:7000/api/skills-data")
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err.response.data, err.response.status));
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  useEffect(() => {
    const existing_names = [];
    const existing_counts = [];
    if (data[0] != undefined) {
      data[0].existing_skills_count.map(skill => {
        existing_names.push(skill.name);
        existing_counts.push(skill.count);
      });
    }
    setExistingSkillsNames(existing_names);
    setExistingSkillsCounts(existing_counts);
  }, [data]);

  useEffect(() => {
    if (data[1] != undefined) {
      const desired_names = [];
      const desired_counts = [];
      if (data[1] != undefined) {
        data[1].desired_skills_count.map(skill => {
          desired_names.push(skill.name);
          desired_counts.push(skill.count);
        });
      }
      setDesiredSkillsNames(desired_names);
      setDesiredSkillsCounts(desired_counts);
    }
  }, [data]);

  useEffect(() => {
    if (data[2] != undefined) {
      const interested_names = [];
      const interested_counts = [];
      if (data[2] != undefined) {
        data[2].interested_courses_count.map(skill => {
          interested_names.push(skill.name);
          interested_counts.push(skill.count);
        });
      }
      setInterestedCoursesNames(interested_names);
      setInterestedCoursesCounts(interested_counts);
    }
  }, [data]);

  const chartExistingSkillsData = {
    labels: existingSkillsNames,
    datasets: [
      {
        label: "Existing Skills",
        data: existingSkillsCounts,
        backgroundColor: [
          "rgba(0, 0, 128, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 255, 255, 0.3)",
          "rgba(128, 128, 128, 1)",
          "rgba(128, 0, 128, 0.5)",
          "rgba(0, 128, 128, 0.3)",
          "rgba(0, 0, 128, 0.3)",
          "rgba(0, 0, 255, 0.5)",
          "rgba(0, 255, 255, 0.5)",
          "rgba(128, 128, 128, 0.3)",
          "rgba(128, 0, 128, 1)",
          "rgba(0, 128, 128, 0)",
          "rgba(128, 0, 0, 1)",
          "rgba(0, 0, 255, 0.3)",
          "rgba(0, 255, 255, 1)",
          "rgba(128, 128, 128, 0.5)",
          "rgba(128, 0, 128, 0.3)",
          "rgba(0, 128, 128, 1)"
        ]
      }
    ]
  };

  const chartDesiredSkillsData = {
    labels: desiredSkillsNames,
    datasets: [
      {
        label: "Existing Skills",
        data: desiredSkillsCounts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(155, 99, 132, 0.6)",
          "rgba(55, 99, 132, 0.6)",
          "rgba(254, 162, 235, 0.6)",
          "rgba(255, 106, 286, 0.6)",
          "rgba(175, 192, 92, 0.6)",
          "rgba(13, 102, 255, 0.6)",
          "rgba(25, 159, 164, 0.6)",
          "rgba(255, 255, 132, 0.6)",
          "rgba(99, 99, 132, 0.6)",
          "rgba(154, 162, 235, 0.6)",
          "rgba(105, 206, 86, 0.6)",
          "rgba(192, 192, 192, 0.6)"
        ]
      }
    ]
  };

  const chartInterestedCoursesData = {
    labels: courses,
    datasets: [
      {
        label: "Interested Courses",
        data: interestedCoursesCounts,
        backgroundColor: [
          "rgba(0, 0, 128, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(0, 255, 255, 0.3)",
          "rgba(128, 128, 128, 1)",
          "rgba(128, 0, 128, 0.5)"
        ]
      }
    ]
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {!isLoading && (
        <Chart
          chartData={chartExistingSkillsData}
          text="Existing Skills In The School"
        />
      )}
      {!isLoading && (
        <Chart
          chartData={chartDesiredSkillsData}
          text="Desired Skills In The School"
        />
      )}
      {!isLoading && (
        <Chart
          chartData={chartInterestedCoursesData}
          text="Interested Courses In The School"
        />
      )}
    </div>
  );
};

export default Dashboard;
