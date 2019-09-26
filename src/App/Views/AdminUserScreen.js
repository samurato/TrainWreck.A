import React, {Component, Link} from 'react';
import * as Data from '../data.js';
import {Container, Grid, Header, Button, Icon, Placeholder, Segment} from 'semantic-ui-react';
import Weather from '../component/Weather';

let data = 'Jon Doe';
let trainData = '001';
let UserStatus = 'Y';
let UserRole = 'Driver'

 class AdminUserScreen extends Component {
    //state = { activeItem: 'home' }

    //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
      // const { activeItem } = this.state

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
