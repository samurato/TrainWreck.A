import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Icon, Segment, Grid, Divider, Form, Header} from 'semantic-ui-react';
import Weather from '../component/Weather';
import * as Data from '../data.js';
import { timingSafeEqual } from 'crypto';

const options = [
  { key: '0', text: 'operator', value: 'operator' },
  { key: '1', text: 'admin', value: 'admin' }
]

class CreateUserForm extends Component {
  constructor(props){
    super(props);
    this.state = { 
      thisuser: [],
      submittedRole: ''
    }
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
        //document.getElementsByClassName("mainPane")[0].appendChild(document.createTextNode(JSON.stringify(msg)));
        this.setState({thisuser: msg})
        //console.log(msg)
      } else {
          console.log(`Failed to authenticate: ${msg.error}`);
      }
    }
  }

  async createUser(name){
    //const{submittedRole} = this.state
    //console.log(this.state)
    //console.log(submittedRole)
    
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/create', {
  //       method: 'POST',
  //       headers: {
  //           'Authorization': `Bear ${token}`
  //       },
  //       body: JSON.stringify({
  //           "name": name,
  //           "role": role,
  //           "email": email,
  //           "password": password
  //       })
  //     });

  //   const msg = await response.json();
  //   if(response.ok){
  //     console.log("okay");
  //   } else{
  //     console.log("FAILED")
  //   }
  // }
}

//handleChange = (event, {role, value}) => this.setState({submittedRole: value})

  handleChange = async (e) => {
    var selectedRole = e.target.firstChild.innerText;
    //console.log(selectedRole)
    await this.setState({submittedRole: selectedRole})
    //console.log(this.state.s)
  }

  render() {
    this.getMe();
    const{thisuser} = this.state;
    if (thisuser.role === "admin") {
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
              <Form onSubmit={(event) => this.createUser(event.target.name.value)}>
                <Form.Input name='name' label='Name' placeholder="First and Last Name" />
                <Form.Select name='role' label='Role' options={options} placeholder="Select Role" onChange={this.handleChange} />
              
                <Form.Input name='email' label='Email' type="email" placeholder="Email address" />
                <Form.Input name='password' label='Password' type="password" placeholder="Password" />

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
