import React, { Component, Fragment } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
//import logo from './component/logo.svg';
import Routes from './routes.js';
import Sidebar from './component/Sidebar';
import Footer from './component/Footer';

function Pane(props) {
  return <div className={'pane ' + props.name}>{props.component}</div>;
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <div id='App'>
            <Pane name="logoPane" component={<a href="/" className="noselect">TSC</a>} />
            <Pane name="sidePane" component={<Sidebar />} />
            <Routes />
            <div className='footerPane'>
              <Footer/>
            </div>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
