import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./Chart";

const Dashboard = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [signupData, setSignupData] = useState([]);
  const [existingSkillsNames, setExistingSkillsNames] = useState([]);
  const [existingSkillsCounts, setExistingSkillsCounts] = useState([]);
  const [desiredSkillsNames, setDesiredSkillsNames] = useState([]);
  const [desiredSkillsCounts, setDesiredSkillsCounts] = useState([]);
  const [interestedCoursesNames, setInterestedCoursesNames] = useState([]);
  const [interestedCoursesCounts, setInterestedCoursesCounts] = useState([]);
  const [dateForDailySignupCounts, setDateForDailySignupCounts] = useState([]);
  const [dailySignupCounts, setDailySignupCounts] = useState([]);
  const [dateForMonthlySignupCounts, setDateForMonthlySignupCounts] = useState(
    []
  );
  const [monthlySignupCounts, setMonthlySignupCounts] = useState([]);
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

  const getSkillsData = () => {
    axios
      .get("https://arcane-coast-18801.herokuapp.com/api/skills-data")
      .then(res => {
        setSkillsData(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err.response.data, err.response.status));
  };

  const getSignupData = () => {
    axios
      .get("http://arcane-coast-18801.herokuapp.com/api/signup-counts")
      .then(res => {
        setSignupData(res.data);
        setIsLoading(false);
      })
      .catch(err => console.log(err.response.data, err.response.status));
  };

  useEffect(() => {
    setTimeout(() => {
      getSkillsData();
      getSignupData();
    }, 1000);
  }, []);

  useEffect(() => {
    const existing_names = [];
    const existing_counts = [];
    if (skillsData[0] != undefined) {
      skillsData[0].existing_skills_count.map(skill => {
        existing_names.push(skill.name);
        existing_counts.push(skill.count);
      });
    }
    setExistingSkillsNames(existing_names);
    setExistingSkillsCounts(existing_counts);
  }, [skillsData]);

  useEffect(() => {
    if (skillsData[1] != undefined) {
      const desired_names = [];
      const desired_counts = [];
      if (skillsData[1] != undefined) {
        skillsData[1].desired_skills_count.map(skill => {
          desired_names.push(skill.name);
          desired_counts.push(skill.count);
        });
      }
      setDesiredSkillsNames(desired_names);
      setDesiredSkillsCounts(desired_counts);
    }
  }, [skillsData]);

  useEffect(() => {
    if (skillsData[2] != undefined) {
      const interested_names = [];
      const interested_counts = [];
      if (skillsData[2] != undefined) {
        skillsData[2].interested_courses_count.map(skill => {
          interested_names.push(skill.name);
          interested_counts.push(skill.count);
        });
      }
      setInterestedCoursesNames(interested_names);
      setInterestedCoursesCounts(interested_counts);
    }
  }, [skillsData]);

  useEffect(() => {
    const dates_for_counts = [];
    const daily_counts = [];
    if (signupData[0] != undefined) {
      signupData[0].daily_signup_count.map(count => {
        if (!dates_for_counts.includes(count.date)) {
          let a = new Date(count.date * 1000);
          let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          let year = a.getFullYear();
          let month = months[a.getMonth()];
          let date = a.getDate();
          let time = date + " " + month + " " + year + " ";
          dates_for_counts.push(time);
        }
        if (!daily_counts.includes(count.date)) {
          daily_counts.push(count.count);
        }
      });
    }
    setDateForDailySignupCounts(dates_for_counts);
    setDailySignupCounts(daily_counts);
  }, [signupData]);

  useEffect(() => {
    const dates_for_counts = [];
    const monthly_counts = [];
    if (signupData[1] != undefined) {
      signupData[1].monthly_signup_count.map(count => {
        if (!dates_for_counts.includes(count.date)) {
          let a = new Date(count.date * 1000);
          let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          let year = a.getFullYear();
          let month = months[a.getMonth()];
          let time = month + " " + year + " ";
          dates_for_counts.push(time);
        }
        if (!monthly_counts.includes(count.date)) {
          monthly_counts.push(count.count);
        }
      });
    }
    setDateForMonthlySignupCounts(dates_for_counts);
    setMonthlySignupCounts(monthly_counts);
  }, [signupData]);

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

  const chartDailyCounts = {
    labels: dateForDailySignupCounts,
    datasets: [
      {
        label: "Daily Signup Counts",
        data: dailySignupCounts,
        backgroundColor: ["rgba(255, 99, 132, 0.6)"]
      }
    ]
  };

  const chartMonthlyCounts = {
    labels: dateForMonthlySignupCounts,
    datasets: [
      {
        label: "Monthly Signup Counts",
        data: monthlySignupCounts,
        backgroundColor: ["rgba(0, 255, 255, 0.3)"]
      }
    ]
  };

  return (
    <div className="charts-container">
      <div className="chart-wrapper">
        {!isLoading && (
          <div className="pie-chart">
            <Chart
              chartData={chartExistingSkillsData}
              text="Existing Skills In The School"
              type="pie"
            />
          </div>
        )}
        {!isLoading && (
          <div className="pie-chart">
            <Chart
              chartData={chartDesiredSkillsData}
              text="Desired Skills In The School"
              type="pie"
            />
          </div>
        )}
        {!isLoading && (
          <div className="pie-chart">
            <Chart
              chartData={chartInterestedCoursesData}
              text="Interested Courses In The School"
              type="pie"
            />
          </div>
        )}
      </div>
      <div className="chart-wrapper">
        {!isLoading && (
          <div className="bar-chart">
            <Chart
              chartData={chartDailyCounts}
              text="Daily Signup Counts"
              type="bar"
            />
          </div>
        )}
        {!isLoading && (
          <div className="bar-chart">
            <Chart
              chartData={chartMonthlyCounts}
              text="Monthly Signup Counts"
              type="bar"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
