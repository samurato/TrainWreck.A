import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Icon, Segment, Grid, Divider, Form, Header} from 'semantic-ui-react';
import Weather from '../component/Weather';
import * as Data from '../data.js';

const options = [
  { key: '0', text: 'Operator', value: 'operator' },
  { key: '1', text: 'Administrator', value: 'admin' }
]

class CreateUserForm extends Component {
  render() {
    if (Data.UserPermissions === "Administrator") {
      return (
        <div className="mainPane admin">

          <div className="topBar pane">
            <span className="title">Create User</span>
            <Weather />
          </div>

          <Container>
            <Link to="/edit-users">
              <Button secondary>
                <Icon name="chevron left" />
                Go Back
              </Button>
            </Link>

            <Segment padded="very">
              <Form>
                <Form.Input label='Name' placeholder="First and Last Name" />
                <Form.Select label='Role' options={options} placeholder="Select Role" />
              
                <Form.Input label='Email' type="email" placeholder="Email address" />
                <Form.Input label='Password' type="password" placeholder="Password" />

                <Form.Button>Submit</Form.Button>

                ((add status message here))

              </Form>
            </Segment>
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

export default CreateUserForm
