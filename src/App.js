import React, { Component } from 'react';
// import logo from './logo.svg';
import SearchAppBar from './components/Navbar';
import Home from './components/Home';
import './App.css';


export default class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchAppBar />
        <Home />
      </div>
    );
  }
}