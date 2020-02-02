import React from "react";

import { get, post } from "../../utilities.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { }

  render() {
    get("/api/matches", { product: "bricks" });
    return (
      <div className="page-container">
        <div className="dashboard-container">he
        </div>
      </div>
    );
  }
}

export default Dashboard;
