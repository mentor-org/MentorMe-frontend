import React, { Component, Fragment } from 'react';
import ReplyForm from '../Form/ReplyForm';
import SingleReply from './SingleReply';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchReplies } from '../../../actions/question';


class Reply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      replies: []
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.fetchReplies(id, this.props.history);
  }

  render() {
    return (
      <Fragment>
        <ReplyForm id={this.props.id} />

        <h1 className="text-lg">Replies</h1>

        <div className="my-1 px-1 w-full md:w-1/2 lg:my-1 lg:px-4 lg:w-2/5">
          {this.props.replies.map((reply, index) => {
            return <SingleReply reply="reply" key={index} />;
          })}
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = state => ({
  replies: state.question.replies
});


export default connect(mapStateToProps, { fetchReplies })(withRouter(Reply));
