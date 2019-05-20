import * as React from 'react'
import {Segment} from 'semantic-ui-react'

interface StateType {
    hasError: boolean,
    error?: any,
    info?: any
}

/**
 * This lifecycle is invoked after an error has been thrown by a descendant component.
 * https://reactjs.org/docs/react-component.html#componentdidcatch
 */
export default class ErrorBoundary extends React.Component<any, StateType> {
    constructor(props){
        super(props)
        this.state = {hasError: false}
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true, error, info}); // Display fallback UI
        console.error(error);
        console.info(info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Segment>
                    <h1>Something went wrong.</h1>
                    Error:
                    <pre>{JSON.stringify(this.state.error, null, 2)}</pre>
                    Info:
                    <pre>{this.state.info ? this.state.info.componentStack : '-'}</pre>
                </Segment>
            );
        }
        return this.props.children;
    }
}
