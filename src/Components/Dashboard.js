import React, { Component } from 'react';
import Product from './Product';
import axios from 'axios';

class Dashboard extends Component {

    deleteInventory = () => {
        axios.delete(`/api/inventory/${this.props.inventory.id}`)
        .then(() => this.props.productFn())
        .catch(err => console.log(err))
    }

    render() {
        const { products } = this.props;
        const mappedList = products.map(info => {
            // console.log(info)
            return <Product deleteInventory={this.deleteInventory} key={info.id} info={info} />
        })
        return (
            <div>
                {mappedList}
            </div>
        )
    }
}


export default Dashboard;