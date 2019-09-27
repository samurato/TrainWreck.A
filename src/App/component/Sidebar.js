import React, {Component} from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

class SidebarComponent extends Component {
  state = {activePage: (window.location.pathname === '/users' ? 'users' : 'trains')}

  handleMenuClick = (e) => {
    var clickedName = e.target.parentNode.name || e.target.parentNode.parentNode.name;
    this.setState({activePage: clickedName});
  } 

  logout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
  }

  render() {
    if (localStorage.getItem('token')) {
      return (
        <Menu ui vertical labeled icon fluid>
          <Link to="/" name="trains" onClick={this.handleMenuClick}>
            <Menu.Item
              active={this.state.activePage === 'trains'}>
            <Icon name='train' /> Trains
            </Menu.Item>
          </Link>
          <Link to="/users" name="users" onClick={this.handleMenuClick}>
            <Menu.Item
              active={this.state.activePage === 'users'}
            >
              <Icon name='user' /> Users
            </Menu.Item>
          </Link>
          <Menu.Item
            name='logout'
            onClick={this.logout}
            style={{bottom: '0px'}}
          >
            <Icon name='power' /> Logout
          </Menu.Item>
        </Menu>
      );
    } else {
      return null;
    }
  }
}

export default SidebarComponent;