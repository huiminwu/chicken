import React from "react";

import { get, post } from "../../utilities.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "flour",
      units: 0,
      id: 100,
    };
  }

  componentDidMount() {}

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
        <button onClick={(event) => this.handleSubmit(event)}>Submit</button>
      </div>
    );
  }
}

export default Dashboard;
