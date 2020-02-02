import React from "react";

import "./Request.css";

import { get, post } from "../../utilities.js";
import { Helmet } from "react-helmet";

class Request extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "Choose a product...",
      price: "Choose a price...",
      units: null,
      showDropdown: null,
      error: null,
      submitted: false,
    };
  }

  componentDidMount() { }

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
    } else if (this.state.units <= 0 || isNaN(parseInt(this.state.units))) {
      this.setState({ error: "Please choose a valid quantity." });
    } else {
      const params = {
        product: this.state.product,
        price: this.state.price,
        units: this.state.units,
      };
      post("/api/requests", params).then((requests) => this.setState({ submitted: true }));
    }
  };

  handleMoreRequest = () => {
    this.setState({
      submitted: false,
      product: "Choose a product...",
      price: "Choose a price...",
    })
  }

  render() {
    const PRODUCT_DETAILS = {
      flour: [
        { unitPrice: "$1.00", minUnits: "30" },
        { unitPrice: "$2.00", minUnits: "10" },
      ],
      sugar: [{ unitPrice: "$2.00", minUnits: "20" }],
      paper: [{ unitPrice: "$3.00", minUnits: "30" }],
      bricks: [{ unitPrice: "$4.00", minUnits: "40" }],
      stone: [{ unitPrice: "$5.00", minUnits: "50" }],
      bread: [{ unitPrice: "$6.00", minUnits: "60" }],
    };

    const productPrices = PRODUCT_DETAILS[this.state.product];

    const productDropdown = (
      <div className="dropdown-menu">
        {Object.keys(PRODUCT_DETAILS).map((product, k) => (
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
        <Helmet>
          <title>Requests | Chip</title>
        </Helmet>
        {this.state.submitted ? (
          <>
            <div>
              Your request has been submitted! We'll update your dashboard when it's ready to be
              placed.
            </div>
            <button onClick={this.handleMoreRequest} className="footer-btn submit-more">
              Make another request
            </button>
          </>
        ) : (
            <>
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
              <div className="request-field u-flex-alignCenter">
                <div className="request-field-label">Quantity</div>
                <input
                  type="text"
                  onChange={(event) => this.handleFieldChange("units", event.target.value)}
                />
              </div>
              <div className="request-footer">
                {this.state.error}
                <button className="footer-btn">
                  <a href="/dashboard">Cancel</a>
                </button>
                <button
                  className="footer-btn submit-btn"
                  onClick={(event) => this.handleSubmit(event)}
                >
                  Submit
              </button>
              </div>
            </>
          )}
      </div>
    );
  }
}

export default Request;
