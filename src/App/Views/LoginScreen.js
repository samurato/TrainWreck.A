import React from 'react'
import { Button, Form, Grid, Header, Image, Segment, Message } from 'semantic-ui-react'
import logo from '../component/logo.svg'
import { userInfo } from 'os'
class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
        }
    }

    setError (msg) {
        this.setState({error: msg})
    }

    async login (email, password) {
        const response = await fetch('http://172.19.126.129/api/auth', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
          });
          const msg = await response.json();
          if (response.ok) {
            
            localStorage.setItem('token', msg.token);
            this.setError(null);
            console.log('success!, stored in local storage')
            // redirect to another page
          } else {
            console.log('Failed to authenticate', await msg);
            this.setError(`Failed to authenticate: ${msg.error}`);
          }
    }

    async getMe () {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setError('token does not exist');
        } else {
            const response = await fetch('http://172.19.126.129/api/users/me', { 
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
          });

            const msg = await response.json();
            if (response.ok) {
                this.setError(null);
                console.log(JSON.stringify(msg));
            } else {
                console.log('Failed: ', msg);
                this.setError(`Failed to authenticate: ${msg.error}`);
            }
        }

    }

    logout = () => {
        if (!localStorage.getItem('token')) {
            console.log('already logged out');
        } else {
            localStorage.removeItem('token');
            console.log('logged out successfully');
        }
    }

    render () {


        return (
            <div className='login-form'>
                {/*
              Heads up! The styles below are necessary for the correct render of this example.
              You can do same with CSS, the main idea is that all the elements up to the `Grid`
              below must have a height of 100%.
            */}
                <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 60%;
              }
            `}
                </style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={logo} /> Log-in to your account
                        </Header>
                        <Form size='large' onSubmit={(event) => this.login(event.target.email.value, event.target.password.value)}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' name='email' iconPosition='left' placeholder='E-mail address' />
                                <Form.Input
                                    fluid
                                    name='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                />
        
                                <Button color='teal' fluid size='large'>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Button onClick={() => this.getMe()}>Get My Profile</Button>
                        <Button onClick={() => this.logout()}>Logout</Button>
                        {this.state.error && <Message error>{this.state.error}</Message>}
                    </Grid.Column>
                </Grid>
            </div>);
    }
}    

export default LoginScreen
