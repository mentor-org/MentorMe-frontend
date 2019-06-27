import React, { Component, Fragment } from 'react';
import Sidebar from '../../shared/Sidebar';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

  }

  render() {
    return (
      <Fragment>
        <Sidebar />

        <div id="container">
          <div className="d-flex" id="wrapper"></div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
