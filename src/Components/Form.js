import React, { Component } from 'react';
import axios from 'axios';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageInput: '',
            productInput: '',
            priceInput: 0
        }
    }

    handleInput = e => {
        console.log(e.target)
        this.setState({ [e.target.name]: e.target.value })
    }

    
    handleCancel = e => {
        this.setState({
            imageInput: '',
            productInput: '',
            priceInput: ''
        })
    }
    
    // handleSubmit = e => {
    //     e.preventDefault()
    //     this.props.addItem(this.state)
    //     this.setState({
    //         imageInput: '',
    //         productInput: '',
    //         priceInput: ''
    //     })
    // }

    addInventory = () => {
        axios.post('/api/inventory', {name: this.state.productInput, price: this.state.priceInput, image: this.state.imageInput})
        .then(() => this.props.getInventory(), this.handleCancel())
        .catch(err => console.log(err))
      }

    
    render() {
        // console.log(this.state)
        return (
            <div className='form'>
                <div className="image-preview" src={this.state.imageInput} alt=""></div>
                <p> Image URL: </p>
                <input
                    // placeholder="Image URL"
                    type='text'
                    name='imageInput'
                    value={this.state.imageInput}
                    onChange={this.handleInput} />
                <p> Product Name: </p>
                <input
                    type='text'
                    name='productInput'
                    value={this.state.productInput}
                    onChange={this.handleInput} />
                <p> Price: </p>
                <input
                    type='text'
                    name='priceInput'
                    value={this.state.priceInput}
                    onChange={this.handleInput} />
                <div className="form-buttons">
                        <button onClick={this.handleCancel}> Cancel </button>
                        <button onClick={this.addInventory}> Add to Inventory </button>
                </div>
            </div>
        )
    }
}


export default Form;