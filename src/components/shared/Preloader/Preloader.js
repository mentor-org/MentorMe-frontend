import React from 'react';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Preloader.scss';

const Preloader = ({ type, style, height, width, color }) => {
    const className = classNames({
        'main-preloader': type === 'page',
        '': type === 'button'
    });

    return (
        <div className={className}>
            <Loader type={style} height={height} width={width} color={color} />
        </div>
    );
};

Preloader.propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string
};

Preloader.defaultProps = {
    type: null,
    style: null,
    height: null,
    width: null,
    color: null
};

export default Preloader;
