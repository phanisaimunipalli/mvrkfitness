import React from "react";
import DateTimePicker from "react-datetime-picker";
import useState from "react";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import userService from "../services/user.service";
import { toast } from "react-toastify";
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
  Button,
  Card,
  CardContent,
} from "@mui/material";

class MemberView extends React.Component {
  constructor(props) {
    super(props);

    console.log("props.membership>>>", props.membership);
    this.id = props.member ? props.member.id : "";
    this.firstname = props.member ? props.member.first_name : "";
    this.lastname = props.member ? props.member.last_name : "";
    this.email = props.member ? props.member.email : "";
    this.membership = props.membership ? props.member.membership : "";
    this.checkInTime = props.member ? props.member.checkInTime : "";
    this.parentHandler = props.handler;

    this.membership1 = props.member.membership;
    this.is_member = props.member.is_member;
    this.member_joining_date = props.member.createdAt;
    // console.log('props.member.is_member****', this.is_member)
    // console.log('props.member.membership****', this.membership1)
    this.state = {
      value: "",
      checkedIn: false, // added state variable to track check-in status
      lastCheckInDate: localStorage.getItem(`lastCheckInDate_${this.id}`), // get last check-in date from local storage
      lastCheckOutDate: localStorage.getItem(`lastCheckOutDate_${this.id}`),
      checkedOut: false, // added state variable to track check-out status
    };
  }
  handleCheckin = (memberId) => {
    userService.saveCheckInTimeOfMember(memberId).then(
      (response) => {
        toast.success("checkInTime is saved!");
        this.setState({
          checkedIn: true,
          lastCheckInDate: new Date().toLocaleDateString(),
        }); // set last check-in date in state and local storage
        localStorage.setItem(
          `lastCheckInDate_${this.id}`,
          new Date().toLocaleDateString()
        );
        this.parentHandler();
      },
      (error) => {
        toast.error(memberId + " checkInTime saved failed!");
      }
    );
  };

  handleCheckOut = (memberId) => {
    userService.saveCheckOutTimeOfMember(memberId).then(
      (response) => {
        toast.success("checkOutTime saved!");
        this.setState({
          checkedOut: true,
          lastCheckOutDate: new Date().toLocaleDateString(),
        }); // set last check-out date in state and local storage
        localStorage.setItem(
          `lastCheckOutDate_${this.id}`,
          new Date().toLocaleDateString()
        );
        this.parentHandler();
      },
      (error) => {
        toast.error(memberId + " checkInTime saved failed!");
      }
    );
  };

  is_expired_user() {
    var currentTime_ms = new Date();
    var joiningTime_ms = new Date(this.member_joining_date);
    var total_days_passed_since_joined =
      (currentTime_ms - joiningTime_ms) / (1000 * 60 * 60 * 24);
    return !this.is_member && total_days_passed_since_joined > 7;
  }

  get_user_membership_status() {
    var val = "Free";
    var color = "blue";
    if (this.is_member) {
      val = "Member";
      color = "green";
    } else if (this.is_expired_user()) {
      val = "Expired";
      color = "red";
    }
    return <span style={{ color: color, fontWeight: "bold" }}>{val}</span>;
  }

  format_name(name) {
    if (!name) {
      return "";
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  render() {
    const { firstname, lastname, email } = this.props.member;
    const { checkedIn, lastCheckInDate } = this.state;
    const { checkedOut, lastCheckOutDate } = this.state;
    // const { checkedOut, lastCheckOutDate, checkInTime } = this.props.member // pass checkInTime as a prop
    const today = new Date().toLocaleDateString();
    const isCheckInButtonDisabled =
      this.is_expired_user() || checkedIn || lastCheckInDate === today; // disable button if already checked in today or if last checked-in date is today
    const isCheckOutButtonDisabled1 =
      this.is_expired_user() ||
      !isCheckInButtonDisabled ||
      checkedOut ||
      lastCheckOutDate === today;

    return (
      <div className="card-container">
        {/* <Card className="card-admin-container"> */}
        <CardContent className="adminCards">
          <h2>
            {this.format_name(firstname)} {this.format_name(lastname)}
          </h2>
          <p>{email}</p>
          {!checkedIn && (
            <Button
              variant="contained"
              onClick={(event) =>
                this.handleCheckin(
                  this.props.member.id,
                  this.state.checkInValue
                )
              }
              disabled={isCheckInButtonDisabled}
            >
              Check-In
            </Button>
          )}
          {checkedIn && <p>Checked In</p>}
          {!checkedOut && (
            <Button
              variant="contained"
              color="primary"
              onClick={(event) =>
                this.handleCheckOut(
                  this.props.member.id,
                  this.state.checkOutValue
                )
              }
              disabled={isCheckOutButtonDisabled1}
            >
              Check-Out
            </Button>
          )}
          {checkedOut && <p>Checked Out</p>}
          <p>{this.get_user_membership_status()}</p>
        </CardContent>
        {/* </Card> */}
      </div>

      // <tr>
      //   <td>{this.format_name(this.firstname)}</td>
      //   <td>{this.format_name(this.lastname)}</td>
      //   <td>{this.email}</td>
      //   <td>
      //     {!checkedIn && (
      //       <button
      //         onClick={(event) =>
      //           this.handleCheckin(
      //             this.props.member.id,
      //             this.state.checkInValue
      //           )
      //         }
      //         disabled={isCheckInButtonDisabled} // disable button if already checked in today or if last checked-in date is today
      //       >
      //         Check-In
      //       </button>
      //     )}
      //     {checkedIn && <span>Checked In</span>}
      //   </td>
      //   <td>
      //     {!checkedOut && (
      //       <button
      //         onClick={(event) =>
      //           this.handleCheckOut(
      //             this.props.member.id,
      //             this.state.checkOutValue
      //           )
      //         }
      //         disabled={isCheckOutButtonDisabled1} // disable button if already checked in today or if last checked-in date is today
      //       >
      //         Check-Out
      //       </button>
      //     )}
      //     {checkedOut && <span>Checked Out</span>}
      //   </td>
      //   <td>{this.get_user_membership_status()}</td>
      // </tr>
    );
  }
}

export function MembersListView(props) {
  return (
    <div>
      {props.members &&
        props.members.map((member, index) => (
          <MemberView
            member={member}
            handler={props.handler}
            key={index}
            checkInTime={member.checkInTime}
          />
        ))}
    </div>
    // <table className="table table-hover table-bordered">
    //   <thead className="thead-white">
    //     <tr>
    //       <th scope="col" style={{ width: "30%" }}>
    //         FirstName
    //       </th>
    //       <th scope="col" style={{ width: "20%" }}>
    //         LastName
    //       </th>
    //       <th scope="col" style={{ width: "25%" }}>
    //         Email
    //       </th>
    //       <th scope="col" style={{ width: "30%" }}>
    //         CheckIn
    //       </th>
    //       <th scope="col" style={{ width: "30%" }}>
    //         CheckOut
    //       </th>
    //       <th scope="col" style={{ width: "30%" }}>
    //         Membership
    //       </th>
    //     </tr>
    //   </thead>
    //   {
    //     <tbody>
    //       {props.members &&
    //         props.members.map((member, index) => (
    //           <MemberView
    //             member={member}
    //             handler={props.handler}
    //             key={index}
    //             checkInTime={member.checkInTime}
    //           />
    //         ))}
    //     </tbody>
    //   }
    // </table>
  );
}
