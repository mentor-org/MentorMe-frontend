/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <nav>
        <div className="centre" id="logo">
            <span className="">MMe</span>
        </div>
        <ul className="nav">
            <li>
                <Link className="centre selected" to="#" data-balloon-pos="right" data-balloon="Home">
                    <span className="fas fa-home"></span>
                </Link>
            </li>
            <li>
                <Link className="centre" to="#" data-balloon-pos="right" data-balloon="Moments">
                    <span className="fas fa-bolt"></span>
                </Link>
            </li>
            <li>
                <Link className="centre" to="#" data-balloon-pos="right" data-balloon="Notifications">
                    <span className="fas fa-bell"></span>
                </Link>
            </li>
        </ul>
        <ul className="navBottom" >
            <li>
                <button className="you centre" data-balloon-pos="right" data-balloon="You">
                    <img src="/img/avatar.jpg" alt="avatar" />
                </button>
            </li>
        </ul>
    </nav>
  );
};

export default Sidebar;
