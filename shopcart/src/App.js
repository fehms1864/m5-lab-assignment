import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

class App extends Component {
  state = {
    items: [
      {
        id: 1,
        image: "/products/cologne.jpg",
        desc: "Unisex Cologne",
        value: 0,
      },
      {
        id: 2,
        image: "/products/iwatch.jpg",
        desc: "Apple iWatch",
        value: 0,
      },
      {
        id: 3,
        image: "/products/mug.jpg",
        desc: "Unique Mug",
        value: 0,
      },
      {
        id: 4,
        image: "/products/wallet.jpg",
        desc: "Mens Wallet",
        value: 0,
      },
    ]
  }

  render() {
    return (
      <div>
        <Navbar
          className="bg-info py-5 px-4"
          bg="primary"
          style={{
            width: "90%",
            margin: "1rem auto",
          }}>
          <Container>
              <h3 className='text-black'>Shop to React</h3>
              <div>
                <FontAwesomeIcon style={{ marginRight: '0.75rem' }} icon={faShoppingCart} /> 
                {/* using a reduce function for flexibility in the future if needed */}
                {this.state.items.reduce((total, item) => total + item.value, 0)} Items
            </div>
          </Container>
        </Navbar>

        <div style={{ margin: "auto", width: "90%" }}>
          <div className='d-flex flex-column gap-2'>
            {this.state.items?.map((item) => {
              return (
                <div>
                  <ItemRow item={item} />
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  }

}

//Functional Component for the item in the row
const ItemRow = ({ item }) => {
  return (
    <div
      key={item.id}
      className='d-flex flex-column'
      style={{marginLeft: "3rem"}}>
      <h5>{item.desc}</h5>
      <div className='d-flex align-items-center gap-2'>
        <div style={{ height: "200px", width: "200px" }} >
          {/* adding alt since it is reccommended by react as it would treat it as a warning otherwise */}
          <img src={item.image} alt={item.desc} style={{ width: "100%" }}/>
        </div>
        <ItemQuantity value={item.value} />
      </div>
    </div>
  );
};

//functional component for the Item Quantity displayed
const ItemQuantity = ({ value }) => {
  return (
    <div
      className="d-flex justify-content-between align-items-center gap-3">
      <div
        style={{border: "2px solid #dbdbdb",borderRadius: "2px",padding: "0.75rem"}}>
        {value}
      </div>
      <span>quantity</span>
    </div>
  );
};

export default App;
