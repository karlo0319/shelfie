import React, { Component } from 'react';
import Product from './Product';
import axios from 'axios';

class Dashboard extends Component {

    deleteInventory = (id) => {
        axios.delete(`/api/inventory/${id}`)
        .then(() => this.props.productFn())
        .catch(err => console.log(err))
    }

    

    render() {
        const { products } = this.props;
        const mappedList = products.map(info => {
            // console.log(info)
            return <Product toggleEdit={this.props.toggleEdit} deleteInventory={this.deleteInventory} key={info.id} info={info} />
        })
        return (
            <div>
                {mappedList}
            </div>
        )
    }
}


export default Dashboard;