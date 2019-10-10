import React, {Component} from 'react'
import * as Data from '../data.js';
import {Container, Grid, Statistic, Icon, Header, Button, Message, Segment, Table} from 'semantic-ui-react'
import Weather from '../component/Weather';
import * as io from 'socket.io-client';

class DashBoardScreen extends Component{
    constructor(props){
      super(props);

      this.state = {
        data: [],
        lastOverride: "",
        lastOverrideTime: 0,
      };
    }

    socket = io("http://trains.benfranzi.com:8081", {path: '/ws'});

    componentDidMount() {
      // Turns on socket connecting to machine learning 
      this.socket.on('train-data', (msg) => {
        this.addData(JSON.parse(msg));
      });
      // Turns on a trial socket connection to the backend
      this.socket.on('connection', () => {
        console.log('connected');
        this.socket.send("hello", "world");
      });
    }
    
    /*  Adding machine vision data
    * 
    * this function adds the each data recieved from the socket
    * to a list of data recived
    * 
    * 
    */ 
    addData(obj) {
      this.setState({data: [obj, ...this.state.data]});
    }

    /*Display data on status
    *
    * Based 
    * 
    * 
    */ 
    displayStatus() {
      if (this.state.data.length > 0) {
        var lastLogic = this.state.data[0]["logic"];
        switch(lastLogic) {
          case "DECEL":
            return "Decelerating";
          case "CONTINUE":
            return "Continuing";
          case "STOP":
            return "Stopped";
          default:
            return "Unknown";
        }
      } else {
        return "Waiting...";
      }
    }

    
    /* Display last detected object
    *
    *
    * 
    * 
    */ 
    displayDetection() {
      if (this.state.data.length > 0) {
        var lastItem = "n/a"
        if (!this.state.data[0].data.override) {
          lastItem = this.state.data[0]["data"].join(", ");
        }
        
        switch(lastItem) {
          default:
            return lastItem;
        }
      } else {
        return null;
      }
    }

    /* Manual override
    *
    * Event handler to display user overides clicked
    * 
    * 
    */ 
    sendOverride(e) {
      var override = e.target.value;
      this.socket.emit(override);
      this.setState({
        data: [{
          "logic": "OVERRIDE",
          "data": {
            "override": override,
            "epoch": ""
          },
          "class": "warning"
        }, ...this.state.data],
        "lastOverride": override, 
        "lastOverrideTime": Date.now()
      });
    }

    /* Display Override 
    *
    * dispalys the user override clicked, and the time at which it was clicked
    * 
    * 
    */ 
    displayOverrideMessage(override) {
      if (this.state.lastOverride !== "") {
        var timeDiff = (Date.now() - this.state.lastOverrideTime) / 1000;
        if (timeDiff < 3) {
          timeDiff = "a few seconds ago";
        } else if (timeDiff < 60) {
          timeDiff = Math.floor(timeDiff) + " seconds ago";
        } else if (timeDiff < (60*60)) {
          timeDiff = Math.ceil(timeDiff/60);
          timeDiff += (timeDiff > 1) ? " minutes ago" : " minute ago";
        }

        return(
          <Message>
            <Message.Content>
              <h3>Override sent: {this.state.lastOverride}</h3>
              <i>{timeDiff}</i>
            </Message.Content>
          </Message>
        );
      }
    }

    render(){
      let currentTrainID = window.location.hash.substr(1);
      //let currenTrainInfo = items.map(item => item[currentTrainID];
      let currentTrainInfo = Data.TrainsData[currentTrainID];

      return(
        <div className="mainPane">

          <div className="topBar pane">
            <span className="title">Dashboard</span>
            <Weather />
          </div>

          <div className="DashboardScreen">
            
              <div className="view left">
              
                <div className="nameplate" style={{"background-color":Data.LineColours[currentTrainInfo.line]}}>
                  <h1>{currentTrainInfo.name}</h1>
                  <h4>
                    <Icon name="road" />
                    {currentTrainInfo.route}
                  </h4>
                </div>

                <div className="status">
                  <Table celled>
                    <Table.Header>
                      <Table.HeaderCell width={9}>Route</Table.HeaderCell>
                      <Table.HeaderCell>{currentTrainInfo.line}</Table.HeaderCell>
                    </Table.Header>
                    
                    <Table.Row>
                      <Table.Cell>Weather</Table.Cell>
                      <Table.Cell>{currentTrainInfo.weather}</Table.Cell>
                    </Table.Row>
                    
                    <Table.Row>
                      <Table.Cell>Status</Table.Cell>
                      <Table.Cell>{this.displayStatus()}</Table.Cell>
                    </Table.Row>
                    
                    <Table.Row>
                      <Table.Cell>Detection</Table.Cell>
                      <Table.Cell>{this.displayDetection()}</Table.Cell>
                    </Table.Row>
                    
                    <Table.Row>
                      <Table.Cell>Last Override</Table.Cell>
                      <Table.Cell>{this.state.lastOverride}</Table.Cell>
                    </Table.Row>
                  </Table>

                  {this.displayOverrideMessage(this.state.lastOverride)}
                </div>

                <Segment color="purple" className="overrides">
                  <Header>Manual overrides:</Header>

                  <Button
                    color="yellow"
                    value="Accelerate"
                    onClick={this.sendOverride.bind(this)}
                  >
                    Accelerate
                  </Button>
                  
                  <Button 
                    color="teal"
                    value="Decelerate"
                    onClick={this.sendOverride.bind(this)}
                  >
                    Decelerate
                  </Button>
                  
                  <Button
                    color="orange"
                    value="Stop"
                    onClick={this.sendOverride.bind(this)}
                  >
                    Stop
                  </Button>

                  <Button 
                    color="green"
                    value="Continue"
                    onClick={this.sendOverride.bind(this)}
                  >
                    Continue
                  </Button>

                </Segment>

              </div>
              <div className="view right">
              
                <div className="snapshot">
                  {this.state.data.length > 0 ? <img src={this.state.data[0].url} /> : <img />}
                  
                </div>
                <div className="history" id="history">
                  <Table basic="very">
                    {this.state.data.map(item =>
                      <Table.Row className={item.class}>
                        <Table.Cell>{item.epoch}</Table.Cell>
                        <Table.Cell>{!!item.data.override ? `Override: ${item.data.override}` : `Detected: ${item.data.join(', ')}`}</Table.Cell>
                        <Table.Cell>{item.logic}</Table.Cell>
                      </Table.Row>
                    )}
                  </Table>
                </div>

              </div>

          </div>

        </div>
      );
    }
}


export default DashBoardScreen