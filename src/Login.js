import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const signIn = (e) => {
    e.preventDefault(); //without refreshing
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        history("/");
      })
      .catch(error => alert(error.message))
  };

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => { //userCredential is the return value of createUserWithEmailAndPassword. It includes UID, email, operationType...
        // 註冊成功
        const user = userCredential.user; 
        //Retrieve the user info from userCredential
        //We could also retrieve user's email by user.email 
        console.log("User registered:", user);

        // if login success, then redirect to the home page.
        if (userCredential) {
          history("/");
        }
      })
      .catch((error) => {
        // 處理錯誤
        console.error("Error during registration:", error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login_signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login_registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
