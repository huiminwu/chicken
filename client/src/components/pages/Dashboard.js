import React from "react";
import "./Dashboard.css";

import { get, post } from "../../utilities.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: null,
    };
  }

  componentDidMount() {
    get("/api/requests", { user: this.props.user }).then((requests) =>
      this.setState({ requests: requests })
    );
  }

  render() {
    let pendingRequestList = <div>Loading...</div>;
    let matchedRequestList = <div>Loading...</div>;
    if (this.state.requests) {
      const pendingRequests = this.state.requests.filter((request) => !request.isMatched);
      const matchedRequests = this.state.requests.filter((request) => request.isMatched);

      pendingRequestList = pendingRequests.map((request, k) => (
        <div key={k} className="request-info-container">
          {request.product}
          {request.units}
          {request.price}
        </div>
      ));

      matchedRequestList = matchedRequests.map((request, k) => (
        <div key={k} className="request-info-container">
          {request.product}
          {request.units}
          {request.price}
        </div>
      ));
    }

    return (
      <div className="page-container">
        <div className="dashboard-container">
          <div className="welcome">Welcome</div>
          {pendingRequestList}
          {matchedRequestList}
        </div>
      </div>
    );
  }
}

export default Dashboard;
