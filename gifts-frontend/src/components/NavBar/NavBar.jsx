import React from "react";
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
            <b>Home</b>
        </li>
        <li className={styles.brand}>
            <b>Edit</b>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
