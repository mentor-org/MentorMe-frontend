import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../shared/Sidebar';
import { getSingleUser } from '../../../actions/question';


class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
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

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleUser(id);
  }


  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <Sidebar show={this.state.show} showSidebar={this.showSidebar} />
        
        <div id="container">
          <div id="wrapper">
            <div className="container">
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 shadow-lg bg-white rounded-lg p-6 h-48 h-full">
              <img className="h-16 w-16 rounded-full mx-auto" src="https://randomuser.me/api/portraits/women/17.jpg" alt="avatar" />
                <div className="text-center mt-16">
                  <h2 className="text-lg">{user.fullName}</h2>
                  <div className="text-purple-500">{user.country}</div>
                  <div className="text-gray-600">{user.email}</div>
                  <div className="text-gray-600">(555) 765-4321</div>
                </div>
             </div>
            </div>
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 mt-8 container mx-auto flex items-center justify-around">
            <div>

            </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.question.user
});


export default connect(mapStateToProps, { getSingleUser })(UserProfile);
