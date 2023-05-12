import React, { Component } from "react";
// import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service";
// import {
//   LineChart as MyLineChart,
//   Line as MyLine,
//   XAxis as MyXAxis,
//   YAxis as MyYAxis,
//   CartesianGrid as MyCartesianGrid,
//   Tooltip as MyToolTip,
//   Legend as MyLegend,
// } from "recharts";

import {
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Select,
  Button,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
    "& label": {
      color: "#fff", // set the color of the label text
    },
    "& .MuiInputBase-root": {
      color: "#fff", // set the color of the input text
      backgroundColor: "#333", // set the background color of the input
      borderRadius: "15px", // add some border radius to the input
    },
    "& .MuiInputBase-root:hover": {
      backgroundColor: "black", // set the background color of the input on hover
      color: "white",
    },
    "& .MuiInputBase-root:focus": {
      backgroundColor: "#555", // set the background color of the input on focus
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    borderRadius: "15px",
  },
  textField: {
    background: "white",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    background: "#ffd700",
    width: "10px",
    height: "40px",
    color: "black",
    fontWeight: "bold",
    textTransform: "None",
    borderRadius: "15px",
  },
});

class LogWorkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityName: "",
      hours: "",
      date: new Date(),
    };

    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleHoursChange = this.handleHoursChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log("currentUser: ", currentUser);
    if (!currentUser) {
      this.setState({ redirect: "/home" });
      return;
    }
    this.setState({
      user: currentUser,
    });
  }
  handleTypeChange(event) {
    this.setState({ activityName: event.target.value });
  }

  handleHoursChange(event) {
    this.setState({ hours: event.target.value });
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { activityName, hours, date } = this.state;
    console.log(activityName);
    console.log(hours);
    userService.logActivity(this.state.user.id, activityName, hours, date).then(
      (response) => {
        toast.success("log Activity saved!");
        /* this.setState({
          checkedIn: true,
          lastCheckInDate: new Date().toLocaleDateString(),
        }) // set last check-in date in state and local storage
        localStorage.setItem(
          `lastCheckInDate_${this.id}`,
          new Date().toLocaleDateString(),
        )
        this.parentHandler() */
        console.log(response);
      },
      (error) => {
        toast.error(+" checkInTime saved failed!");
      }
    );
  }

  render() {
    const Mydata = [
      { name: "Trademill", hours: 2 },
      { name: "Cycling", hours: 3 },
      { name: "Boxing", hours: 2 },
      { name: "Yoga", hours: 3 },
      { name: "HRX", hours: 1 },
      { name: "HIIT", hours: 2 },
      { name: "Zumba", hours: 4 },
    ];
    const { activityName, hours, date } = this.state;
    let xAxisLabel = "activityName";
    const { classes } = this.props;
    return (
      // <div className="log-workout-container">
      //   <h1>Log a Workout</h1>
      //   <form onSubmit={this.handleSubmit} className="log-workout-form">
      //     <label>
      //       Type:
      //       <select value={activityName} onChange={this.handleTypeChange}>
      //         <option value="">Select a type</option>
      //         <option value="Treadmill">Treadmill</option>
      //         <option value="Cycling">Cycling</option>
      //         <option value="Stair machine">Stair machine</option>
      //         <option value="Weight training">Weight training</option>
      //       </select>
      //     </label>
      //     <label>
      //       Hours:
      //       <input
      //         type="text"
      //         value={hours}
      //         onChange={this.handleHoursChange}
      //       />
      //     </label>
      //     <label>
      //       Date:
      //       <DatePicker selected={date} onChange={this.handleDateChange} />
      //     </label>
      //     <button className="log-workout-button" type="submit">
      //       Log Workout
      //     </button>
      //   </form>
      // </div>
      <div className="log-workout-container">
        <h1>Log a Workout</h1>
        <form onSubmit={this.handleSubmit} className="log-workout-form">
          <FormControl className={classes.formControl}>
            <InputLabel id="activity-name-label">Type</InputLabel>
            <Select
              className={classes.selectEmpty}
              labelId="activity-name-label"
              id="activity-name"
              value={activityName}
              onChange={this.handleTypeChange}
            >
              <MenuItem value="">
                <em>Select a type</em>
              </MenuItem>
              <MenuItem value="Treadmill">Treadmill</MenuItem>
              <MenuItem value="Cycling">Cycling</MenuItem>
              <MenuItem value="Stair machine">Stair machine</MenuItem>
              <MenuItem value="Weight training">Weight training</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="hours"
              label="Hours"
              value={hours}
              onChange={this.handleHoursChange}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="date-label">Date</InputLabel> */}
            <DatePicker
              selected={date}
              onChange={this.handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </FormControl>
          <Button variant="contained" className={classes.button} type="submit">
            Log Workout
          </Button>
        </form>
        {/* <div class="chart">
          <h1>Current Week Activity Chart</h1>
          <MyLineChart
            width={500}
            height={300}
            data={Mydata}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <MyXAxis
              dataKey="name"
              label={{
                value: xAxisLabel,
                position: "insideBottomRight",
                offset: -10,
              }}
            />
            <MyYAxis
              label={{ value: "Hours", angle: -90, position: "insideLeft" }}
            />
            <MyCartesianGrid strokeDasharray="3 3" />
            <MyToolTip />
            <MyLegend />
            <MyLine
              type=""
              dataKey="hours"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </MyLineChart>
        </div> */}
      </div>
    );
  }
}

export default withStyles(styles)(LogWorkout);
