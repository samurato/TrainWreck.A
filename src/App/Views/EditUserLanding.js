import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Icon, Segment, Grid, Divider, Form, Header} from 'semantic-ui-react';
import Weather from '../component/Weather';
import * as Data from '../data.js';

class EditUserScreen extends Component {
  render() {
    if (Data.UserPermissions === "Administrator") {
      return (
        <div className="mainPane admin">

          <div className="topBar pane">
            <span className="title">Edit Users</span>
            <Weather />
          </div>

          <Container>
            <p>Please select an action.</p>

            <Segment placeholder>
              <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                  <Grid.Column>
                    <Header icon>
                      <Icon name='user plus' />
                    </Header>

                    <Link to="/add-user">
                      <Button primary>Add Users</Button>
                    </Link>
                  </Grid.Column>

                  <Grid.Column>
                    <Header icon>
                      <Icon name='users' />
                    </Header>

                    <Link to="/modify-user">
                      <Button primary>Modify Users</Button>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>

            <Link to="/users">
              <Button secondary>
                <Icon name="chevron left" />
                Go Back
              </Button>
            </Link>
          </Container>

        </div>
      )
    } else {
      return (
        <div className="mainPane">

          <div className="topBar pane">
            <span className="title">Create User</span>
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

export default EditUserScreen
