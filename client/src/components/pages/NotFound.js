import React, { Component } from "react";
import "./NotFound.css"

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="notFound-container">
        <h1 className="notFound">404 Not Found</h1>
        <p className="message">The page you requested couldn't be found.</p>
      </div>
    );
  }
}

export default NotFound;
