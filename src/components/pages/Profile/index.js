import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../shared/Sidebar';



class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.showSidebar = (e) => {
      e.preventDefault();

      const { show } = this.state;

      this.setState({
        show: !show, 
      });
    };
  }


  render() {
    return (
      <Fragment>
        <Sidebar show={this.state.show} showSidebar={this.showSidebar} />

        <div id="container">
          <div id="wrapper">
            <div className="container">
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 shadow-lg bg-white rounded-lg p-6 h-48">
              <img className="h-16 w-16 rounded-full mx-auto" src="https://randomuser.me/api/portraits/women/17.jpg" alt="avatar" />
                <div className="text-center">
                  <h2 className="text-lg">{this.props.user.fullName}</h2>
                  <div className="text-purple-500">{this.props.user.country}</div>
                  <div className="text-gray-600">{this.props.user.email}</div>
                  <div className="text-gray-600">(555) 765-4321</div>
                </div>
             </div>
            </div>
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 mt-8 container mx-auto flex items-center justify-around">
            <div>
              <div className="flex rounded border-b-2 border-grey-dark overflow-hidden">
                <button className="block text-grey text-sm shadow-border bg-green hover:bg-green-dark text-sm py-3 px-4 font-sans tracking-wide uppercase font-bold">
                  schedule a demo
                </button>
                <div className="bg-green-light shadow-border p-3">
                  <div className="w-4 h-4">
                    <svg className="fill-current text-white" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1024 544v448q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h224v-352q0-14 9-23t23-9h64q14 0 23 9t9 23zm416 352q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg>
                  </div>
                </div>
              </div>
             </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
