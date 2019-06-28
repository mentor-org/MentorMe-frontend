/* eslint-disable max-len */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { logout } from '../../../actions/auth';
import { connect } from 'react-redux';


const Sidebar = (props) => {
  return (
        <Fragment>
            <nav>
                <div className="centre" id="logo">
                    <span className="">MMe</span>
                </div>
                <ul className="nav">
                    <li>
                        <Link className="centre selected" to="/" data-balloon-pos="right" data-balloon="Home">
                            <span className="icon ion-ios-home"></span>
                        </Link>
                    </li>
                    <li>
                        <Link className="centre" to="#" data-balloon-pos="right" data-balloon="People">
                            <span className="icon ion-ios-people"></span>
                        </Link>
                    </li>
                    <li>
                        <Link className="centre" to="#" data-balloon-pos="right" data-balloon="Chats">
                            <span className="icon ion-ios-chatbubbles"></span>
                        </Link>
                    </li>
                    <li>
                        <Link className="centre" to="#" data-balloon-pos="right" data-balloon="Settings">
                            <span className="icon ion-ios-cog"></span>
                        </Link>
                    </li>
                </ul>
                <ul className="navBottom">
                    <li>
                        <button className="you centre" data-balloon-pos="right" data-balloon="You" onClick={props.showSidebar}>
                            <img src="https://pbs.twimg.com/profile_images/1044222938474397696/TtNO9cun_400x400.jpg" alt="avatar" />
                        </button>
                    </li>
                </ul>
            </nav>

            <div className={classNames('meContainer', { 'show': props.show })}>
                <div className="section Me">
                    <div className="avatar">
                    <img src="https://pbs.twimg.com/profile_images/1044222938474397696/TtNO9cun_400x400.jpg" alt="avatar" />
                    </div>
                    <div className="info">
                        <div className="name">{props.user.fullName}</div>
                    </div>
                </div>
                <div className="section">
                    <ul>
                        <li>
                            <Link to="/profile">
                                <span className="con ion-ios-people"></span>
                                <span className="text">Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="section">
                    <ul>
                        <li><Link to="#">Settings and Privacy</Link></li>
                        <li><Link to="#">Help Centre</Link></li>
                        <li><Link to="#">Keyboard shortcuts</Link></li>
                        <li><Link to="#" onClick={props.logout}>Log out</Link></li>
                    </ul>
                </div>
            </div>
        </Fragment>
  );
};

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Sidebar);
