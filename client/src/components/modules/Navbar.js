import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { Router } from "@reach/router";

import "./Navbar.css";
import "../../utilities.css";

const GOOGLE_CLIENT_ID = "601918594543-sdt4mvsgtaamoh1tktkhi5nsf1uuqlsn.apps.googleusercontent.com"

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {
          this.props.creator ? (
            <GoogleLogout
              className="logout-btn Navbar-opts_login"
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
            />
          ) : (
              <GoogleLogin
                className="Navbar-opts_login"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )
        }
      </>
    );
  }
}

export default Navbar;
