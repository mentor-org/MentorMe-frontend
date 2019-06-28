import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import RenderInput from '../FormComponents/RenderInput';
import Preloader from '../Preloader/Preloader';
import { addQuestion } from '../../../actions/question';
import tags from '../Tags';


class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: [],
      title: '',
      tag: '',
      description: '',
      errors: {}
    };
  }const

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

  handleSubmit(e) {
    e.preventDefault();
    const { title, tag, description } = this.state;
    const questionValues = {
      title,
      tag,
      description
    };

    this.props.addQuestion(questionValues);
  }

  handleFocus(e) {
    e.preventDefault();

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;
    const { isFetching } = this.props;

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="d-flex-col" data-modal="question">
          <div className="form-group">
            <RenderInput
              label="Title"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={this.state.title}
              className={classNames('form-control', { 'error': errors.title })}
              error={errors.title}
              handleChange={this.handleChange.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag" >Tags</label>
            <select onChange={this.handleChange.bind(this)} name="tag" style={{ color: '#000', border: 'none' }}>
                {tags.map((tag, index) => {
                    return <option value={tag.name} key={index}>{tag.name}</option>;
                })}
            </select>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              onChange={this.handleChange.bind(this)}
              value={this.state.description}
              className={classNames('form-control', { 'error': errors.description })}
              placeholder="Question Body"
              rows="3"
            ></textarea>
          </div>
        </div>

        <button className="btn btn-primary" disabled={isFetching} type="submit">
            {isFetching === true ?
                <Preloader
                    type="button"
                    // eslint-disable-next-line
                    style="TailSpin"
                    height={12}
                    width={12}
                    color="blue"
                />
                : 'Add question'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.question.isFetching,
  errors: state.question.errors,
});

export default connect(mapStateToProps, { addQuestion })(NewQuestion);
