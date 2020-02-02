import React from "react";

import { get, post } from "../../utilities.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
    };
  }

  componentDidMount() {
    get("api/requests", { user: this.props.user }).then((requests) => console.log(requests));
    get("/api/matches", { product: "bricks" }).then((users) => console.log(users));
  }

  render() {
    let requestList = <div>Loading...</div>;
    if (this.state.requests) {
      requestList = this.state.requests.map((request, k) => (
        <div key={k} className="request-info-container">
          {request.product}
          {request.units}
        </div>
      ));
    }

    return (
      <div className="page-container">
        <div className="dashboard-container">
          <div className="welcome">Welcome</div>
          {requestList}
        </div>
      </div>
    );
  }
}

export default Dashboard;
