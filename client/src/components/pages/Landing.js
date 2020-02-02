import React, { Component } from "react";

import "./Landing.css";
import "../../utilities.css";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="landing-Container">
          <h1 className="title">Chip</h1>
          <p className="tagline">
            small prices for small businesses
          </p>
        </div>
      </>
    );
  }
}

export default Landing;
