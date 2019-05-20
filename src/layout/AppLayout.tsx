import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import AppContent from './AppContent';

export default class AppLayout extends React.Component<any> {
    public render() {
        return (
            <div>
                <div>
                    <ErrorBoundary> {/*Will display errors for components wrapped*/}
                        <AppContent/>
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
}
