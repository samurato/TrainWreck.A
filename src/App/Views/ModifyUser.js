import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Icon, Segment, Grid, Divider, Form, Dropdown, Modal,Message, Header} from 'semantic-ui-react';
import Weather from '../component/Weather';
import * as Data from '../data.js';

const options = [
  { key: '0', text: 'operator', value: 'operator' },
  { key: '1', text: 'admin', value: 'admin' }
]

class ModifyUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      id: "",
      modalOpen: false,
      userList: [],
      thisuser: [],
      submittedRole: "",
      error: null,
      message: "Loading..."
    }
  }

  // Function to select user to edit, while storing their user ID and name
  /* Select User to modify
  *
  * Function used to obtain and store the selected user into a state
  * 
  */
  selectNewUser = async (e) => {
    // Obtains the user id based on an array search for the user name
    var matchUser = this.state.userList.find((element) => {
      return element.name === e.target.firstChild.innerText;
    })
    //console.log(matchUser._id)
    await this.setState({name: e.target.firstChild.innerText, id: matchUser});
    //console.log(this.state)
  } 
  
  /* Closing modal 
  *
  * Function used to update whether to show or hide the modal
  * 
  */
  closeModal = () => this.setState({ modalOpen: false })

  // Function to update error state 
  setError (msg) {
    this.setState({error: msg})
  }

  /*Modify name
  *
  * Event handler to change the name of the previously selected
  * user through a PUT API request.Based on the request response
  * it will update an error message to display feedback.
  * 
  * 
  */
  modifyName = async (event,id) => {
    //console.log(event.target.changeName.value)
    const token = localStorage.getItem('token');
    //const token = "test"
    if (token) {
      const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/name/'+ id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": event.target.changeName.value
        })
      });

    const msg = await response.json();
    if(response.ok){
      console.log(msg);
      this.setError('Successfully changed name');
      //window.location.reload(); 
      
    } else{ 
      //console.log(msg)
      this.setError(`Failed to change password ${msg[0].msg}`);
      //window.location.reload();
      }
    }
  }

  // Event handler used to get dropdown box user selection 
  handleChange = async (e) => {
    var selectedRole = e.target.firstChild.innerText;
    //console.log(selectedRole)
    await this.setState({submittedRole: selectedRole})
    //console.log(this.state.submittedRole)
    }

  /*Modify Role
  *
  * Event handler to change the role of the previously selected
  * user through a PUT API request.Based on the request response
  * it will update an error message to display feedback.
  * 
  * 
  */  
  modifyRole = async (id) => {
    //this way we have access to this
    //console.log(this.state)
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/role/'+ id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "role": this.state.submittedRole
        })
      });

    const msg = await response.json();
    if(response.ok){
      console.log("okay");
      this.setError('Successfully changed role');
      //window.location.reload(); 
      
    } else{ 
      console.log("FAILED")
      this.setError('Invalid role selection');
      //window.location.reload();
      }
    }
  }

  /*Modify Password
  *
  * Event handler to change the password of the previously selected
  * user through a PUT API request.Based on the request response
  * it will update an error message to display feedback.
  * 
  * 
  */
  modifyPassword = async (event,id)=>{
    var plaintextPassword = event.target.changePassword.value
    //console.log(event.target)
    const token = localStorage.getItem('token');
    //const token = "test"
    if (token) {
      const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/password/'+ id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "password": plaintextPassword
        })
      });

    const msg = await response.json();
    if(response.ok){
      console.log("okay");
      //window.location.reload(); 
      this.setError('Successfully changed password');
      
    } else{ 
      console.log(msg)
      //window.location.reload();
      //password has to be longer than 8 characters
      this.setError(`failed to change password ${msg.error[0].msg}`);
      //window.location.reload();

      }
    }
  }

  /*Delete user
  *
  * Event handler to delete the previously selected
  * user through a DELETE API request.Based on the request response
  * it will update an error message to display feedback.
  * 
  * 
  */
  removeUser = async (id) =>{
    //console.log("reached")
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/remove/'+ id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      });

    const msg = await response.json();
    if(response.ok){
      console.log("okay");
      //window.location.reload(); 
      this.setError('Successfully removed user');
      
    } else{ 
      console.log("FAILED")
      //window.location.reload()
      this.setError('Failed to removed user')
      }
    }
  }

  /*Closing delete user modal
  *
  * Event handler to close the delete user modal
  * 
  */
  alternateremoveUser = async () =>{
    console.log("need to close modal")

  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    
    //Obtains and stores list of users from the database
    fetch('http://' + Data.EndpointAPIURL + '/api/users', {
      headers: {
        method: 'GET',
        'Authorization': `Bearer ${token}`}})
    .then( res => res.json())
    .then((response) => {
      //console.log(response)
      this.setState({ userList: response.users })})
    .catch(console.log)
    //console.log(items)

    //Obtains and stores data on currenlty login user
    fetch('http://' + Data.EndpointAPIURL + '/api/users/me', { 
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then( res => res.json())
      .then((response) => {
        //console.log(response)
        this.setState({ thisuser: response })
        if (!(this.state.thisuser.role === "admin")){
          this.setState({message: "You do not have permission to access this page."})
          console.log(this.state.message)
        }
      });
      

  }

  render() {
    let test = this.state.userList.map(function (userList, index) {
      return { key: index, value: userList._id, text: userList.name };
    })

    const { name, id, modalOpen, userList,thisuser,message } = this.state;

    //console.log(userList)
    if (thisuser.role === "admin") {
      return (
        <div className="mainPane admin">
          
          <div className="topBar pane">
            <span className="title">Edit Users</span>
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
              <Form size="large">
                <Form.Select 
                  name='users' 
                  label='User' 
                  options={test} 
                  placeholder="Select User" 
                  onChange={(event) => this.selectNewUser(event)} 
                  />

                {/* <Form.Field control="select">
                  <option selected disabled>Select user to edit</option>
                  {userList.map((data, index) => (
                    <option
                      name="user" 
                      value={data.id} 
                      onClick={this.selectNewUser}
                    >
                      {data.name}
                    </option>
                  ))}
                </Form.Field> */}
              </Form>

              <SubForms 
                userId={id} 
                userName={name} 
                nameHandler={this.modifyName} 
                passwordHandler={this.modifyPassword} 
                roleHandler={this.modifyRole} 
                dropboxHandler={this.handleChange} 
                removeHandler={this.removeUser} 
                alternateHandler={this.alternateremoveUser} 
                error={this.state.error}/>

            </Segment>
            {/* <pre>Load these users from routes.js: <br/>{JSON.stringify({userList}, null, 2)}</pre> */}

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


function SubForms(props) {
  const userId = props.userId;

  if (userId) {
    return(
      <Segment basic>
        <Grid columns={2} stackable textAlign='center'>
          <Grid.Row verticalAlign='middle'>

            <Grid.Column>
              <Modal
                closeIcon
                size="tiny"
                closeOnEscape={false}
                closeOnDimmerClick={false}
                trigger={<Button fluid>Change Name</Button>}>
                
                <Modal.Header>Enter New Name</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(event) => props.nameHandler(event,userId._id)}>
                    <Form.Input name="changeName" fluid />
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Form>
                  {props.error && <Message error>{props.error}</Message>}
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
              </Modal>
            </Grid.Column>

            <Grid.Column>
              <Modal
                closeIcon
                size="tiny"
                closeOnEscape={false}
                closeOnDimmerClick={false}
                trigger={<Button fluid>Change Role</Button>}>
                
                <Modal.Header>Select New Role</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(event) => props.roleHandler(userId._id)}>
                    <Form.Select fluid 
                      name="changeRole" 
                      options={options} 
                      onChange={props.dropboxHandler}
                      />
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Form>
                  {props.error && <Message error>{props.error}</Message>}
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
              </Modal>
            </Grid.Column>

          </Grid.Row>
          <Grid.Row verticalAlign='middle'>

            <Grid.Column>
              <Modal
                closeIcon
                size="tiny"
                closeOnEscape={false}
                closeOnDimmerClick={false}
                trigger={<Button fluid>Change Password</Button>}>
                
                <Modal.Header>Enter New Password</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={(event) => props.passwordHandler(event,userId._id)}>
                    <Form.Input 
                      type="password" 
                      name="changePassword" 
                      fluid 
                      />
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Form>
                  {props.error && <Message error>{props.error}</Message>}
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
              </Modal>
            </Grid.Column>

            {/* <Grid.Column>
              <Modal trigger={<Button fluid color="red">Delete user</Button>} basic size='small'>
                <Header icon='exclamation triangle' content='Warning' />
                <Modal.Content>
                  <p>
                    Are you sure you wish to delete {props.userName}?
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic color='red' inverted>
                    <Icon name='remove' /> No
                  </Button>
                  <Button basic color='blue' inverted>
                    <Icon name='checkmark' /> Yes
                  </Button>
                </Modal.Actions>
              </Modal>             
            </Grid.Column> */}

            <Grid.Column>
              <Modal trigger={<Button fluid color="red">Delete user</Button>} basic size='small'>
              <Header icon='exclamation triangle' content='Warning' />
                <Modal.Content>
                  <p>
                    Are you sure you wish to delete {props.userName}?
                  </p>
                  <Form onSubmit={() => props.removeHandler(userId._id)}>
                    <Button basic color='blue' inverted type="submit">
                      <Icon name='checkmark' /> Yes
                    </Button>
                  </Form>
                  <p>
                  </p> 
                  <Form onSubmit={(event) => props.alternateHandler(event)}>
                    <Button basic color='red' inverted >
                      <Icon name='remove' /> No
                    </Button>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
              </Modal>
            </Grid.Column>

          </Grid.Row>
        </Grid>
        {props.error && <Message error>{props.error}</Message>}
      </Segment>
      
    
    );
  }

  return null;
}

export default ModifyUserForm
