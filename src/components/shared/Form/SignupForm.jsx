/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import { authPropTypes } from '../../../helpers/proptypes';
import RenderInput from '../FormComponents/RenderInput';
import { auth } from '../../../actions/auth';
import { isEmpty } from 'lodash';
import countries from '../Countries';

const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            email: '',
            type: 'mentee',
            country: '',
            password: '',
            formErrors: {
                fullName: '',
                email: '',
                country: '',
                password: '',
            },
            formValid: false,
        };

    }

    isValid(formErrors) {
        let valid;

        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false);
        });

        this.setState({
            formValid: valid
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        let { formErrors } = this.state;

        switch (name) {
            case "fullName":
                formErrors.fullName =
                    value.length < 3 ? "Full name is required": "";
                break;
            case "type":
                formErrors.type =
                    isEmpty(value) ? "Type is required": "";
                break;
            case "email":
                formErrors.email =
                    emailRegex.test(value) ? "": "Invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "Minimum of 6 characters required": "";
                break;
            
            default:
                break;
        }

        this.setState({
            formErrors, [name]: value
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
            this.props.history.push('/');
        }
    }

    render() {
        const { isLoading } = this.props;
        const { formErrors, formValid } = this.state;

        return (
            <Fragment>
                <form onSubmit={this.handleSubmit.bind(this)} className="signup" noValidate autoComplete="off">
                    <div className="form-group">
                        <RenderInput
                            name="fullName"
                            label="Full Name"
                            id="fullName"
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={this.state.fullName}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={formErrors.fullName}
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
                            className="form-control"
                            placeholder="example@gmail.com"
                            value={this.state.email}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={formErrors.email}
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
                            className="form-control"
                            placeholder="**********"
                            value={this.state.password}
                            handleChange={this.handleChange.bind(this)}
                            onFocus={this.handleFocus.bind(this)}
                            error={formErrors.password}
                        />
                    </div>
    
                    <button className="btn btn-primary" disabled={isLoading} type="submit">
                        {isLoading === true ?
                            <Preloader
                                type="button"
                                // eslint-disable-next-line
                                style="TailSpin"
                                height={12}
                                width={12}
                                color="blue"
                            />
                            : 'Register'}
                    </button>
                </form>
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