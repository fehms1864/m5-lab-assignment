import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { faShoppingCart, faR } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import DisplayProducts from './displayProducts';
import Cart from './cart';
import SignIn from './SignIn';

function Nav(props) {
    return (
        <Router>
            <Navbar className="bg-info py-5 px-4 nav-bar" bg="primary">
                <Container>
                    <Link className='links' to="/">
                        <h3 className='text-white'>Shop 2&nbsp;
                            <FontAwesomeIcon
                                icon={faR}
                                className="rIcon bg-white rounded-circle text-info py-2 px-3">
                            </FontAwesomeIcon>eact</h3>
                    </Link>
                    <div className="text-white">
                        <Link className="links" to="/cart">
                            <FontAwesomeIcon style={{ marginRight: '0.75rem' }} icon={faShoppingCart} />
                        </Link>
                        {/* using a reduce function for flexibility in the future if needed */}
                        {props.products.reduce((total, item) => total + item.value, 0)} Items
                    </div>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/cart"
                    element={ <Cart cartItems={props.products}/> } />
                <Route path="/"
                    element={
                        <DisplayProducts
                            products={props.products}
                            handleAddQuantity={props.handleAddQuantity}
                            handleRemoveQuantity={props.handleRemoveQuantity}
                        />
                    }
                />
                <Route path="/signin"
                    element={
                        <SignIn />
                    }
                />
            </Routes>
        </Router>
    )
}

export default Nav;