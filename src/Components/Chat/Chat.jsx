import React, { useContext } from "react";
import styles from "./Chat.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineUserAdd, AiOutlineVideoCamera } from "react-icons/ai";
import Messages from "../Massages/Messages";
import TypeInput from "../TypeInput/TypeInput";
import { ChatContext } from "../../ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className={`${styles.Chat} `}>
      <div
        className={`${styles.ChatInfo} d-flex justify-content-between align-items-center`}
      >
        <span>{data?.user.displayName}</span>
        <div className={`${styles.ChatIcon}`}>
          <AiOutlineVideoCamera size={25} />
          <AiOutlineUserAdd size={25} />
          <BiDotsHorizontalRounded size={25} />
        </div>
      </div>
      <Messages />
      <TypeInput />
    </div>
  );
};

export default Chat;
