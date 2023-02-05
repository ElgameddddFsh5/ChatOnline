import React, { useEffect, useRef, useState } from "react";
import styles from "./Register.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { BiImageAdd } from "react-icons/bi";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const InputRef = useRef(""),
    [err, setErr] = useState(false);
  const navigation = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const DisplayName = e.target[0].value,
      email = e.target[1].value,
      password = e.target[2].value,
      file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, DisplayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: DisplayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: DisplayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChat", res.user.uid), {});

            navigation("/");

            // console.log("File available at", downloadURL);
          });
        }
      );
      
    } catch (err) {
      setErr(true);
    }
  };

  useEffect(() => {
    InputRef.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handelSubmit}>
        <h1 className={styles.registerheader}>Register</h1>
        <div className={styles.formControl}>
          <label htmlFor="username">Username</label>
          <input
            ref={InputRef}
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <input style={{ display: "none" }} type="file" id="file" />
        <label htmlFor="file">
          <BiImageAdd size={35} className={styles.img} />
          <span>Add an avatar</span>
        </label>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
        {err && <span>Something Went Wrong!</span>}
        <Link to="/login">Already Have an account?</Link>
      </form>
    </div>
  );
}

export default RegisterPage;
