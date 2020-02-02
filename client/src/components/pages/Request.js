import React from "react";

import "../pages/Request.css";

import { get, post } from "../../utilities.js";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "Choose a product...",
      price: "Choose a price...",
      units: null,
      showDropdown: null,
      error: null,
    };
  }

  componentDidMount() {}

  toggleDropdown = (dropdown) => {
    if (this.state.showDropdown === dropdown) {
      this.setState({ showDropdown: null });
    } else {
      this.setState({ showDropdown: dropdown });
    }
  };

  handleFieldChange = (field, value) => {
    this.setState({ [field]: value, showDropdown: null, error: null });
  };

  handleSubmit = () => {
    if (this.state.product === "Choose a product...") {
      this.setState({ error: "Please choose a product." });
    } else if (this.state.price === "Choose a price...") {
      this.setState({ error: "Please choose a price." });
    } else if (this.state.units <= 0) {
      this.setState({ error: "Please choose a valid quantity." });
    } else {
      const params = {
        product: this.state.product,
        price: this.state.price,
        units: this.state.units,
      };
      post("/api/requests", params).then((request) => console.log(request));
    }
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

    const productDropdown = (
      <div className="dropdown-menu">
        {PRODUCT_TYPES.map((product, k) => (
          <div
            key={k}
            className="dropdown-btn"
            onClick={() => this.handleFieldChange("product", product)}
          >
            {product}
          </div>
        ))}
      </div>
    );

    let priceDropdown = null;
    if (this.state.product !== "Choose a product...") {
      priceDropdown = (
        <div className="dropdown-menu">
          {productPrices.map((price, k) => (
            <div
              key={k}
              className="dropdown-btn"
              onClick={() => this.handleFieldChange("price", price.unitPrice)}
            >
              {price.unitPrice}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="page-container">
        <div className="jeff">my name jeff</div>
        <h1 className="page-title">submit a request</h1>
        <div className="request-field">
          <div className="request-field-label">Product</div>
          <div className="dropdown-container">
            <div className="dropdown-first-btn" onClick={() => this.toggleDropdown("product")}>
              {this.state.product}
            </div>
            {this.state.showDropdown === "product" && productDropdown}
          </div>
        </div>
        <div className="request-field">
          <div className="request-field-label">Price</div>
          <div className="dropdown-container">
            <div className="dropdown-first-btn" onClick={() => this.toggleDropdown("price")}>
              {this.state.price}
            </div>
            {this.state.showDropdown === "price" && priceDropdown}
          </div>
        </div>
        <div className="request-field">
          <div className="request-field-label">Quantity</div>
          <input
            type="text"
            onChange={(event) => this.handleFieldChange("units", event.target.value)}
          />
        </div>
        <button className="submit-btn" onClick={(event) => this.handleSubmit(event)}>
          Submit
        </button>
        {this.state.error}
      </div>
    );
  }
}

export default Request;
