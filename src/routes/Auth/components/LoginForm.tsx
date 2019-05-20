import * as React from 'react';
import {Form, Button, Message, Header, Segment, Divider, Input} from 'semantic-ui-react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';

class LoginForm extends React.Component<InjectedFormProps, any> {
    public render() {
        const {
            error,
            handleSubmit,
            submitting,
        } = this.props;

        return (
            <>
                <Form onSubmit={handleSubmit}>
                    <Segment.Group raised>
                        <Header as='h3' attached={'top'} block>
                            <span>Login</span>
                        </Header>

                        <Segment attached={'bottom'} clearing>
                            {error &&
                            <Message negative
                                     header={'Failed to login'}
                                     content={error}/>
                            }

                            <Field name={'email'}
                                   component={Input as any}
                                   as={Form.Input}
                                   type="email"
                                   label="email"
                                   // validate={[required, email]}
                            />
                            <Field name={'password'}
                                   component={Input as any}
                                   as={Form.Input}
                                   type="password"
                                   label="password"
                                   // validate={required}
                            />
                            <Divider hidden/>

                            <Button fluid
                                    name="submitButton"
                                    loading={submitting}
                                    disabled={submitting}
                                    color="teal"
                                    content={'LoginPage'}
                            />
                        </Segment>
                    </Segment.Group>
                </Form>
            </>
        )
    }
}

export default reduxForm<any, any>({form: 'login'})(LoginForm);
