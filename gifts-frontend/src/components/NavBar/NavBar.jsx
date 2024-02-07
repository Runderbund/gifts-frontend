import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <ul>
        {/* Each list item <li> is a navigation link */}
        <li className={styles.navItem}>
          <Link to="/">
            View As
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/other">
            View Other
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/self">
            View Self
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
