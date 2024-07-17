import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../App.css";
import { MemberContext } from '../context/MemberContext'; 

const NavBar = () => {
  const [backgroundImage, setBackgroundImage] = useState('navBar');
  const { selfMember } = useContext(MemberContext);

  // This works to change for Sasha, but leaves if Sasha is chosen by mistake and a new member chosen.
  useEffect(() => {
    if (selfMember){
      if (selfMember.member_id === 2) {
        setBackgroundImage('navBarSasha');
      }
    }
  }, [selfMember])
  
  return (
    <div className={backgroundImage}>
    {/* <div className={backgroundImage}> */}
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
