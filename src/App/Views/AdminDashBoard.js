import React, {Component, props} from 'react';
import {Link} from 'react-router-dom';
import * as Data from '../data.js';
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

  render(){
    return(
      <div className="mainPane">
        <div className="topBar pane">
          <span className="title">Dashboard</span>
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

          <div>
            {Data.TrainsData.map((data, index) => (
              <TrainSummary
                id={data.id}
                line={data.line}
                name={data.name}
                route={data.route} />
            ))}
          </div>

        </Container>
      </div>
    );
  }
}

function TrainSummary(data) {
  return (
    <Segment className={data.id}>
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
          {data.route}
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
