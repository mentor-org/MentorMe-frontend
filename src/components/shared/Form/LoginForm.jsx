/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import Preloader from '../Preloader/Preloader';
import RenderInput from '../FormComponents/RenderInput';
import { authPropTypes } from '../../../helpers/proptypes';
import { auth } from '../../../actions/auth';
import './Form.scss';


class LoginFrom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {},
        };
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        
        this.setState({
            [name]: value
        });
    }

    handleFocus(e) {
      e.preventDefault();
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const values = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.auth('login', values, this.props.history);
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
          return this.props.history.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { isLoading, errors } = this.props;

        return (
            <Fragment>
                <form className="login" onSubmit={this.handleSubmit.bind(this)} noValidate>
                    { typeof errors === 'string' ? 
                    <div className="bg-red border-l-4 border-red-600 text-red-500 p-2" role="alert">
                        <p className="font-bold">Error</p>
                        <p className="">{errors}</p>
                    </div> : ''
                    }
                    <div className="form-group">
                        <RenderInput
                            name="email"
                            label="Email Adress"
                            id="email"
                            type="email"
                            className={classNames('form-control', { 'error': errors.email })}
                            placeholder="example@email.com"
                            value={this.state.email}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={errors.email}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <RenderInput
                            name="password"
                            label="Password"
                            id="password"
                            type="password"
                            className={classNames('form-control', { 'error': errors.password })}
                            placeholder="************"
                            value={this.state.password}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={errors.password}
                            required
                        />
                    </div>

                    <button className="btn btn-block btn-primary" disabled={isLoading} type="submit">
                        {isLoading === true ?
                            <Preloader
                                type="button"
                                // eslint-disable-next-line
                                style="TailSpin"
                                height={15}
                                width={15}
                                color="blue"
                            />
                            : 'Login'}
                    </button>
                </form>

                <div className="extra">
                  <Link to="#" className="text-left">Forgot Password?</Link>
                  <Link to="#" className="text-right">Switch Account</Link>
                </div>

                <div className="foot">
                  <Link to="/auth/signup">Register</Link>
                </div>
            </Fragment>
        );
    }
}

LoginFrom.propTypes = {
    ...authPropTypes
};

LoginFrom.defaultProps = {
    loading: false,
    working: false
};

const mapStateToProps = state => ({
    errors: state.auth.errors,
    isLoading: state.auth.loading,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { auth })(withRouter(LoginFrom));
