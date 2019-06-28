import React , { Component } from 'react';
import { connect } from 'react-redux';
import { reply } from '../../../actions/question';
import classNames from 'classnames';
import '../Form/Form.scss';

class ReplyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: '',
      errors: ''
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

    const { body } = this.state;

    this.props.reply(this.props.id, { body });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
    }
}

  render() {
    const { body } = this.state;
    const { errors } = this.props;

    return (
      <div>
        <h3>Reply to Question Feed</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-1 lg:px-4 lg:w-2/5">
            <textarea name="body" value={body} onChange={this.handleChange.bind(this)} rows="3" placeholder="Reply" className={classNames('', { 'border-red-600': errors.body })}></textarea>
            {errors.body && <div className="text-red-600 text-sm mb-4">{errors.body}</div>}
            <button type="submit" className="py-2 px-4 border rounded border-blue-400 hover:bg-blue-500 font-semibold hover:text-white">Reply</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  reply: state.question.reply,
  isLoading: state.question.isFetching,
  errors: state.question.errors
});

export default connect(mapStateToProps, { reply })(ReplyForm);
