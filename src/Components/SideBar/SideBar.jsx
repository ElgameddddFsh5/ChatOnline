import React, { useContext } from "react";
import styles from "./SideBar.module.css";
import { Link } from "react-router-dom";
import SearchUser from "../SearchUser/SearchUser";
import Chats from "../Chats/Chats";

import { AuthContext } from "../../AuthContext";
const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  //   console.log(currentUser);
  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.SideBarContent}`}>
        <div
          className={`${styles.ProfileContent} d-flex justify-content-between align-items-center`}
        >
          <h6>{currentUser.displayName}</h6>

          <Link to="/profile" className="nav-link">
            <img
              src={currentUser.photoURL}
              alt=""
              className={`${styles.Profileimage} rounded-5`}
            />
          </Link>
        </div>
      </div>
      <SearchUser />
      <Chats />
      {/* <div className={`${styles.Content}`}> */}
      {/* <div className={`${styles.msg}`}>hello</div> */}
      {/* </div> */}
    </div>
  );
};

export default Sidebar;
