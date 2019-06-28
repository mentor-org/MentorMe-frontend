/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { Link } from 'react-router-dom';
import { authPropTypes } from '../../../helpers/proptypes';
import RenderInput from '../FormComponents/RenderInput';
import { auth } from '../../../actions/auth';
import classNames from 'classnames';
import countries from '../Countries';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            type: 'mentee',
            country: '',
            password: '',
            errors: {},
            formValid: false,
        };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });

        if (e.target.tagName === 'SELECT') {
            const index = e.currentTarget.options.selectedIndex;
            const option = e.currentTarget.options;
            const key = e.target.name;

            this.setState({
                [key]: option[index].value
            });
        }

    }

    handleFocus(event) {
        event.preventDefault();
    }


    handleSubmit(event) {
        event.preventDefault();
        const { fullName, email, password, country, type } = this.state;

        const userDetails = {
            fullName,
            email,
            type,
            country,
            password,
            password2: password,
        };

        this.props.auth('signup', userDetails, this.props.history);
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            return this.props.history.push('/');
        }
    }

    render() {
        const { isLoading, errors } = this.props;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="signup" noValidate autoComplete="off">
                    <div className="form-group">
                        <RenderInput
                            name="fullName"
                            label="Full Name"
                            id="fullName"
                            type="text"
                            className={classNames('form-control', { 'error': errors.fullName })}
                            placeholder="John Doe"
                            value={this.state.fullName}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={errors.fullName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select id="sel" onChange={this.handleChange.bind(this)} name="type">
                            <option value="mentee" defaultValue="mentee">Mentee</option>
                            <option value="mentor">Mentor</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <RenderInput
                            name="email"
                            label="Email Address"
                            id="email"
                            type="email"
                            className={classNames('form-control', { 'error': errors.email })}
                            placeholder="example@gmail.com"
                            value={this.state.email}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={errors.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select onChange={this.handleChange.bind(this)} name="country">
                            {countries.map((country, index) => {
                               return <option value={country.name} key={index}>{country.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <RenderInput
                            name="password"
                            label="Password"
                            id="password"
                            type="password"
                            className={classNames('form-control', { 'error': errors.password })}
                            placeholder="**********"
                            value={this.state.password}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={errors.password}
                        />
                    </div>
    
                    <button className="btn btn-primary" disabled={isLoading} type="submit">
                        {isLoading === true ?
                                <div className="text-center" style={{ margin: 'auto' }}>
                                    <Preloader
                                            type="button"
                                            // eslint-disable-next-line
                                            style="TailSpin"
                                            height={12}
                                            width={12}
                                            color="blue"
                                        />
                                    </div>
                            : 'Register'}
                    </button>
                </form>
                
                <div className="foot">
                  <Link to="/auth/login">Login</Link>
                </div>
            </Fragment>
        );
    }
}

SignupForm.propTypes = {
    ...authPropTypes
};

SignupForm.defaultProps = {
    loading: false,
    working: false
};

const mapStateToProps = state => ({
    errors: state.auth.errors,
    isLoading: state.auth.loading,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { auth })(withRouter(SignupForm));