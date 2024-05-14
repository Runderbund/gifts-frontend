import React from 'react';
import { Link } from 'react-router-dom';
import "../App.css";

const NavBar = () => {
  return (
    <div className="navBar">
      <ul>
        {/* Each list item <li> is a navigation link */}
        <li className="navItem">
          <Link to="/">
            View As
          </Link>
        </li>
        <li className="navItem">
          <Link to="/other">
            View Other
          </Link>
        </li>
        <li className="navItem">
          <Link to="/self">
            View Self
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
