import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.css";

/**
 * The Navbar component provides a navigation bar at the top of the page.
 * It uses context to check if a user is logged in and adjusts the menu accordingly.
 * @returns {JSX.Element} The rendered JSX for the Navbar component.
 */
const Navbar = () => {

  return (
    <div className={styles.navBar}>
      <ul>
        {/* Standard links that are always present at the top of the page*/}
        <li className={styles.brand}>
          <Link to="/">
            <b>Home</b>
          </Link>
        </li>
        <li className={styles.brand}>
          <Link to="/">
            <b>Exit</b>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
