import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../../actions/question';
import Sidebar from '../../shared/Sidebar';
import { Link } from 'react-router-dom';



class Users extends Component {
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
    this.props.getUsers();
  }


  render() {
    const { users } = this.props;

    return (
      <Fragment>
        <Sidebar show={this.state.show} showSidebar={this.showSidebar} />

        <div className="container mx-auto">
          <div id="wrapper">
            <h2 className="uppercase font-medium mb-4 text-xl mt-4">Users</h2>

            <div className="container mx-auto">
              <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-8">
                {users.map((user, index) => {
                  return <div className="my-1 px-1 w-full lg:mx-4 md:px-4 lg:my-4 lg:px-4 lg:w-2/5 md:flex bg-white rounded-lg p-6" key={index}>
                    <Link to={`/user/${user.id}`} >
                      <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="https://randomuser.me/api/portraits/women/17.jpg" alt="avatar" />
                    </Link>
                    <div className="text-center md:text-left mt-4">
                      <Link to={`/user/${user.id}`} >
                        <h2 className="text-lg">{user.fullName}</h2>
                      </Link>
                      <div className="text-purple-500">{user.type}</div>
                      <div className="text-gray-600">{user.email}</div>
                      <div className="text-gray-600">(555) 765-4321</div>
                   </div>
                 </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.question.users,
  loading: state.question.isFetching
});

export default connect(mapStateToProps, { getUsers })(Users);