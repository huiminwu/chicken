import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Request from "./pages/Request.js";
import Dashboard from "./pages/Dashboard.js";
import Navbar from "./modules/Navbar.js";
import Landing from "./pages/Landing.js";
import { Helmet } from "react-helmet";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      username: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({
          userId: user._id,
          username: user.name,
        });
      }
    });
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken })
      .then((user) => {
        this.setState({ userId: user._id });
        post("/api/initsocket", { socketid: socket.id });
      })
      .then(() => navigate("/dashboard"));
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").then(() => navigate("/"));
  };

  render() {
    if (this.state.userId) {
      return (
        <>
          <Helmet>
            <title>Coin</title>
          </Helmet>
          <Navbar
            user={this.state.userId}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
          />
          <Router>
            <Request
              path="/request"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              user={this.state.userId}
            />
            <Dashboard
              path="/dashboard"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              user={this.state.userId}
              username={this.state.username}
            />
            <Dashboard
              path="/"
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              user={this.state.userId}
            />
            <NotFound default />
          </Router>
        </>
      );
    } else {
      return (
        <>
          <Helmet>
            <title>Chip</title>
          </Helmet>
          <Navbar
            creator={this.state.userId}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
          />
          <Router>
            <Landing path="/" />
            <NotFound path="/404" />
          </Router>
        </>
      );
    }
  }
}

export default App;
