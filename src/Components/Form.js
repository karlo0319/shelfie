import React, { Component } from 'react';
import axios from 'axios';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageInput: '',
            productInput: '',
            priceInput: 0,
            selectedProductID: null
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { selectedProductId } = this.props
        if (selectedProductId !== prevProps.selectedProductId) {
            this.setState({ selectedProductID: selectedProductId })
            if (selectedProductId) {
                this.getProduct(selectedProductId)
            }
        }
    }

    getProduct = (id) => {
        axios.get(`/api/inventory/${id}`)
        .then(res => {
            const {name, price, image} = res.data[0]
            this.setState({productInput: name, priceInput: price, imageInput: image})
        })
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

    addInventory = () => {
        axios.post('/api/inventory', { name: this.state.productInput, price: this.state.priceInput, image: this.state.imageInput })
            .then(() => this.props.getInventory(), this.handleCancel())
            .catch(err => console.log(err))
    }

    saveChanges = (id) => {
        axios.post(`/api/inventory/${id}`, {name: this.state.productInput, price: this.state.priceInput, image: this.state.imageInput })
            .then(() => this.props.getProduct(id), this.handleCancel())
            .catch(err => console.log(err))
    }

    render() {
        // console.log(this.state)
        return (
            <div className='form'>
                {!this.state.imageInput ?
                    <img className="image-preview" alt="preview-box" src='https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png' />
                    :
                    <img className="image-preview" alt="preview-box" src={this.state.imageInput} />
                }
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
                    {!this.state.selectedProductID 
                    ?
                    <button onClick={this.addInventory}> Add to Inventory </button>
                    :
                    <button onClick={this.saveChanges}> Save Changes </button>
                    }
                </div>
            </div>
        )
    }
}


export default Form;