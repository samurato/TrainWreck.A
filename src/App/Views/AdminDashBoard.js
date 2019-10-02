import React, {Component, props} from 'react';
import {Link} from 'react-router-dom';
import * as Data from '../data.js';
import {Tab, Container, Header, Grid, Segment, Button, Icon} from 'semantic-ui-react';
import Weather from '../component/Weather';

class AdminDashboardScreen extends Component {

  constructor(props){
    super(props);
    this.state = { items : [] }
  }

  componentDidMount() {
    fetch('http://' + Data.EndpointAPIURL + '/api/trains', {
      headers: {
      method: 'GET',
      mode: 'no-cors',
      withCredentials: true,
      credentials: 'include',
      'Authorization': Data.bearer
      }
    })
    .then( res =>
      res.json()
      )
    .then((response) => {
      console.log(response)
      this.setState({ items: response.trains })
    })
    .catch(console.log)
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
            Active trains: {items.length} 
            { Data.UserPermissions === "Administrator" ? 
              <Button inverted color="blue">
                <Icon name="add" />
                Add Trains
              </Button> 
            : "" }
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
