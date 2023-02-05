import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import styles from "./Profile.module.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`${styles.Profile}`}>
      <div className={styles.container}>
        <img
          src={currentUser.photoURL}
          alt="Profile"
          className={styles.profileImage}
        />
        <h1 className={styles.name}>{currentUser.displayName}</h1>
        <p className={styles.email}>{currentUser.email}</p>
        <button className="btn btn-danger" onClick={() => signOut(auth)}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
