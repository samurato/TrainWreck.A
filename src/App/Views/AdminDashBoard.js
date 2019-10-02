import React, {Component, props} from 'react';
import {Link} from 'react-router-dom';
import * as Data from '../data.js';
//import * as DataTest from '../dataTest.js';
import {Tab, Container, Header, Grid, Segment, Button, Icon} from 'semantic-ui-react';
import Weather from '../component/Weather';

class AdminDashboardScreen extends Component {
  /*constructor(props){
    super(props);
    this.state = {
      unused_train_data: [
        { key: 1, name: 'Train #1', route: 'Inner City', line: "T2" }
      ]
    };
  }*/

  constructor(props){
    super(props);
    this.state = { 
    items : []
    //username = "root@mail.com";
    //password= "thecakeisalie";
    }
  }
  //var headers = new Headers();

 
  //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

componentDidMount() {
  fetch('http://' + Data.EndpointAPIURL + '/api/users', {
    headers: {
      method: 'GET',
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'include',
      'Authorization': localStorage.getItem('token')
    }
  })
  .then( res =>
    res.json()
    
    )
  .then((response) => {
    console.log(response)
    this.setState({ items: response.users })
  })
  .catch(console.log)

  //console.log(items)
}

  render(){
    const{items} = this.state;
    return(
      <div className="mainPane">
        <div className="topBar pane">
          <span className="title">Trains</span>
          <Weather />
        </div>

        <Container>
          <p>Welcome back, {Data.UserLoggedOn}.</p>

          <Header>
            Active trains: {Data.TrainsData.length} 
            { Data.UserPermissions === "Administrator" ? 
              <Button inverted color="blue">
                <Icon name="add" />
                Add Trains
              </Button> 
            : "" }
          </Header>

          <ul>
            {Data.TrainsData.map((data, index) => (
              <TrainSummary
                id={index}
                line={data.line}
                name={data.name}
                route={data.route} />
            ))}
          </ul>

          
          <div>
          {items.map(item => (
            <li key={item.name}>
              <p>role: {item.role} </p>
              <p>name: {item.name} </p>
              <p>email: {item.email} </p>
            </li>
          ))}
          </div>

        </Container>
      </div>
    );
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
