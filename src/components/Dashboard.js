import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./Chart";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [existingSkillsCounts, setExistingSkillsCounts] = useState([]);
  const [desiredSkillsCounts, setDesiredSkillsCounts] = useState([]);
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
      .get("/api/data")
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
    if (data[0] != undefined) {
      setExistingSkillsCounts([
        data[0].existing_alchemy,
        data[0].existing_animation,
        data[0].existing_conjuror,
        data[0].existing_disintegration,
        data[0].existing_elemental,
        data[0].existing_healing,
        data[0].existing_illusion,
        data[0].existing_immortality,
        data[0].existing_invisibility,
        data[0].existing_invulnerability,
        data[0].existing_necromancer,
        data[0].existing_omnipresent,
        data[0].existing_omniscient,
        data[0].existing_poison,
        data[0].existing_possession,
        data[0].existing_self_detonation,
        data[0].existing_summoning,
        data[0].existing_water_breathing
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (data[0] != undefined) {
      setDesiredSkillsCounts([
        data[0].desired_alchemy,
        data[0].desired_animation,
        data[0].desired_conjuror,
        data[0].desired_disintegration,
        data[0].desired_elemental,
        data[0].desired_healing,
        data[0].desired_illusion,
        data[0].desired_immortality,
        data[0].desired_invisibility,
        data[0].desired_invulnerability,
        data[0].desired_necromancer,
        data[0].desired_omnipresent,
        data[0].desired_omniscient,
        data[0].desired_poison,
        data[0].desired_possession,
        data[0].desired_self_detonation,
        data[0].desired_summoning,
        data[0].desired_water_breathing
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (data[0] != undefined) {
      setInterestedCoursesCounts([
        data[0].alchemy_basics,
        data[0].alchemy_advanced,
        data[0].magic_day_to_day,
        data[0].magic_for_medical,
        data[0].dating_with_magic
      ]);
    }
  }, [data]);

  const chartExistingSkillsData = {
    labels: skills,
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
    labels: skills,
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
