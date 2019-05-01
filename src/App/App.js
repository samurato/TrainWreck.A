import React, { Component, Fragment } from 'react';
//import logo from '../logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routes from "./routes.js";
import Header from "./component/Header"
import Footer from "./component/Footer"



class App extends Component {
  render() {
    return (

     <BrowserRouter>
    <Fragment>
    <Header/>
    <Routes/>
    <Footer/>
    </Fragment>
  </BrowserRouter>


        );
  }
}

export default App;
