import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart(props) {
    return (
        <div className='cart-body'>
            <h4>Your Cart Items</h4>
            <div className='d-flex flex-column product-row mb-3'>
                {props.cartItems?.filter(item => item.value > 0)
                .map((item) => {
                    return (
                        <div>
                            <ItemRow item={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

//Functional Component for the item in the row
const ItemRow = ({ item }) => {
    return (
        <div
            key={item.id}
            className='d-flex flex-column'
            style={{ margin: "0.5rem 0 0 2rem"}}>
            <div className='d-flex align-items-center gap-4'>
                <div className='d-flex align-items-center image-size' >
                    <img style={{ width: "100%"}} src={item.image} alt={item.desc} />    
                </div>
                <ItemQuantity value={item.value} />
            </div>
            <div className='cart-item-desc mb-3'>{item.desc}</div>
        </div>
    );
};

//functional component for the Item Quantity displayed
const ItemQuantity = ({ value }) => {
    return (
        <div className="d-flex justify-content-between align-items-center gap-3">
            <span><strong>Quantity: </strong>{value}</span>
        </div>
    );
};

export default Cart;