import React, { Component } from 'react'
import { Form, Header } from 'semantic-ui-react'

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

class CreateUserForm extends Component {
    state = {}

    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state
        return (

            <Form style={{ marginTop: '7em', marginLeft: '4em', marginRight:'4em' }}>
                <Header>Create User</Header>    <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                    <Form.Select fluid label='Gender' options={options} placeholder='Gender' />
                </Form.Group>
                <Form.Group inline>
                    <label>Role</label>
                    <Form.Radio
                        label='Driver'
                        value='sm'
                        checked={value === 'sm'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Operator'
                        value='md'
                        checked={value === 'md'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Admin'
                        value='lg'
                        checked={value === 'lg'}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.TextArea label='Notes' placeholder='Comments on the user creation' />

                <Form.Button>Submit</Form.Button>
            </Form>
        )
    }
}

export default CreateUserForm
