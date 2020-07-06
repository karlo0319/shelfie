import React from 'react';

function Product(props) {
    console.log(props)
    return (
        <div className='product-box' key={props.info.id}>
            <img className="image-box" src={props.info.image} alt="" />
            <div className="product-right">
                <div className="product-details">
                    <p> {props.info.name} </p>
                    <p> ${props.info.price} </p>
                </div>
                <div className="product-buttons">
                    <button> Edit </button>
                    <button onClick={props.deleteInventory}> Delete </button>
                </div>
            </div>
        </div>
    )
}

export default Product;
