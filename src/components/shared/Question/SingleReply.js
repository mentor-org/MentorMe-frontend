import React, { Fragment } from 'react';


const SingleReply = (props) => {
  return (
    <Fragment>
      <div className="py-2 px-4 border rounded border-blue-400 ">
        {props.reply}
      </div>
    </Fragment>
  );
};

export default SingleReply;
