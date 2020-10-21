import Home from './components/home';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/navbar';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchTerm: "jznfzjn",
      // events: [],
    }
  }

  updateSearchTerm = (newSearchTerm) => {
    this.setState({
      searchTerm: newSearchTerm 
    })
  }


  render(){
    const state = this.state;
    
    return (
      <div className="App">
        <SearchAppBar updateSearchTerm={this.updateSearchTerm} />
        <Home searchTerm={state.searchTerm} />
      </div>
    );
  }
}