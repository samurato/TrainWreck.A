import * as React from 'react';
import {Container, Header, Segment} from 'semantic-ui-react';

export default class extends React.Component {
    public render() {
        return (
            <div>
                <Segment
                    inverted
                    color={'blue'}
                    textAlign='center'
                    style={{minHeight: 200, padding: '1em 0em'}}
                    vertical
                >
                    <Container text color={'blue'}>
                        <Header
                            as='h1'
                            content='Gender Legislative Index'
                            inverted
                            style={{
                                fontSize: '3em',
                                fontWeight: 'normal',
                                marginTop: '1em',
                            }}
                        />
                    </Container>
                </Segment>

                <Container className={"container_padding"}>
                    <Segment>
                        <Header>The idea behind the GLI</Header>
                        <p>
                            We have come to a point in the world where it is relatively common for issues to be analysed
                        </p>
                    </Segment>
                    <br/>
                </Container>
            </div>
        );
    }
}


