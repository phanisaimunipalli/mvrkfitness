import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "./services/auth.service";
import Home from "../src/components/home.component";
import Login from "../src/components/login.component";
import Banner from "./components/Banner/Banner";
import Footer from "./components/footer/footer";
import AuthVerify from "../src/common/auth-verify";
import EventBus from "../src/common/EventBus";
import BoardUser from "../src/components/board-user.component";
import BoardAdmin from "../src/components/board-admin.component";
import AnalyticsBoard from "../src/components/board-analytics.component";
import AnalyticsBoard2 from "../src/components/board-analytics2.component";
import AnalyticsBoard3 from "../src/components/board-analytics3.component";
import LogActivity from "../src/components/logActivity.component";
import AllSchedule from "../src/components/AllSchedule/AllSchedule";
import Membership from "../src/components/Membership/membership";
import Analytics from "./components/Analytics";
import AnalyticsArea from "./components/AnalyticsArea";
import AnalyticsArea2 from "./components/AnalyticsArea2";
import AnalyticsArea3 from "./components/AnalyticsArea3";
class App extends React.Component {
  state = {
    name: "",
  };
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div className="App">
        <div class="navbar-container">
          <nav className="navbar navbar-expand fixed-top custom-navbar">
            <Link to={"/"} className="navbar-brand">
              Maverick Fitness
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/analytics"} className="nav-link">
                    San Jose Analytics Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/analytics2"} className="nav-link">
                    SFO Analytics Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/analytics3"} className="nav-link">
                    New York Analytics Board
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                {!showAdminBoard && (
                  <li className="nav-item">
                    <Link to={"/logActivity"} className="nav-link">
                      Track Activity
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Class Schedule
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Memberships
                  </Link>
                </li>
              </div>
            )}
          </nav>
        </div>

        <div className="container mt-3">
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/*  <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} /> */}
          <Route path="/user" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
          {/* <Route path="/analytics" element={<AnalyticsBoard />} /> */}
          {/* <Route path="/analytics" element={<Analytics />} /> */}
          <Route path="/analytics" element={<AnalyticsArea />} />
          <Route path="/analytics2" element={<AnalyticsArea2 />} />
          <Route path="/analytics3" element={<AnalyticsArea3 />} />
          <Route path="all-schedule" element={<AllSchedule />} />
          <Route path="membership" element={<Membership />} />
          <Route path="/logActivity" element={<LogActivity />} />
        </Routes>
        {/* </div> */}

        <AuthVerify logOut={this.logOut} />
        {/*  <Main /> */}
        {/*  <GymProgram /> */}
        {/*  <Member /> */}
        {/* <Schedule /> */}
        {!currentUser && (
          <div>
            <Banner />
            <Routes>{<Route path="/login" element={<Login />} />}</Routes>
            {<Membership />}
            {<AllSchedule />}
            <Footer />
          </div>
        )}
      </div>
    );
  }
}

export default App;
