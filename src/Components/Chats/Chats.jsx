import React, { useContext, useEffect, useState } from "react";
import styles from "./Chats.module.css";
// import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { ChatContext } from "../../ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // console.log(chats);

  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={`${styles.Chats} d-flex align-items-center`}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="userChat">
              <div className={`${styles.NameAndText}`}>
                {/* <Link to="/profiles" className="nav-link"> */}
                <img
                  src={chat[1].userInfo.photoURL}
                  alt=""
                  className={`${styles.Chatsimg} rounded-5`}
                />
                {/* </Link> */}
                <div className={styles.lastmsg}>
                  <p>{chat[1].userInfo.displayName}</p>
                  <span>{chat[1].lastMessage?.text}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Chats;
