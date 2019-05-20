import * as React from 'react';
import {Container, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";
import styled from 'styled-components';

const StyledContainer = styled(Container)`
    padding: 20px;
`;

const NotFound = () => <StyledContainer>
    <Message warning>Page not found</Message>
    <Link to={"/"}>Go to Home page</Link>
</StyledContainer>;

export default NotFound;
