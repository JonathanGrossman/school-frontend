import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const Chart = props => {
  const { chartData, text, type } = props;
  return (
    <div>
      {type === "pie" && (
        <Pie
          data={chartData}
          options={{
            title: {
              display: "Students",
              text: text,
              fontSize: 25
            }
          }}
        />
      )}
      {type === "bar" && (
        <Line
          data={chartData}
          options={{
            title: {
              display: "Students",
              text: text,
              fontSize: 25
            }
          }}
        />
      )}
    </div>
  );
};

export default Chart;
