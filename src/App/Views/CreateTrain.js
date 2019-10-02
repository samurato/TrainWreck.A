import React, {Component} from 'react';
import {Form, Header} from 'semantic-ui-react';
import Weather from '../component/Weather';

const options = [
    { key: 'm', text: 'InterCity', value: 'male' },
    { key: 'f', text: 'Inner City', value: 'female' },
    { key: 'o', text: 'Inter State', value: 'other' },
    { key: 'r', text: 'Regional', value: 'other' },
]

class CreateTrainForm extends Component {
  state = {}

  //handleChange = (e, { value }) => this.setState({ value })

  render() {
    //const { value } = this.state
    return (
      <div className="mainPane">

        <div className="topBar pane">
          <span className="title">Create Train</span>
          <Weather />
        </div>

      </div>
    )
  }
}

export default CreateTrainForm


/*       <Form style={{ marginTop: '7em', marginLeft: '4em', marginRight:'4em' }}>
        <Header>Create Train</Header>    <Form.Group widths='equal'>
        <Form.Input fluid label='Train Model' placeholder='Train Model' />

        <Form.Select fluid label='Type' options={options} placeholder='Train Type' />
      </Form.Group>



      <Form.Input fluid label='Comissioned' placeholder='Comissioned Station' />

      <Form.TextArea label='Notes' placeholder='Comments on the user creation' />

      <Form.Button>Submit</Form.Button>
      </Form> 
      */