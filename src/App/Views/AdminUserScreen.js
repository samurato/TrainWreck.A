import React, {Component} from 'react';
import * as Data from '../data.js';
import {Link} from 'react-router-dom';
import {Container, Grid, Header, Button, Icon, Placeholder, Segment} from 'semantic-ui-react';
import Weather from '../component/Weather';

let data = 'Jon Doe';
let trainData = '001';
let UserStatus = 'Y';
let UserRole = 'Driver'

 class AdminUserScreen extends Component {

  constructor(props){
    super(props);
    this.state = { 
    items : [],
    thisuser: []
    }
  }

 

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetch('http://' + Data.EndpointAPIURL + '/api/users', {
      headers: {
        method: 'GET',
        'Authorization': `Bearer ${token}`}})
    .then( res => res.json())
    .then((response) => {
      //console.log(response)
      this.setState({ items: response.users })})
    //.catch(console.log)
    //console.log(items)

     const response =  fetch('http://' + Data.EndpointAPIURL + '/api/users/me', { 
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then( res => res.json())
      .then((response) => {
        //console.log(response)
        this.setState({ thisuser: response })
      });
      

  }

  async getMe () {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://' + Data.EndpointAPIURL + '/api/users/me', { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const msg = await response.json();
      if (response.ok) {
        document.getElementsByClassName("mainPane")[0].appendChild(document.createTextNode(JSON.stringify(msg)));
        //this.setState({thisuser: msg})
        //console.log(msg)
      } else {
          console.log(`Failed to authenticate: ${msg.error}`);
      }
    }
  }

  render() {
    const{items} = this.state;
    const{thisuser} = this.state;


    //console.log(thisuser)
    //console.log(thisuser.role === "admin")
    if (thisuser.role === "admin") {
      return (
        <div className="mainPane">

          <div className="topBar pane">
            <span className="title">Users</span>
            <Weather />
          </div>

          <Container>
            <Header>
              Users logged in: {items.length} 
              { thisuser.role === "admin" ? 
                <Button inverted color="blue">
                  <Link to="/edit-users">
                    <Icon name="add" /> Edit Users
                  </Link>
                </Button> 
              : "" }
            </Header>
              <div class="UserSummary">
              {items.map((items, index) => (
                <Segment stackable>
                  <h3>{items.name}</h3>
                  <p><i>{items.role}</i></p>
                </Segment>
              ))}
              </div>


                <Button onClick={() => this.getMe()}>Get My Profile</Button>
          </Container>

        </div>
        )
    }else {
      return (
        <div className="mainPane">

          <div className="topBar pane">
            <span className="title">Users</span>
            <Weather />
          </div>

          <Container>
            You do not have permission to access this page.
          </Container>

        </div>
      )
    }
  }
 }
function UserSummary(items) {
  return (
    <Segment className={items.id}>
      {items.name}
          <Link to={"/dashboard#" + items.id}><Button inverted color="yellow">Edit</Button></Link>
    </Segment>
  );
}

export default AdminUserScreen;
