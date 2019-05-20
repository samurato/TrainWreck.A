import * as React from 'react';
import LoginForm from '../components/LoginForm'
import auth from '../../../state/actions/auth';
import {connect} from 'react-redux';

interface ILoginProps {
    login: (email: string, password: string) => void;
}

class LoginPage extends React.Component<ILoginProps> {

    public submitLogin = async (values) => {
        console.log()
        await this.props.login(values.email, values.password);
    }

    public render() {
        return (
            <div>
                <LoginForm onSubmit={this.submitLogin}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email: string, password: string) => {dispatch(auth.login(email, password));},
    };
};

export default connect(null, mapDispatchToProps)(LoginPage);
