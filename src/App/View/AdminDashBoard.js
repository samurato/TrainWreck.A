import React,{Component} from 'react'
import {Tab, Container, Table, Header, Menu} from 'semantic-ui-react'

const panes = [
    { menuItem: 'Users', render: () => <Tab.Pane >
            <Table >

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Header as ='h2'>Name</Header></Table.HeaderCell>
                        <Table.HeaderCell><Header as ='h2'>Role </Header></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    001
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header>T1</Header> </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4' >

                                <Header.Content>
                                    0002

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>T3</Header.Subheader></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Ben

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Head Driver</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Shadia

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Controller</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Manjusha

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Driver</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Doro

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Controller</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Frank

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Driver</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Phong

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Admin</Header.Subheader></Table.Cell>
                    </Table.Row>



                </Table.Body>
            </Table>








    </Tab.Pane> },
    { menuItem: 'Train', render: () => <Tab.Pane>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID </Table.HeaderCell>
                        <Table.HeaderCell>Network</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    Vikesh
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header>Senior Controller</Header></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4' >

                                <Header.Content>
                                    Chetna

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Head Driver</Header.Subheader></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Ben

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Head Driver</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Shadia

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Controller</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Manjusha

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Driver</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Doro

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Controller</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Frank

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Driver</Header.Subheader></Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>

                                <Header.Content>
                                    Phong

                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell><Header.Subheader>Admin</Header.Subheader></Table.Cell>
                    </Table.Row>



                </Table.Body>
            </Table>






        </Tab.Pane> },
    ]

class AdminDashboardScreen extends Component {
    render(){
        return(

            <Container align = 'right' style = {{marginTop: '6em'}}>
                <Menu.Menu position='right'>
                    <div className='ui right aligned category search item'>
                        <div className='ui transparent icon input'>
                            <input className='prompt' type='text' placeholder='Search Train or users' />
                            <i className='search link icon' />
                        </div>
                        <div className='results' />
                    </div>
                </Menu.Menu>
            <Tab panes = {panes}/>

            </Container>

        );
    }
}


export default AdminDashboardScreen
