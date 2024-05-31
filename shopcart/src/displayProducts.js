import './App.css';
import React, { useState, useEffect } from "react";
import { Modal } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DisplayProducts(props) {
    const [show, setShow] = useState(false);
    const [showImage, setShowImage] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = (product) => {
        setShow(true);
        setShowImage(product);
    }
    const [sortedData, setSortedData] = useState(props.products);
    const [sortType, setSortType] = useState("normal");

    useEffect(() => {
        const sortArray = (type) => {
            let sorted = [...props.products];
            switch (type) {
                case "highest":
                    sorted = [...props.products].sort(
                        (a, b) => b['price'] - a['price']
                    );
                    return setSortedData(sorted);
                case "lowest":
                    sorted = [...props.products].sort(
                        (a, b) => a['price'] - b['price']
                    );
                    return setSortedData(sorted);
                case "normal":
                    return setSortedData(sorted);
                default:
                    return setSortedData(sorted);
            }
        };
        sortArray(sortType);
    }, [props.products, sortType]);

    return (
        <div className='display-products'>
            <SortRow setSortType={setSortType} />
            <div className='d-flex flex-column mb-3 product-row'>
                {sortedData.map((item) => {
                    return (
                        <div>
                            <ItemRow item={item} handleShow={handleShow} handleAddQuantity={props.handleAddQuantity} handleRemoveQuantity={props.handleRemoveQuantity} />
                        </div>
                    );
                })}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{showImage.desc}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={showImage.image}
                            width="350"
                            alt={showImage.desc}
                            className='mx-5'
                        />
                        <p><span className='text-dark'>Ratings:</span> {showImage.ratings}/5</p>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

//Functional Component for the item in the row
const ItemRow = ({ item, handleShow, handleRemoveQuantity, handleAddQuantity }) => {
    return (
        <div key={item.id} className='d-flex flex-column item-row'>
            <div className='d-flex flex-row'>
                <h5 className='d-flex justify-content-center' style={{ width: "200px" }}>
                    {item.desc}
                </h5>
                <h5 className='item-price'>{`$${item.price}`}</h5>
            </div>
            <div className='d-flex align-items-center gap-2'>
                <div className='d-flex align-items-center image-size'>
                    <img style={{ cursor: 'pointer', width: "100%" }} src={item.image} alt={item.desc} onClick={() => handleShow(item)} />
                </div>
                <button type='button' className='addOrRemoveButton'>
                    <FontAwesomeIcon
                        icon={faCircleMinus}
                        className="fa-2x mx-2"
                        onClick={() => item.value === 0 ? item.value = 0 : handleRemoveQuantity(item)}
                    />
                </button>
                <button type='button' className='addOrRemoveButton'>
                    <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="fa-2x mx-2"
                        onClick={() => {
                            handleAddQuantity(item);
                        }
                        }
                    />
                </button>

                <ItemQuantity value={item.value} />
            </div>
        </div>
    );
};

//functional component for the Item Quantity displayed
const ItemQuantity = ({ value }) => {
    return (
        <div className="d-flex justify-content-between align-items-center gap-3">
            <div className='quantityValueBox'>
                {value}
            </div>
            <span>quantity</span>
        </div>
    );
};

const SortRow = ({ setSortType }) => {
    return (
        <div className='sort-row'>
                <label>Sort Price By: </label> &nbsp;
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="highest">Highest</option>
                    <option value="lowest">Lowest</option>
                </select>
            </div>
    )
}

export default DisplayProducts;
