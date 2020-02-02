import React from "react";

import "../pages/Request.css";

import { get, post } from "../../utilities.js";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      price: null,
      units: null,
      // showDropdown: null,
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

  handleProductChange = (product) => {
    this.setState({ product: product });
  };

  // handleFieldChange = (field, event) => {
  //   this.setState({ [field]: event.target.value });
  // };

  // handleProductChange = (event) => {
  //   this.setState({ product: event.target.value });
  // };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };

  handleQuantityChange = (event) => {
    this.setState({ units: event.target.value });
  };

  handleSubmit = (event) => {
    if (!this.state.product) {
      this.setState({ error: "Please choose a product." });
    } else if (!this.state.price) {
      this.setState({ error: "Please choose a price." });
    } else if (this.state.units <= 0) {
      this.setState({ error: "Please choose a valid quantity." });
    } else {
      const params = {
        product: this.state.product,
        units: this.state.units,
      };
      post("/api/requests", params).then((request) => console.log(request));
      event.preventDefault();
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
          <div key={k} className="dropdown-btn" onClick={() => this.handleProductChange(product)}>
            {product}
          </div>
        ))}
      </div>
    );

    let priceDropdown = null;
    if (this.state.product) {
      priceDropdown = (
        <div className="dropdown-menu">
          {productPrices.map((price, k) => (
            <div
              key={k}
              className="dropdown-btn"
              onClick={() => this.handlePriceChange(price.unitPrice)}
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
              Choose a product...
            </div>
            {this.state.showDropdown === "product" && productDropdown}
          </div>
        </div>
        <div className="request-field">
          <div className="request-field-label">Price</div>
          <div className="dropdown-container">
            <div className="dropdown-first-btn" onClick={() => this.toggleDropdown("price")}>
              Choose a price...
            </div>
            {this.state.showDropdown === "price" && priceDropdown}
          </div>
        </div>
        <div className="request-field">
          <div className="request-field-label">Quantity</div>
          <input type="text" onChange={this.handleUnitsChange} />
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
