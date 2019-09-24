import React, { Component } from 'react'
import { Grid,Header,Button,Icon } from 'semantic-ui-react'

let data = 'Jon Doe';
let trainData = '001';
let UserStatus = 'Y';
let UserRole = 'Driver'

 class AdminUserScreen extends Component {
    //state = { activeItem: 'home' }

    //handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        // const { activeItem } = this.state

        return (
            <div>
                <Grid stackable style={{ marginTop: '7em', marginLeft: '3em' }}>
                    <Grid.Row>
                    <Grid.Column width ={5} >
                    
                    </Grid.Column>
                    <Grid.Column width = {6} >
                        <Grid.Row>
                        <Header as='h1'>Name: {data}</Header>
                        </Grid.Row>

                        <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                            <Header as='h1'>Current Train: {trainData}</Header>
                        </Grid.Row>

                        <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                            <Header as='h1'>Active: {UserStatus}</Header>
                        </Grid.Row>
                        <Grid.Row style = {{marginLeft: '1em',marginTop:'1em'}}>
                            <Button color='teal'><Icon name = "edit"/>Edit</Button>
                            <Button color='blue'>Back</Button>
                        </Grid.Row>
                    </Grid.Column>

                    </Grid.Row>
                    <Grid.Row>
                        <Header as='h1'>Role: {UserRole}</Header>
                    </Grid.Row>

                </Grid>


            </div>
        )
    }
}
export default AdminUserScreen
