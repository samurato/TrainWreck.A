import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Icon, Segment, Grid, Divider, Form,Message, Header} from 'semantic-ui-react';
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
      submittedRole: '',
      error: null,
      message: "Loading..."
    }
  }

 /* Updating Error state
  *
  * this function will be called to edit the error message
  * 
  */
  setError (msg) {
    this.setState({error: msg});
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    //Obtains and stores currently login user
    fetch('http://' + Data.EndpointAPIURL + '/api/users/me', { 
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then( res => res.json())
    .then((response) => {
      console.log(response)
      this.setState({ thisuser: response })
      //checks user permission
      if (!(this.state.thisuser.role === "admin")){
        this.setState({message: "You do not have permission to access this page."});
        //console.log(this.state.message)
        }
    });
  }
 
  /* Creates User
  *
  * based on the user inputs, the data will be sent 
  * to the database using an API POST fetch requst.
  * Based on the database resposne to the request,
  * it will update the error message.
  * 
  */
  async createUser(event){
    const token = localStorage.getItem('token');

    if (token) {
      const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": event.target.name.value,
            "role": this.state.submittedRole,
            "email": event.target.email.value,
            "password": event.target.password.value
        })
      });

    const msg = await response.json();
    if(response.ok){
      console.log("okay");
      //window.location.reload(); 
      this.setError('Successfully added user');
    } else{
      console.log("FAILED")
      //window.location.reload(); 
      this.setError(`Failed to create user: ${msg.error[0].msg} for ${msg.error[0].param}`);
      //console.log(msg);
      }
    }
  }

  /* Handling Dropbox selection
  *
  * Function used to store the user selected role
  * into a state.
  * 
  */
  handleChange = async (e) => {
    var selectedRole = e.target.firstChild.innerText;
    //console.log(selectedRole)
    await this.setState({submittedRole: selectedRole})
    //console.log(this.state.s)
    //Data.test = "changed"
    //console.log(Data.test)
  }

  render() {
    const{thisuser,message} = this.state;
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
              <Form onSubmit={(event) => this.createUser(event)}>
                <Form.Input 
                  name='name' 
                  label='Name'  
                  placeholder="First and Last Name" 
                  />
                <Form.Select 
                  name='role'
                  label='Role' 
                  options={options} 
                  placeholder="Select Role" 
                  onChange={this.handleChange}
                   />
                <Form.Input 
                  name='email' 
                  label='Email' 
                  type="email" 
                  placeholder="Email address" 
                  />
                <Form.Input 
                  name='password' 
                  label='Password' 
                  type="password" 
                  placeholder="Password" 
                  />

                <Form.Button>Submit</Form.Button>
              </Form>
              {this.state.error && <Message error>{this.state.error}</Message>}
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
            { message }
          </Container>

        </div>
      )
    }
  }
}

export default CreateUserForm
