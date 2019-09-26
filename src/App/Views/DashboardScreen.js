import React, {Component} from 'react'
import * as Data from '../data.js';
import {Container, Grid, Statistic, Icon} from 'semantic-ui-react'
//import Gauge from 'react-radial-gauge';
//import ReactSpeedometer from "react-d3-speedometer";
import Weather from '../component/Weather';

class DashBoardScreen extends Component{
    constructor(props){
        super(props);
        this.state = { time: Date.now() };
    } componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
      let currentTrainID = window.location.hash.substr(1);
      let currentTrainInfo = Data.TrainsData[currentTrainID];

      return(
        <div className="mainPane">

          <div className="topBar pane">
            <span className="title">{currentTrainInfo.name}</span>
            <Weather />
          </div>

          <Container>
            <Grid stackable>
              <Grid.Row>

                <Grid.Column width={10}>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='train' /> {currentTrainInfo.name}
                    </Statistic.Value>
                  </Statistic>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='alarm' /> 0
                    </Statistic.Value>
                    <Statistic.Label>Alarms</Statistic.Label>
                  </Statistic>
                </Grid.Column>

              </Grid.Row>
              <Grid.Row>

                <Grid.Column width={7}>
                  <Statistic>
                    <Statistic.Value>
                      <Icon name='road' /> {currentTrainInfo.route}
                    </Statistic.Value>
                    <Statistic.Label>Route</Statistic.Label>
                  </Statistic>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </Container>

        </div>
      );
        /*
        return(

                <Container style={{ marginTop: '7em' }}>

                    <Header as='h1'>Welcome to Train Wreck.A Dashboard</Header>
                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={4}>

                                    <Statistic>
                                        <Statistic.Value>
                                            <Icon name='train' />
                                            20
                                        </Statistic.Value>
                                        <Statistic.Label>Active Trains</Statistic.Label>
                                    </Statistic>

                            </Grid.Column>
                            <Grid.Column width={4}>

                                    <Statistic>
                                        <Statistic.Value>
                                            <Icon name='road' />
                                            10
                                        </Statistic.Value>
                                        <Statistic.Label>Active Network</Statistic.Label>
                                    </Statistic>

                            </Grid.Column>
                            <Grid.Column width={4}>

                                    <Statistic>
                                        <Statistic.Value>
                                            <Icon name='alarm' />
                                            0
                                        </Statistic.Value>
                                        <Statistic.Label>Alarms</Statistic.Label>
                                    </Statistic>

                            </Grid.Column>
                            <Grid.Column width={4}>

                                    <Statistic>
                                        <Statistic.Value>
                                            <Icon name='stop circle' />
                                            Petersham
                                        </Statistic.Value>
                                        <Statistic.Label>Next Stop</Statistic.Label>
                                    </Statistic>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>
                    <Header as='h1'>Train Status</Header>


                    <Grid stackable>
                        <Grid.Row>
                            <Grid.Column width={6}>

                                    <Header as='h4' align = 'center'>Current Route Covered</Header>

                                    <Gauge size={300}
                                           needleBaseColor={'#5550f4'}
                                           progressWidth={20}
                                           tickColor={'#f47489'}
                                           currentValue = {20}

                                    />


                            </Grid.Column>
                            <Grid.Column width={5}>

                                    <Header as='h4' align = 'center'>Train Speed Km/hr </Header>

                                    <ReactSpeedometer
                                        minValue={0}
                                        maxValue={400}
                                        startColor={'#2df820'}
                                        endColor={'#f8003a'}
                                        value={(this.state.time%10000)/100}



                                    />


                            </Grid.Column>
                            <Grid.Column width={5}>

                                    <Header as='h4' align = 'center'>Train acceleration g's</Header>

                                    <ReactSpeedometer
                                        minValue={-2}
                                        maxValue={2}
                                        startColor={'#2df820'}
                                        endColor={'#f8003a'}
                                        value={(this.state.time%10000)/10000}



                                    />

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br/>




                    <Header as='h1'>Schedule</Header>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Station</Table.HeaderCell>
                                <Table.HeaderCell>Scheduled Time</Table.HeaderCell>
                                <Table.HeaderCell>Actual Time</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>Central</Table.Cell>
                                <Table.Cell>16:30</Table.Cell>
                                <Table.Cell>16:30</Table.Cell>
                            </Table.Row>
                            <Table.Row error>
                                <Table.Cell>Redfern</Table.Cell>
                                <Table.Cell>16:35</Table.Cell>
                                <Table.Cell>16:36</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>McDonaldTown</Table.Cell>
                                <Table.Cell error>Not Stopping</Table.Cell>
                                <Table.Cell error>
                                    <Icon name='attention' />
                                    Not Stopping
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Newtown</Table.Cell>
                                <Table.Cell>16:45</Table.Cell>
                                <Table.Cell>16:45</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>


                    <p>Development in Progress</p>
                    <p> ATO Automatic Train Operations.</p>

                </Container>




        );*/
    }

}


export default DashBoardScreen