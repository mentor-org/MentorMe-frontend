import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Question = (props) => {
  return (
      <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
        <article className="overflow-hidden rounded-lg shadow-lg">
          <Link to={`/question/${props.id}`}>
              <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
          </Link>

          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                  <Link className="no-underline hover:underline text-black" to={`/question/${props.id}`}>
                      {props.question.title}
                  </Link>
              </h1>
              <p className="text-grey-darker text-sm">
                  {moment(props.question.createdAt).format('DD/MM/YYYY')}
              </p>
          </header>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
              <Link className="flex items-center no-underline hover:underline text-black" to="#">
                  <img alt="Placeholder" className="block rounded-full" src="https://picsum.photos/32/32/?random" />
                  <p className="ml-2 text-sm">
                      Annonymous
                  </p>
                </Link>
                <div className="px-6 py-4 text-right">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{props.question.tag}</span>
                </div>
          </footer>

          </article>
      </div>
  );
};

export default Question;
