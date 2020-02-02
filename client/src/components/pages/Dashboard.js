import React from "react";
import "./Dashboard.css";

import { get, post } from "../../utilities.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRequests: null,
      matchedRequests: null,
    };
  }

  componentDidMount() {
    get("/api/requests", { user: this.props.user }).then((requests) => {
      const pendingRequests = requests.filter((request) => !request.isMatched);
      const matchedRequests = requests.filter((request) => request.isMatched);
      this.setState({ pendingRequests: pendingRequests, matchedRequests: matchedRequests });
    });
  }

  handleCancel = (id) => {
    post("/api/cancel", { _id: id }).then((deletedRequest) => {
      const allPendingRequests = this.state.pendingRequests;
      const cancelIndex = allPendingRequests.indexOf(deletedRequest);
      allPendingRequests.splice(cancelIndex, 1);
      this.setState({
        pendingRequests: allPendingRequests,
      });
    });
  };

  render() {
    let pendingRequestList = <div>Loading...</div>;
    let matchedRequestList = <div>Loading...</div>;
    if (this.state.pendingRequests && this.state.matchedRequests) {
      pendingRequestList = this.state.pendingRequests.map((request, k) => (
        <div key={k} className="request-info-container">
          <div className="request-info-product">{request.product}</div>
          <div className="request-info-property">{request.units}</div>
          <div className="request-info-property">{request.price}</div>
          <button className="request-info-btn" onClick={() => this.handleCancel(request._id)}>
            Cancel
          </button>
        </div>
      ));

      matchedRequestList = this.state.matchedRequests.map((request, k) => (
        <div key={k} className="request-info-container">
          <div className="request-info-product">{request.product}</div>
          <div className="request-info-property">{request.units}</div>
          <div className="request-info-property">{request.price}</div>
          <button className="request-info-btn">Confirm</button>
        </div>
      ));
    }

    return (
      <div className="page-container">
        <div className="dashboard-container">
          <div className="welcome">Welcome</div>
          <h3 className="dashboard-subheader">Matched Requests</h3>
          <div className="request-info-grid">{matchedRequestList}</div>
          <h3 className="dashboard-subheader">Pending Requests</h3>
          <div className="request-info-grid">{pendingRequestList}</div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
