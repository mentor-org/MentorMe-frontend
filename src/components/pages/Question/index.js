import React, { Component, Fragment } from 'react';
import Sidebar from '../../shared/Sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../shared/Modal';
import Reply from '../../shared/Question/Reply';
import { fetchQuestion } from '../../../actions/question';


class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      toggle: false,
      show: false,
    };

    this.handleModal = (e) => {
      e.preventDefault();

      this.setState({
        toggle: true
      });
    };

    this.deleteQuestion = (e) => {
      e.preventDefault();

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
    this.props.fetchQuestion(id);
  }

  render() {
    const { user } = this.props;
    const { question } = this.state;
    const id = this.props.match.params.id;

    return (
      <Fragment>
        <Sidebar show={this.state.show} showSidebar={this.showSidebar} />

        <div className="container">
          <div id="wrapper">
            <div style={{ textAlign: 'center', marginTop: '2em' }}>
              {user.id === question.userId ?
                <div>
                <Link to="#" className="btn" onClick={this.handleModal}>Edit</Link>
                <Link to="#" className="btn" onClick={this.deleteQuestion} style={{ marginLeft: '20px' }}>Delete</Link>
                </div>
              : ''}
            </div>
            <div className="container">
                
                <Reply id={id} />
            </div>
          </div>
          <Modal toggle={this.state.toggle} title="Edit Question" />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  question: state.question.question,
  user: state.auth.user
});

export default connect(mapStateToProps, { fetchQuestion })(Question);