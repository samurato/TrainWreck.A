import React, { Component } from 'react'
import {Image, Header,Grid} from 'semantic-ui-react'


class SensorReadingScreen extends Component {
    render(){
        return(
            <div>
                <Grid style = {{marginLeft:'5em'}}>
                    <Grid.Row>
                <Header as='h3' style = {{marginTop: '5em'}}>
                    Train Camera Sensor Readings
                    <br/>
                </Header>
                    </Grid.Row>
                    <Grid.Row>
                <Image src = {'https://www.railvision.io/wp-content/uploads/2018/03/cac9d4fd-7665-48cf-88fb-f26513e5c5b2.jpg'}/>

                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width = {6}>
                            <Header as={ 'h3'}>
                                Signal Sensor : Green</Header>
                            <Header as={ 'h3'}>
                                Object Detection: Normal </Header>
                            <Header as={ 'h3'}>
                                Sign Sensor: None </Header>
                        </Grid.Column>

                        <Grid.Row style = {{marginTop:'3em'}}>
                            <Header as = {'h1'}>
                            Train Speed: 30 Km/hr.
                            </Header>
                        </Grid.Row>
                    </Grid.Row>
                </Grid>
                </div>
        );
    }
}

export default SensorReadingScreen
