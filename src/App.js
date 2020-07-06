import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from './Components/Dashboard';
import Form from './Components/Form'
import Header from './Components/Header'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    }
  }

  componentDidMount() {
    this.getInventory();
  }

  getInventory = () => {
    axios.get('/api/inventory')
      .then(res => this.setState({ inventory: res.data }))
      .catch(err => console.log(err))
  }


  // addItem = info => {
  //   let newItem = [...this.state.inventory]
  //   newItem.push(info)
  //   this.setState({
  //     inventory: newItem
  //   })
  // }
  
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Header className="header" />
        <div className='main-section'>
          <Dashboard products={this.state.inventory} productFn={this.getInventory}/>
          <Form getInventory={this.getInventory}/>
        </div>
      </div>
    );
  }
}

export default App;
