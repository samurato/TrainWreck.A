import React from 'react';
import {Button, Form, Grid, Header, Image, Segment, Message, Container} from 'semantic-ui-react';
import logo from '../component/logo.svg';
//import {userInfo} from 'os';
import * as Data from '../data.js'; // for endpoint URLs

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      window.location = "/";
    }
  }

  /* Updating Error state
  *
  * this function will be called to update the error message
  * 
  */
  setError (msg) {
    this.setState({error: msg})
  }

  /*Login 
  *
  * Based on user input, it will be sent to the database
  * as a POST API request. On success it will lead the 
  * user to the dashboard. On fail it will update the error
  * state and give according feedback
  * 
  */
  async login (email, password) {
    var plaintextPassword = password;

    const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/auth/login', { 
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "email": email,
          "password": plaintextPassword
      })
    });

    const msg = await response.json();

    if (response.ok) {
      
      localStorage.setItem('token', msg.token);
      this.setError(null);
      window.location = '/';

    } else {
      console.log('Failed to authenticate', await msg);
      this.setError(`Failed to authenticate: ${msg.error}`);
    }
  }

/*  async getMe () {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setError('token does not exist');
    } else {
      const response = await fetch('http://' + Data.EndpointAPIURL + '/api/users/me', { 
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const msg = await response.json();
      if (response.ok) {
          this.setError(null);
          console.log(JSON.stringify(msg));
      } else {
          console.log('Failed: ', msg);
          this.setError(`Failed to authenticate: ${msg.error}`);
      }
    }
  }*/

  render () {
    return (
      <div className="mainPane">

        <div className="topBar pane">
          <span className="title">Login</span>
        </div>

        <Container>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' textAlign='center'>
                <Image src={logo} /> Train System Control
              </Header>
              <Form size='large' onSubmit={(event) => this.login(event.target.email.value, event.target.password.value)}>
                <Segment stacked>
                  <Form.Input fluid icon='user' name='email' iconPosition='left' placeholder='E-mail address' />
                  <Form.Input
                    fluid
                    name='password'
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />

                  <Button color='blue' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              {/* <Button onClick={() => this.getMe()}>Get My Profile</Button> */}
              {this.state.error && <Message error>{this.state.error}</Message>}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}    

export default LoginScreen
