import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProfileId.module.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const ProfileId = () => {
  const { profileID } = useParams();
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", profileID)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {}
  };
  handleSearch();

  return (
    <div className={`${styles.Profile}`}>
      {user && (
        <div className={styles.container}>
          <img
            src={user.photoURL}
            alt="Profile"
            className={styles.profileImage}
          />
          <h1 className={styles.name}>{user.displayName}</h1>
        </div>
      )}
    </div>
  );
};

export default ProfileId;
