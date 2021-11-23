import "./Login.css";
import React from "react";
import axios from "axios";
import { FaUserAlt } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from "react-router-dom";

function Login() {
  function pullLoginFormInfo() {
    const userEmail = document.getElementById("username").value;
    const userPassword = document.getElementById("password").value;
    const userStayLoggedIn = document.getElementById("remember-me").checked;

    const request = JSON.stringify({
      email: userEmail,
      password: userPassword,
      stayLoggedIn: userStayLoggedIn,
    });
    return request;
  }

  async function login() {
    const request = pullLoginFormInfo();
    console.log(request);
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/login`,
      request
    );
    console.log(res.data);
  }

  return (
    <div className="login-container">
      <form id="login-form">

        <div className="input-container">
          <div className="icon-container">
            <FaUserAlt className="icon" />
          </div>
          <input type="text" id="username" placeholder="username" />
        </div>

        <div className="input-container">
          <div className="icon-container">
            <RiLockPasswordFill className="icon" />
          </div>
          <input type="text" id="password" placeholder="password" />
        </div>

        <div className="input-container">
          <label htmlFor="remember-me">Remember me:</label>
          <input type="checkbox" id="remember-me"/>
        </div>

      </form>
      <div className="submission-container">
        <button id="login" onClick={login}>
          Login
        </button>
      </div>
      <div>
        Don't have an account?
        <Link to="/register">
          Sign up
        </Link>
      </div>

    </div>
  );
}

export default Login;
