import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./Analytics.css";

import { Grid } from "@material-ui/core";
import {
  Paper,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const classesDataLast7Days = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Classes",
      data: [10, 15, 12, 8, 20, 18, 14],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
    {
      label: "Enrollment",
      data: [8, 12, 10, 6, 15, 14, 11],
      backgroundColor: "rgba(255,99,132,0.4)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
    },
  ],
};

const classesDataLast30Days = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Classes",
      data: [45, 50, 48, 60],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderWidth: 1,
    },
    {
      label: "Enrollment",
      data: [36, 48, 40, 30],
      backgroundColor: "rgba(255,99,132,0.4)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
    },
  ],
};

class AnalyticsArea2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRange1: "7", // default range for chart 1
      selectedRange2: "7", // default range for chart 2
      selectedRange3: "7", // default range for chart 3
      classesData: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Enrollment",
            data: [20, 30, 25, 35, 40],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      gymData: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Hours Spent",
            data: [3, 4, 2, 5, 6],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      visitorsData: {
        labels: [
          "Monday 8AM",
          "Monday 12PM",
          "Monday 4PM",
          "Tuesday 8AM",
          "Tuesday 12PM",
          "Tuesday 4PM",
          "Wednesday 8AM",
          "Wednesday 12PM",
          "Wednesday 4PM",
          "Thursday 8AM",
          "Thursday 12PM",
          "Thursday 4PM",
          "Friday 8AM",
          "Friday 12PM",
          "Friday 4PM",
        ],
        datasets: [
          {
            label: "Visitors",
            data: [20, 35, 25, 40, 30, 20, 50, 45, 30, 55, 50, 40, 45, 55, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    };

    this.handleRangeChange1 = this.handleRangeChange1.bind(this);
    this.handleRangeChange2 = this.handleRangeChange2.bind(this);
    this.handleRangeChange3 = this.handleRangeChange3.bind(this);
  }

  generateMockClassesData(range) {
    const labels = [];
    const enrollments = [];
    const classCounts = [];

    // Generate labels and data based on range
    const today = new Date();
    for (let i = range - 1; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      labels.push(date.toLocaleDateString());

      // Generate random data for enrollments and class counts
      enrollments.push(Math.floor(Math.random() * 50) + 50);
      classCounts.push(Math.floor(Math.random() * 5) + 5);
    }

    // Return data in chart.js format
    return {
      labels: labels,
      datasets: [
        {
          label: "Enrollments",
          data: enrollments,
          backgroundColor: "#4285F4",
        },
        {
          label: "Class Counts",
          data: classCounts,
          backgroundColor: "#DB4437",
        },
      ],
    };
  }

  handleRangeChange1 = (event) => {
    const range = parseInt(event.target.value);

    let classesData = {};

    // Set the classesData state value based on the selected range
    if (range === 7) {
      classesData = classesDataLast7Days;
    } else if (range === 30) {
      classesData = classesDataLast30Days;
    }

    // Update the component state with the new data and selected range value
    this.setState({ selectedRange1: range, classesData: classesData });
  };

  handleRangeChange2 = (event) => {
    const range = event.target.value;

    if (range === "7") {
      this.setState({
        selectedRange2: "Last 7 Days",
        gymHoursData: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Hours Spent in Gym",
              data: [3, 4, 2, 5, 6, 3, 4],
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
      });
    } else if (range === "30") {
      this.setState({
        selectedRange2: "Last 30 Days",
        gymHoursData: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Hours Spent in Gym",
              data: [16, 22, 18, 20],
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        },
      });
    }
  };

  handleRangeChange3(event) {
    const range = event.target.value;

    const last24HoursData = {
      labels: ["Morning", "Afternoon", "Evening", "Night"],
      datasets: [
        {
          label: "Visitors by Hour",
          data: [10, 20, 30, 40],
          backgroundColor: ["#ffd31d", "#ffa600", "#ff6e40", "#ff3d00"],
        },
      ],
    };

    const last7DaysData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Visitors by Day",
          data: [200, 300, 250, 350, 400, 600, 500],
          backgroundColor: "#1890ff",
        },
      ],
    };

    const last30DaysData = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Visitors by Week",
          data: [1000, 1200, 1300, 1500],
          backgroundColor: "#1890ff",
        },
      ],
    };

    let visitorsData;
    if (range === "1") {
      visitorsData = last24HoursData;
    } else if (range === "7") {
      visitorsData = last7DaysData;
    } else if (range === "weekend") {
      visitorsData = {
        labels: ["Saturday", "Sunday"],
        datasets: [
          {
            label: "Visitors on Weekend",
            data: [800, 900],
            backgroundColor: "#1890ff",
          },
        ],
      };
    } else if (range === "weekday") {
      visitorsData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Visitors on Weekday",
            data: [500, 600, 700, 800, 900],
            backgroundColor: "#1890ff",
          },
        ],
      };
    }

    this.setState({
      selectedRange3: range,
      visitorsData,
    });
  }

  render() {
    const { selectedRange1, selectedRange2, selectedRange3 } = this.state;
    return (
      <div className="chart-container">
        <div className="range-select-container">
          <FormControl>
            <div className="chart-title">Classes and Enrollment</div>
            <InputLabel>Range</InputLabel>
            <Select
              value={selectedRange1}
              onChange={this.handleRangeChange1}
              className="range-select"
            >
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
          {this.state.classesData && (
            <Bar
              className="barDesign"
              data={this.state.classesData}
              height={900}
              width={700}
            />
          )}
        </div>

        <div className="range-select-container">
          <FormControl>
            <div className="chart-title">Hours Spent</div>
            <InputLabel>Range</InputLabel>
            <Select
              value={selectedRange2}
              onChange={this.handleRangeChange2}
              className="range-select"
            >
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="30">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
          {this.state.gymHoursData && (
            <Bar data={this.state.gymHoursData} height={600} width={600} />
          )}
        </div>

        <div className="range-select-container">
          <FormControl>
            <div className="chart-title">Visitors</div>
            <InputLabel>Range</InputLabel>
            <Select
              value={selectedRange3}
              onChange={this.handleRangeChange3}
              className="range-select"
            >
              <MenuItem value="1">Last 24 Hours</MenuItem>
              <MenuItem value="7">Last 7 Days</MenuItem>
              <MenuItem value="weekend">Weekend</MenuItem>
              <MenuItem value="weekday">Weekday</MenuItem>
            </Select>
          </FormControl>
          {this.state.visitorsData && (
            <Pie data={this.state.visitorsData} height={600} width={600} />
          )}
        </div>
      </div>
    );
  }
}

export default AnalyticsArea2;
