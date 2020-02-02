import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Link } from "@reach/router";

import "./Navbar.css";
import "../../utilities.css";

const GOOGLE_CLIENT_ID = "601918594543-sdt4mvsgtaamoh1tktkhi5nsf1uuqlsn.apps.googleusercontent.com";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="navBar-container">
          <div className="navBar-title">
            <Link to="/dashboard/" className="navBar-link">
              Chip
            </Link>
          </div>
          <div className="navBar-linkContainer">
            {this.props.user ? (
              <>
                <Link to="/dashboard/" className="navBar-link">
                  Dashboard
                </Link>
                <Link to="/request/" className="navBar-link">
                  Request
                </Link>
                <GoogleLogout
                  className="logout-btn Navbar-opts_login"
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={this.props.handleLogout}
                  onFailure={(err) => console.log(err)}
                />
              </>
            ) : (
              <GoogleLogin
                className="Navbar-opts_login"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Navbar;
