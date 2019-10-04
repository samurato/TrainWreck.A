import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Button, Icon, Segment, Grid, Divider, Form, Dropdown, Modal, Header} from 'semantic-ui-react';
import Weather from '../component/Weather';
import * as Data from '../data.js';

const options = [
  { key: '0', text: 'Operator', value: 'operator' },
  { key: '1', text: 'Administrator', value: 'admin' }
]

class ModifyUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      id: "",
      modalOpen: false,
      userList: [],
      thisuser: []
    }
  }
  // handleChange = async (e) => {
  //   var selectedRole = e.target.firstChild.innerText;
  //   console.log(selectedRole)
  //  // await this.setState({submittedRole: selectedRole})
  //   //console.log(this.state.s)
  //   //Data.test = "changed"
  //   //console.log(Data.test)
  // }
  
  
  selectNewUser = (e) => {
    console.log("reached before")
    //this.state.userList.find()
    var matchUser = this.state.userList.find((element) => {
      return element.name === e.target.firstChild.innerText;
    })
    console.log(matchUser._id)
    this.setState({name: e.target.firstChild.innerText, id: matchUser});
    console.log(this.state)


  } 

  closeModal = () => this.setState({ modalOpen: false })
  

  async modifyName(event,id){
    
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://'+ Data.EndpointAPIURL +'/api/users/name'+ id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            "name": event.target.name.value,
        })
      });

    const msg = await response.json();
    if(response.ok){
      console.log("okay");
      //window.location.reload(); 
      
    } else{
      //window.location.reload(); 
      console.log("FAILED")
      }
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
      console.log(response)
      this.setState({ userList: response.users })})
    .catch(console.log)
    //console.log(items)

     const response =  fetch('http://' + Data.EndpointAPIURL + '/api/users/me', { 
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then( res => res.json())
      .then((response) => {
        console.log(response)
        this.setState({ thisuser: response })
      });
      

  }

  render() {
    let test = this.state.userList.map(function (userList, index) {
      return { key: index, value: userList._id, text: userList.name };
    })

    const { name, id, modalOpen, userList,thisuser } = this.state;

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
                <Form.Select name='users' label='User' options={test} placeholder="Select User" onChange={(event) => this.selectNewUser(event)} />

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

              <SubForms userId={id} userName={name} />
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
            You do not have permission to access this page.
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
                  <Form onSubmit={(event) => console.log("submit button pressed")}>
                    <Form.Input fluid />
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Form>
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
                  <Form>
                    <Form.Select options={options} fluid />
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Form>
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
                  <Form>
                    <Form.Input type="password" fluid />
                    <Button color="blue" type="submit">
                      Submit
                    </Button>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
              </Modal>
            </Grid.Column>

            <Grid.Column>
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
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Segment>
    
    );
  }

  return null;
}

export default ModifyUserForm
