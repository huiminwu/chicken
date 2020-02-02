import React from "react";

import { get, post } from "../../utilities.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "flour",
      units: 0,
      id: 100
    };
  }

  componentDidMount() { }

  handleProductChange = event => {
    this.setState({ product: event.target.value });
  };

  handleQuantityChange = event => {
    this.setState({ units: event.target.value });
  };

  handleSubmit = event => {
    console.log(this.state.product);
    console.log(this.state.units);
    const params = {
      product: this.state.product,
      units: this.state.units,
      id: this.state.id
    };
    post("/api/requests", params).then(request => console.log(request));
    event.preventDefault();
  };

  render() {
    const PRODUCT_TYPES = ["flour", "sugar", "paper", "bricks", "stone"];
    return (
      <div className="Home">
        my name jeff Choose a product:
        <select value={this.state.value} onChange={this.handleProductChange}>
          {PRODUCT_TYPES.map((product, k) => (
            <option key={k} value={product}>
              {product}
            </option>
          ))}
        </select>
        <input type="text" onChange={this.handleQuantityChange} />
        <button onClick={event => this.handleSubmit(event)}>Submit</button>
      </div>
    );
  }
}

export default Home;
