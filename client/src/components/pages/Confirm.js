import React, { Component } from "react";

import "./Landing.css";
import "../../utilities.css";
import buildings from "../../public/smallbuss.jpg"

class Confirm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="confirm-Container">
          <h1 className="title">Success!</h1>
          <p className="message">
            Congratulations your order has been submitted!
          </p>
        </div>
      </>
    );
  }
}

export default Confirm;