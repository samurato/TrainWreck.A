import React, {Component, props} from 'react';
import {Link} from 'react-router-dom';
import * as Data from '../data.js';
import {Tab, Container, Header, Grid, Segment, Button, Icon} from 'semantic-ui-react';
import Weather from '../component/Weather';

class AdminDashboardScreen extends Component {

  constructor(props){
    super(props);
    this.state = { items : [], thisuser: []}
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
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
      console.log(response)
      this.setState({ items: response.trains })
    })
    .catch(console.log)

    
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


  render(){
    const{items} = this.state;
    const{thisuser} = this.state
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
                name={item._id}
                route="train route" />
            ))}
          </ul>

          
          {/* <div>
           {items.map(item => (
             <li key={item.name}>
               <p>role: {item.role} </p>
               <p>name: {item.name} </p>
               <p>email: {item.email} </p>
             </li>
           ))}
           </div>*/}

        </Container>
      </div>
    );
  }
}

//export {items};

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
