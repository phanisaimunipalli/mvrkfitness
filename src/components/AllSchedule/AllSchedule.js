import React, { Component } from "react";
import GymService from "../../services/gym.service";

class AllSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "1",
      schedules: [],
      gymId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchSchedules = this.fetchSchedules.bind(this);
  }

  componentDidMount() {
    this.fetchSchedules(this.state.location);
  }
  async fetchSchedules(gymId) {
    try {
      GymService.getClassScheduleBasedOnGymLocation(gymId)
        .then((response) => {
          console.log("fetchSchedules:", response.data);
          this.setState({
            schedules: response.data.classSchedules,
          });
        })
        .catch((error) => {
          this.setState({
            error: error.response
              ? error.response.data.message
              : "Something went wrong!",
          });
        });
    } catch (error) {
      //console.error(error)
    }
  }

  handleChange(event) {
    const gymId = event.target.value;
    this.setState({ location: gymId }, async () => {
      try {
        const response = await GymService.getClassScheduleBasedOnGymLocation(
          gymId
        );
        console.log("fetchSchedules:", response.data);
        this.setState(
          {
            schedules: response.data.classSchedules,
          },
          () => console.log("schedules:", this.state.schedules)
        );
      } catch (error) {
        console.error(error);
        this.setState({
          error: error.response
            ? error.response.data.message
            : "Something went wrong!",
        });
      }
    });
  }

  render() {
    return (
      <div className="schedule-container">
        <h2>Locations We are Open! 📌</h2>
        <select value={this.state.location} onChange={this.handleChange}>
          <option value="1">Maverick Gym, San Jose</option>
          <option value="2">Maverick Gym, SFO</option>
          <option value="3">Maverick Gym, New York</option>
        </select>
        <br></br>
        {this.state.schedules.length > 0 ? (
          <div>
            <h4>Class schedule</h4>
            <div className="card-container">
              {this.state.schedules.map((schedule) => (
                <div className="card" key={schedule.classId}>
                  <div className="card-body">
                    <h4 className="card-title">{schedule.name}</h4>
                    <p className="card-text">
                      {schedule.days} {schedule.startTime}-{schedule.endTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No schedule found for selected location</div>
        )}
      </div>
    );
  }
}

export default AllSchedule;
