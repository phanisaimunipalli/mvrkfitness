import React, { Component } from "react";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import GymService from "../services/gym.service";
import EnrollService from "../services/enrollService";
import { toast } from "react-toastify";
import user_icon from "./usericon.png";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.dark,
//   color: theme.palette.common.white,
//   fontWeight: "bold",
// }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  // backgroundColor: theme.palette.primary.dark,
  // color: theme.palette.common.white,
  // fontWeight: "bold",
  "& .checkbox-label": {
    fontWeight: "bold",
    fontSize: "16px",
  },
  "& .checkbox-input": {
    marginRight: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "3px",
    width: "20px",
    height: "20px",
    verticalAlign: "middle",
    position: "relative",
    top: "-2px",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    "&:checked": {
      backgroundColor: "#ffd700",
      borderColor: "#ffd700",
      "&:after": {
        content: '""',
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "10px",
        height: "10px",
        backgroundColor: "#000",
        borderRadius: "2px",
      },
    },
  },
}));

const StyledTableBody = styled(TableBody)(({ theme }) => ({
  "& .MuiTableRow-root:nth-of-type(even)": {
    backgroundColor: "lightgrey",
  },
  "& .MuiTableRow-root:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#ffd700",
  fontWeight: "bold",
  fontSize: "16px",
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",

  "& .MuiTableHead-root": {
    fontWeight: "bold",
    fontSize: "16px",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "16px",
  "& .MuiTableHead-root": {
    fontWeight: "bold",
  },
}));

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);

    this.state = {
      redirect: null,
      content: "",
      //files: [],
      user: {},
      classes: [],
      isChecked: false,
      isButtonDisabled: true,
      scheduledClasses: [],
      activities: [],
      error: null,
    };
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSelectClass = this.handleSelectClass.bind(this);
  }

  handler() {
    this.fetchData();
  }

  handleSelectClass = (classId) => {
    const userId = this.state.user.id;
    console.log("SIGNUP CLASS:", userId);
    console.log("signup classid: ", classId);
    const selectedClass = this.state.classes.find((c) => c.classId === classId);
    const selectedDays = selectedClass.selectedDays; // get the selected days for the class
    console.log("selectedClass", selectedClass);
    console.log("selectedDays", selectedDays);
    EnrollService.createEnrollment(userId, classId, selectedDays)
      .then((response) => {
        console.log("Response: ", response.data.message);
        if (response.data.status == undefined) {
          toast.error(response.data.message);
        } else {
          window.alert(response.data.message);

          toast.success(response.data.message);
        }
        // Do something after successful enrollment
      })
      .catch((error) => {
        console.log(error);
        // Handle error case
      });
  };

  handleCheckboxChange = (classObj, day) => {
    // Toggle the value of the checkbox for the given day in the class object
    const updatedClassObj = { ...classObj, [day]: !classObj[day] };

    // Check if any checkbox in the class object is checked
    const isCheckboxSelected = Object.values(updatedClassObj).some(
      (value) => value === true
    );

    // Update the state with the new class object and checkbox selected status
    this.setState({
      classes: this.state.classes.map((c) =>
        c.classId === classObj.classId
          ? {
              ...updatedClassObj,
              selectedDays: updatedClassObj.days
                .split(",")
                .filter((d) => updatedClassObj[d])
                .join(","),
            }
          : c
      ),
      isButtonDisabled: !isCheckboxSelected,
    });
  };

  fetchSchedule(memberId) {
    console.log("memberId :::", memberId);

    UserService.getClassSchedule(memberId)
      .then((response) => {
        console.log(response.data);
        this.setState({
          scheduledClasses: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle error case
      });
  }

  fetchPastActivities(userId, value) {
    // const userId = this.state.user.id
    UserService.getPastActivities(userId, value)
      .then((response) => {
        console.log("Past Activities response:", response.data);
        this.setState({
          activities: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        // Handle error case
      });
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
    this.fetchSchedule(currentUser.id);
    if (currentUser.roles[0] != "ROLE_ADMIN") {
      console.log("good job");
      GymService.getClasses()
        .then((response) => {
          this.setState({
            classes: response.data,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.response
              ? error.response.data.message
              : "Something went wrong!",
          });
        });
      this.fetchPastActivities(currentUser.id, "last-week");
    }
  }

  calculateTimeSpent(activities) {
    const timeSpentMap = {};
    activities.forEach((activity) => {
      console.log("activity Name is : ", activity.classSchedule.name);
      const activityName = activity.classSchedule.name;
      if (timeSpentMap[activityName]) {
        timeSpentMap[activityName] += 1;
      } else {
        timeSpentMap[activityName] = 1;
      }
    });
    console.log(timeSpentMap);
    return timeSpentMap;
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    console.log("state.user: ", this.state.user);
    const { classObj } = this.props;
    const isChecked = classObj && this.state[classObj.classId];
    const { activities, error } = this.state;
    const timeSpentMap = this.calculateTimeSpent(activities);
    const timeSpent = Object.entries(timeSpentMap).map(
      ([activityName, count]) => (
        <tr key={activityName}>
          <td>{activityName}</td>
          <td>{count} hour(s)</td>
        </tr>
      )
    );
    console.log("Map**", timeSpentMap);
    return (
      <div className="container-fluid">
        {/* <header className="jumbotron content_border"></header> */}
        <div class="aClass"></div>

        <div className="adminTable">
          {/*  <h2 className="inline_text">Welcome {this.state.user.firstName}</h2> */}
          <h3>{this.state.content}</h3>
        </div>
        <span
          style={{
            fontWeight: "bold",
            padding: "4px",
            color: "white",
            fontSize: "22px",
          }}
        >
          {" "}
          Welcome {this.state.user.firstName}!
          <img
            className="file_op_btn upload_label"
            src={user_icon}
            alt="Icon"
          />
        </span>
        {this.state.user.roles && this.state.user.roles[0] != "ROLE_ADMIN" && (
          <div className="adminTable">
            <h3 className="headBtn">Book Class In Advance</h3>

            <StyledTableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }}>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Class ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>Sign up</TableCell>
                  </TableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {this.state.classes.map((classObj) => (
                    <TableRow key={classObj.classId}>
                      <TableCell>{classObj.classId}</TableCell>
                      <TableCell>{classObj.name}</TableCell>
                      <TableCell>{classObj.startTime}</TableCell>
                      <TableCell>{classObj.endTime}</TableCell>
                      <StyledTableCell>
                        {classObj.days.split(",").map((day) => (
                          <div key={day}>
                            <input
                              className="checkbox-input"
                              type="checkbox"
                              checked={classObj[day]}
                              onChange={() =>
                                this.handleCheckboxChange(classObj, day)
                              }
                            />
                            <span className="checkbox-label">{day.trim()}</span>
                          </div>
                        ))}
                      </StyledTableCell>
                      <TableCell>
                        <button
                          className="signupBtn"
                          onClick={() =>
                            this.handleSelectClass(classObj.classId)
                          }
                          disabled={
                            !Object.values(classObj)
                              .slice(1)
                              .some((val) => val === true)
                          }
                        >
                          Sign up
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </StyledTableBody>
              </Table>
            </StyledTableContainer>

            {/* <div className="table-wrapper">
              <table className="class-table">
                <thead>
                  <tr>
                    <th>Class ID</th>
                    <th>Name</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Days</th>
                    <th>Sign up</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.classes.map((classObj) => (
                    <tr key={classObj.classId}>
                      <td>{classObj.classId}</td>
                      <td>{classObj.name}</td>
                      <td>{classObj.startTime}</td>
                      <td>{classObj.endTime}</td>
                      <td>
                        {classObj.days.split(",").map((day) => (
                          <label key={day}>
                            <input
                              type="checkbox"
                              checked={classObj[day]}
                              onChange={() =>
                                this.handleCheckboxChange(classObj, day)
                              }
                            />{" "}
                            {day.trim()}{" "}
                          </label>
                        ))}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            this.handleSelectClass(classObj.classId)
                          }
                          disabled={
                            !Object.values(classObj)
                              .slice(1)
                              .some((val) => val === true)
                          }
                        >
                          {" "}
                          Sign up
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}

            <h3 className="headBtn">Upcoming Class Schedule</h3>
            <StyledTableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <StyledTableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell>StartTime</TableCell>
                    <TableCell>Days</TableCell>
                  </TableRow>
                </StyledTableHead>
                <StyledTableBody>
                  {this.state.scheduledClasses.map((classObj) => (
                    <TableRow key={classObj.classId}>
                      <TableCell>{classObj.className}</TableCell>
                      <TableCell>{classObj.classStartTime}</TableCell>
                      <TableCell>{classObj.days}</TableCell>
                    </TableRow>
                  ))}
                </StyledTableBody>
              </Table>
            </StyledTableContainer>
            {/* <div className="table-wrapper">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>StartTime</th>
                    <th>Days</th>
                  </tr>
                </thead>
                {this.state.scheduledClasses.map((classObj) => (
                  <tr key={classObj.classId}>
                    <td>{classObj.className}</td>
                    <td>{classObj.classStartTime}</td>
                    <td>{classObj.days}</td>
                  </tr>
                ))}
              </table>
            </div> */}

            <h3 variant="h3" className="headBtn">
              Past Activities
            </h3>
            <FormControl className="date-filter-container">
              <Select
                className="selectDropDown"
                id="date-filter"
                onChange={(event) =>
                  this.fetchPastActivities(
                    this.state.user.id,
                    event.target.value
                  )
                }
                value="last-week"
              >
                <MenuItem value="last-week">Last Week</MenuItem>
                <MenuItem value="last-month">Last Month</MenuItem>
                <MenuItem value="last-90Days">Last 90 Days</MenuItem>
              </Select>
            </FormControl>
            {error && (
              <Typography variant="body1" className="error">
                {error}
              </Typography>
            )}
            {activities.length > 0 ? (
              <StyledTableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <StyledTableHead>
                    <TableRow>
                      <StyledTableCell>Activity Name</StyledTableCell>
                      <StyledTableCell>TimeSpent</StyledTableCell>
                    </TableRow>
                  </StyledTableHead>
                  <StyledTableBody>{timeSpent}</StyledTableBody>
                </Table>
              </StyledTableContainer>
            ) : (
              <Typography variant="body1" className="no-data">
                No Activities found.
              </Typography>
            )}

            {/* <h3 className="headBtn">Past Activities</h3>
            <div className="date-filter-container">
              <label htmlFor="date-filter">Filter By Period:</label>
              <select
                id="date-filter"
                onChange={(event) =>
                  this.fetchPastActivities(
                    this.state.user.id,
                    event.target.value
                  )
                }
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-90Days">Last 90 Days</option>
              </select>
            </div>
            {error && <div className="error">{error}</div>}
            {activities.length > 0 ? (
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Activity Name</th>
                    <th>TimeSpent</th>
                  </tr>
                </thead>
                <tbody>{timeSpent}</tbody>
              </table>
            ) : (
              <div className="no-data">No Activities found.</div>
            )} */}
          </div>
        )}
      </div>
    );
  }
}
