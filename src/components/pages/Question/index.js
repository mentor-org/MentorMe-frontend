import React, { Component, Fragment } from 'react';
import Sidebar from '../../shared/Sidebar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../../shared/Modal';
import Reply from '../../shared/Question/Reply';
import classNames from 'classnames';
import { fetchQuestion } from '../../../actions/question';
import RenderInput from '../../shared/FormComponents/RenderInput';


class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {},
      title: '',
      description: '',
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

  handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

  }

  handleFocus(e) {
    e.preventDefault();
    
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchQuestion(id);
    this.setState({
      title: this.props.question.title,
      description: this.props.question.description,
    });
  }

  render() {
    const { user, errors, question } = this.props;
    const id = this.props.match.params.id;

    return (
      <Fragment>
        <Sidebar show={this.state.show} showSidebar={this.showSidebar} />

        <div className="container mx-auto">
          <div id="wrapper">
            <div style={{ textAlign: 'center', marginTop: '2em' }} className="my-4">
              {user.id === question.userId ?
                <div>
                <Link to="#" className="btn" onClick={this.handleModal}>Edit</Link>
                <Link to="#" className="btn" onClick={this.deleteQuestion} style={{ marginLeft: '20px' }}>Delete</Link>
                </div>
              : ''}
            </div>
            <div className="container mx-auto">
                <h1 className="font-semibold uppercase text-2xl">{question.title}</h1>
                <p className="my-4">{question.description}</p>
                <div className="border border-gray-400"></div>

                <div className="my-4">
                  <Reply id={id} />
                </div>
            </div>
          </div>
          <Modal toggle={this.state.toggle} title="Edit Question" >
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <RenderInput
                    type="title"
                    name="title"
                    placeholder="Title"
                    id="title"
                    title="title"
                    value={this.state.title}
                    className={classNames('form', { 'text-red-600 text-sm mb-4': errors.title })}
                    onChange={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <RenderInput
                    type="description"
                    name="description"
                    placeholder="Body"
                    id="description"
                    title="description"
                    value={this.state.description}
                    className={classNames('form', { 'text-red-600 text-sm mb-4': errors.description })}
                    onChange={this.handleChange.bind(this)}
                    onFocus={this.handleFocus.bind(this)}
                  />
                </div>
            </form>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  question: state.question.question,
  user: state.auth.user,
  errors: state.question.errors
});

export default connect(mapStateToProps, { fetchQuestion })(Question);