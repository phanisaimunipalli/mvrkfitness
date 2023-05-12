import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { Grid, Paper, Typography } from "@material-ui/core";

class Analytics extends React.Component {
  constructor(props) {
    super(props);

    // Set up initial state
    this.state = {
      classesData: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
          {
            label: "Enrollment",
            data: [20, 25, 30, 35, 40],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      gymData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "Hours",
            data: [2, 3, 2.5, 4, 3.5, 2.5, 1.5],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      visitorsData: {
        labels: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00",
        ],
        datasets: [
          {
            label: "Visitors",
            data: [
              10, 12, 8, 7, 6, 5, 4, 5, 7, 10, 14, 18, 20, 22, 24, 22, 20, 18,
              16, 15, 13, 12, 11, 10,
            ],
            backgroundColor: "rgba(255, 206, 86, 0.5)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      },
    };
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Typography variant="h5">
                Classes and Enrollment by Day/Week
              </Typography>
              <Bar
                data={this.state.classesData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </Paper>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <Paper>
              <Typography variant="h5">
                Hours Spent in the Gym by Day/Week/Month
              </Typography>
              <Pie
                data={this.state.gymData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </Paper>
          </Grid> */}
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h5">
                Number of Visitors by the Hour Each Day, Weekday, Weekend
              </Typography>
              <Bar
                data={this.state.visitorsData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Analytics;
