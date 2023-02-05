import React, { useContext, useState } from "react";
import styles from "./TypeInput.module.css";
// import { AiOutlinePaperClip } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { AuthContext } from "../../AuthContext";
import { ChatContext } from "../../ChatContext";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

const TypeInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className={`${styles.TypeInput}`}>
      <form
        className={styles.messageInput}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          placeholder="Type your message here..."
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={styles.input}
        />
        <button className={styles.button}>Send</button>

        {/* <AiOutlinePaperClip size={35} color="#fff" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <BiImageAdd
            size={35}
            style={{ margin: "0px 10px", cursor: "pointer" }}
            color="#fff"
          />
        </label>
      </form>
    </div>
  );
};

export default TypeInput;
