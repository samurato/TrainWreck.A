import React,{Component} from 'react'
import {
    Container,
    Dropdown,
    Image,
    Menu,Button,Modal,Header,Icon
} from 'semantic-ui-react'

import logo from './train.svg'

const options = [
    {key:'train', text: 'Create Train', value:'train'},
    {key:'user', text: 'Create User', value:'user'}
]

class HeaderComponent extends Component {
    state = {modalOpen: false}

    handleOpen = () => this.setState({modalOpen: true})

    handleClose = () => this.setState({modalOpen: false})

    render() {
        return (
            <div>
                <Menu fixed='top' inverted>
                    <Container>
                        <Menu.Item as='a' header>
                            <Image size='mini' src={logo} style={{marginRight: '1.5em'}}/>
                        </Menu.Item>
                        <Menu.Item as='a'>Home</Menu.Item>
                        <Dropdown item simple text='Action' options={options}/>

                        {/* <Dropdown item simple text='Menu'>
                    <Dropdown.Menu>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                            <i className='dropdown icon' />
                            <span className='text'>Submenu</span>
                            <Dropdown.Menu>
                                <Dropdown.Item>List Item</Dropdown.Item>
                                <Dropdown.Item>List Item</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>*/}
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='Frank'
                            />

                            <Modal
                                trigger={<Menu.Item onClick={this.handleOpen}>Tutorial</Menu.Item>}
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                                basic
                                size='small'
                            >
                                <Header icon='browser' content='Tutorial'/>
                                <Modal.Content>
                                    <h3>Welcome to the Tutorial</h3>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='green' onClick={this.handleClose} inverted>
                                        <Icon name='checkmark'/> Got it
                                    </Button>
                                    <Button color='green' onClick={this.handleClose} inverted>
                                        <Icon name='angle right'/> Next
                                    </Button>
                                </Modal.Actions>
                            </Modal>

                        </Menu.Menu>
                    </Container>
                </Menu>
            </div>

        );
    }
}


export default HeaderComponent;
