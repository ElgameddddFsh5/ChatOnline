import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import Chat from "../../Components/Chat/Chat";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={`${styles.homeContainer}  d-flex`}>
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
