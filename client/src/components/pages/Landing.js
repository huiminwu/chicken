import React, { Component } from "react";

import "./Landing.css";
import "../../utilities.css";
import buildings from "../../public/smallbuss.jpg";

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="landing-Container">
          <h1 className="title">chip</h1>
          <img className="buildings-img" src={buildings} />
          <div className="bottom-img"></div>
          <p className="tagline">small prices for small businesses</p>
        </div>
      </>
    );
  }
}

export default Landing;
