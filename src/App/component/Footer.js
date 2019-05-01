import {Container, List, Segment} from "semantic-ui-react";
import React from 'react';





const FooterComponent = () => (
<Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
    <Container textAlign='center'>
        {'\u00A9'}{new Date().getFullYear()} TrainWreck.A  is a Professional Studio subject at UTS.<br/>
        <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
                Contact Us
            </List.Item>

        </List>
    </Container>
</Segment>
);

export default FooterComponent;