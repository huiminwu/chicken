import React from "react";

import "../pages/Request.css";

import { get, post } from "../../utilities.js";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      units: 0,
      showProductDetails: false,
    };
  }

  componentDidMount() {}

  handleProductChange = (event) => {
    this.setState({ product: event.target.value, showProductDetails: true });
  };

  handleQuantityChange = (event) => {
    this.setState({ units: event.target.value });
  };

  handleSubmit = (event) => {
    const params = {
      product: this.state.product,
      units: this.state.units,
    };
    post("/api/requests", params).then((request) => console.log(request));
    event.preventDefault();
  };

  render() {
    const PRODUCT_TYPES = ["flour", "sugar", "paper", "bricks", "stone"];
    const PRODUCT_DETAILS = {
      flour: [{ unitPrice: "$1", minUnits: "10" }],
      sugar: [{ unitPrice: "$2", minUnits: "20" }],
      paper: [{ unitPrice: "$3", minUnits: "30" }],
      bricks: [{ unitPrice: "$4", minUnits: "40" }],
      stone: [{ unitPrice: "$5", minUnits: "50" }],
    };

    const productPrices = PRODUCT_DETAILS[this.state.product];

    return (
      <div className="page-container">
        <div className="jeff">my name jeff</div>
        <h1 className="page-title">submit a request</h1>
        <select value={this.state.value} onChange={this.handleProductChange}>
          {PRODUCT_TYPES.map((product, k) => (
            <option key={k} value={product}>
              {product}
            </option>
          ))}
        </select>
        <select value={this.state.value} onChange={this.handleProductChange}>
          {this.state.product &&
            productPrices.map((price, k) => (
              <option key={k} value={price}>
                {price.unitPrice}
              </option>
            ))}
        </select>
        <input type="text" onChange={this.handleQuantityChange} />
        <button onClick={(event) => this.handleSubmit(event)}>Submit</button>
      </div>
    );
  }
}

export default Request;
