import React, { Component, Fragment } from 'react';
import Sidebar from '../../shared/Sidebar';
import { connect } from 'react-redux';
import Modal from '../../shared/Modal';
import NewQuestion from '../../shared/Question/NewQuestion';
import Question from '../../shared/Question/Question';
import tags from '../../shared/Tags';
import { fetchQuestions, getQuestionsByTag } from '../../../actions/question';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      show: false,
      questions: [],
      tag: ''
    };


    this.handleModal = () => {
      this.setState({
        toggle: true
      });
    };

    this.handleChange = (e) => {
      e.preventDefault();

      if (e.target.tagName === 'SELECT') {
        const index = e.currentTarget.options.selectedIndex;
        const option = e.currentTarget.options;
        const key = e.target.name;

        this.setState({
            [key]: option[index].value
        });
      }

      const { tag } = this.state;
      if (tag === '') {
        this.props.fetchQuestions();
      } else {
        this.props.getQuestionsByTag(tag);
      }
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
    const { tag } = this.state;
    if (tag === '') {
      this.props.fetchQuestions();
    } else {
      this.props.getQuestionsByTag(tag);
    }
  }



  render() {
    return (
      <Fragment>
        <Sidebar show={this.state.show} showSidebar={this.showSidebar} />

        <div id="container">
          <div id="wrapper">
            <div className="container">
              <h2 className="feed-tag">Question Feed</h2>
              <div className="flex">
                <div>
                  <select onChange={this.handleChange.bind(this)} name="tag" style={{ color: '#000', border: 'none' }}>
                      {tags.map((tag, index) => {
                          return <option value={tag.name} key={index}>{tag.name}</option>;
                      })}
                  </select>
                </div>
                <button className="bg-transparent hover:bg-teal text-teal-dark font-semibold hover:text-white py-2 px-4 border border-teal hover:border-transparent rounded mr-2" data-modal="question" onClick={this.handleModal}>Create Question</button>
              </div>
            </div>
            <div className="container">
              <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {this.props.questions.map((question, index) => {
                  return <Question key={index} id={question.id} question={question} />;
                })}
              </div>
            </div>
          </div>
        </div>

        <Modal toggle={this.state.toggle} title="Add Question">
          <NewQuestion />
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  questions: state.question.questions
});

export default connect(mapStateToProps, { fetchQuestions, getQuestionsByTag })(Home);
