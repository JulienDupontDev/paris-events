import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/navbar';

export default class App extends Component{
  // constructor(props){
  //   super(props);
  // }

  render(){
    return (
      <div className="App">
        <SearchAppBar />
      </div>
    );
  }
}