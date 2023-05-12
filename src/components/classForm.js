import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import GymService from "../services/gym.service.js";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const locations = [
  { key: "1", name: "SFO" },
  { key: "2", name: "San Jose" },
  { key: "3", name: "New York" },
];
class AddClass extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeClassName = this.onChangeClassName.bind(this);
    this.onChangeStartTime = this.onChangeStartTime.bind(this);
    this.onChangeEndTime = this.onChangeEndTime.bind(this);
    this.onChangeDays = this.onChangeDays.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);

    this.state = {
      className: "",
      startTime: "",
      endTime: "",
      days: "",
      gymId: "",
    };
  }

  onChangeClassName(e) {
    this.setState({
      className: e.target.value,
    });
  }

  onChangeStartTime(e) {
    this.setState({
      startTime: e.target.value,
    });
  }

  onChangeEndTime(e) {
    this.setState({
      endTime: e.target.value,
    });
  }
  onChangeDays(e) {
    this.setState({
      days: e.target.value,
    });
  }

  onChangeLocation(e) {
    this.setState({
      gymId: e.target.value,
    });
  }

  handleChange = (e) => {
    if (e.target.name === "location") {
      const selectedLocation = e.target.value;
      const selectedLocationObj = locations.find(
        (loc) => loc.name === selectedLocation
      );

      this.setState({
        selectedLocation: selectedLocationObj.name,
        gymId: selectedLocationObj.key,
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      GymService.addClass(
        this.state.className,
        this.state.startTime,
        this.state.endTime,
        this.state.days,
        this.state.gymId
      ).then(
        (response) => {
          console.log("Add class", response.data.message);
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("before resMessage...", resMessage);
          this.setState({
            successful: false,
            message: resMessage,
          });
          console.log("after resMessage...", resMessage);
        }
      );
    }
  }

  render() {
    const { name, starttime, endtime, days, selectedLocation } = this.state;
    const locations = [
      { key: "1", name: "San Jose" },
      { key: "2", name: "SFO" },
      { key: "3", name: "New York" },
    ];
    return (
      <div className="addmemberform">
        <div className="text-center">
          <p className="display-6">Add New Class</p>
        </div>
        <div className="col-md-12">
          <div className="card card-container">
            <Form
              onSubmit={this.handleSubmit}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="className">Class Name</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="className"
                      value={this.state.className}
                      onChange={this.onChangeClassName}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="startTime">Start Time</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="startTime"
                      value={this.state.startTime}
                      onChange={this.onChangeStartTime}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="endTime">End Time</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="endTime"
                      value={this.state.endTime}
                      onChange={this.onChangeEndTime}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="days">Days</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="days"
                      value={this.state.days}
                      onChange={this.onChangeDays}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Location</label>
                    <select
                      className="form-control"
                      name="location"
                      value={selectedLocation}
                      onChange={this.handleChange}
                    >
                      <option value="">Select a Location</option>
                      {locations.map((loc) => (
                        <option key={loc.key} value={loc.name}>
                          {loc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group text-center pt-3">
                    <button className="btn btn-primary btn-block">
                      Add Class
                    </button>
                  </div>
                </div>
              )}

              {this.state.message && this.state.successful && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddClass;
