import { useEffect, useRef, useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {
  const InputRef = useRef(""),
    [err, setErr] = useState(false);
  const navigation = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value,
      password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation("/");
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
        <h1 className={styles.Loginheader}>Log in</h1>

        <div className={styles.formControl}>
          <label htmlFor="username">Username:</label>
          <input
            ref={InputRef}
            placeholder="Username"
            type="text"
            id="username"
          />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="password">Password:</label>
          <input placeholder="Password" type="password" id="password" />
        </div>
        <button className={styles.submitBtn} type="submit">
          Login
        </button>
        {err && <span>Something Went Wrong!</span>}
        <br />
        <Link to="/register">Don't Have an account ?</Link>
      </form>
    </div>
  );
};

export default Login;
