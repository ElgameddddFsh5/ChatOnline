import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Message.module.css";
import { ChatContext } from "../../ChatContext";
import { AuthContext } from "../../AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const [, setChats] = useState([]);

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

  return (
    <div
      ref={ref}
      className={`${styles.Massage}  ${
        message.senderId === currentUser.uid && styles.owner
      } d-flex align-items-center`}
    >
      <div className={`${styles.MassageInfo}`}>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="rounded-5"
        />
        {/* <p>{date}</p> */}
      </div>

      <div className={`${styles.MassageContent}`}>
        {message.img && <img src={message.img} alt="" />}
        <span>{message.text}</span>
      </div>
    </div>
  );
};

export default Message;
