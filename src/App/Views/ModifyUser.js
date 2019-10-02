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
  state = {
    name: "",
    id: "",
    modalOpen: false
  }

  selectNewUser = (e) => {
    this.setState({name: e.target.firstChild.data, id: e.target.value});
  } 

  closeModal = () => this.setState({ modalOpen: false })

  render() {
    const { name, id, modalOpen } = this.state;

    if (Data.UserPermissions === "Administrator") {
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
                <Form.Field control="select">
                  <option selected disabled>Select user to edit</option>
                  {Data.UsersData.map((data, index) => (
                    <option
                      name="user" 
                      value={data.id} 
                      onClick={this.selectNewUser}
                    >
                      {data.name}
                    </option>
                  ))}
                </Form.Field>
              </Form>

              <SubForms userId={id} userName={name} />
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
                  <Form>
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
