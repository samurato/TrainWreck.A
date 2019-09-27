import React, {Component, Link} from 'react';
import * as Data from '../data.js';
import {Container, Grid, Header, Button, Icon, Placeholder, Segment} from 'semantic-ui-react';
import Weather from '../component/Weather';

let data = 'Jon Doe';
let trainData = '001';
let UserStatus = 'Y';
let UserRole = 'Driver'

 class AdminUserScreen extends Component {
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
      } else {
          console.log(`Failed to authenticate: ${msg.error}`);
      }
    }
  }

  render() {
    return (
      <div className="mainPane">

        <div className="topBar pane">
          <span className="title">Users</span>
          <Weather />
        </div>

        <Container>
          <Header>
            Users logged in: {Data.UsersData.length} 
            { Data.UserPermissions === "Administrator" ? 
              <Button inverted color="blue">
                <Icon name="add" />
                Edit Users
              </Button> 
            : "" }
          </Header>
            <div class="UserSummary">
            {Data.UsersData.map((data, index) => (
              <Segment stackable>
                <h3>{data.name}</h3>
                <p><i>{data.permissions}</i></p>
              </Segment>
            ))}
            </div>


              <Button onClick={() => this.getMe()}>Get My Profile</Button>
        </Container>

      </div>
      )
  }
}

function UserSummary(data) {
  return (
    <Segment className={data.id}>
      {data.name}
          <Link to={"/dashboard#" + data.id}><Button inverted color="yellow">Edit</Button></Link>
    </Segment>
  );
}

export default AdminUserScreen;
