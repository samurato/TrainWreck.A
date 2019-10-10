import React, {Component, props} from 'react';
import {Link} from 'react-router-dom';
import * as Data from '../data.js';
import {Tab, Container, Header, Grid, Segment, Button, Icon} from 'semantic-ui-react';
import Weather from '../component/Weather';

class AdminDashboardScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
       items : [],
       thisuser: [],
       message: "Loading..."
      }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    // Obtaining and store train data from back end and storing it into a state
    fetch('http://' + Data.EndpointAPIURL + '/api/trains', {
      headers: {
      method: 'GET',
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'include',
      'Authorization': localStorage.getItem('token')
      }
    })
    .then( res => res.json())
    .then((response) => {
      //console.log(response)
      this.setState({ items: response.trains })
      });
    //.catch(console.log)

    // Obtaining currently login user data from backend and storing it into a state
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
        // once the user data has been obtain the user role will be check 
        if (!(this.state.thisuser.role === "operator" || this.state.thisuser.role === "admin")){
          this.setState({message: "You do not have permission to access this page."})
          //if the user has no role they will be redirected to login and have their token removed
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
            window.location = '/login';
          }
        }
      });
  }


  render(){
    const{items,thisuser,message} = this.state;

    if (thisuser.role === "admin"|| thisuser.role === "operator") {
      return(
        <div className="mainPane">
          <div className="topBar pane">
            <span className="title">Trains</span>
            <Weather />
          </div>

          <Container>
            <p>Welcome back, {thisuser.name}.</p>

            <Header>
              Active trains: {items.length} 
            </Header>
            
            <ul>
              {items.map((item, index) => (
                <TrainSummary
                  id = {index}
                  line={item.route_id}
                  name={item.train_name}
                  route={item.route_name} />
              ))}
            </ul>

          </Container>
        </div>
      );
    }else {
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

function TrainSummary(data) {
  return (
    <Segment>
      <Grid columns={3} divided>
        <Grid.Column width={3} verticalAlign="middle">
          <h4>
            {data.line}
          </h4>
        </Grid.Column>
        <Grid.Column width={4}>
          <h4>
            {data.name}
          </h4>
          <label>{data.route}</label>
        </Grid.Column>
        <Grid.Column>
        </Grid.Column>
        <Grid.Column width={3} verticalAlign="middle" textAlign="right">
          <Link to={"/dashboard#" + data.id}><Button inverted color="yellow">View</Button></Link>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default AdminDashboardScreen;
