import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { productData } from './products';
import Nav from './navbar';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      productsList: productData
    }
  }

  handleAddQuantity = ( product ) => {
    const counter = ++product.value;
    product.value = counter;
    this.setState( product );
  }

  handleRemoveQuantity = ( product ) => {
    const counter = --product.value;
    product.value = counter;
    this.setState( product );
  }

  render() {
    return (
      <div>
        <Nav products={productData} handleAddQuantity={this.handleAddQuantity} handleRemoveQuantity={this.handleRemoveQuantity} />
      </div>
    )
  }

}

export default App;
