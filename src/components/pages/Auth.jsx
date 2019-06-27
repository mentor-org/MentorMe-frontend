import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../shared/Form/SignupForm';
import LoginForm from '../shared/Form/LoginForm';


class Auth extends Component {
    static propTypes = {
        type: PropTypes.string.isRequired
    };

    static defaultProps = {
        type: ''
    };

    getFormTitle = () => {
        switch (this.props.type) {
        case 'signup':
            return 'Register';
        default:
            return 'Sign In';
        }
    }

    getFormField = () => {
        switch (this.props.type) {
        case 'signup':
            return <SignupForm />;
        default:
            return <LoginForm />;
        }
    }

    render() {
        const title = this.getFormTitle();
        const field = this.getFormField();
        
        return (
            <Fragment>
                <div className="d-flex">
                  <div className="flex">
                    <div className="image-section">
            
                    </div>
                  </div>
                    <div className="flex">
                        <div className="form-container">
                            <h3>{ title }</h3>
                            { field }
                        </div>
                    </div>
                  </div>
            </Fragment>
        );
    }
}


Auth.defaultProps = {
    type: 'signup'
};

export default Auth;
