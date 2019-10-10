import React, { Component } from 'react'
import { Grid,Header,Button,Icon,Image } from 'semantic-ui-react'
//import {Train} from "../component/train.svg"

let data = '001';
let trainData = 'Redfern';
let UserStatus = 'Y';
//let UserRole = 'Driver'

class AdminTrainScreen extends Component {


    render() {
        //const { activeItem } = this.state

        return (
            <div>
                <Grid stackable style={{ marginTop: '7em', marginLeft: '3em' }}>
                    <Grid.Row>
                        <Grid.Column width ={5} >
                            <Image src='https://transportnsw.info/sites/default/files/styles/feature_card/public/image/2017/05/st105_4_mtms-glenfeild-ti-1920x550px.jpg?h=9f47d74c&itok=GPyPqYs_' height = '200' circular />
                    </Grid.Column>
                        <Grid.Column width = {6} >
                            <Grid.Row>
                                <Header as='h1'>Network ID: {data}</Header>
                            </Grid.Row>

                            <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                                <Header as='h1'>Current Station: {trainData}</Header>
                            </Grid.Row>

                            <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                                <Header as='h1'>Active: {UserStatus}</Header>
                            </Grid.Row>
                            <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                                <Header as='h1'>DriverID: 001</Header>
                            </Grid.Row>
                            <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                                <Button color='teal'><Icon name = "edit"/>Edit</Button>
                                <Button color='blue'>Back</Button>
                            </Grid.Row>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h1'>TrainID: T002 </Header>
                    </Grid.Row>

                </Grid>


            </div>
        )
    }
}
export default AdminTrainScreen
