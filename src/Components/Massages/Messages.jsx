import React, { useContext, useEffect, useState } from "react";
import styles from "./Messages.module.css";
import Message from "../Message/Message";
import { ChatContext } from "../../ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Massages = () => {
  const [messages, setMessages] = useState([]);
  
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className={`${styles.Massages}`}>
      <div className="messages">
        {messages.map((m) => (
          <Message message={m} key={m.id} />
        ))}
      </div>
    </div>
  );
};

export default Massages;
