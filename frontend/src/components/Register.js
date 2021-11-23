import React from "react";
import "./Register.css";
import axios from "axios";

function Register() {
  function pullFormInfo() {
    const userFirstName = document.getElementById("first-name").value;
    const userLastName = document.getElementById("last-name").value;
    const userUsername = document.getElementById("username").value;
    const userEmail = document.getElementById("email").value;
    const userInitialPassword = document.getElementById("initial-password").value;
    const userPasswordConfirmation = document.getElementById("confirmed-password").value;

    const request = {
        name: {
          firstName: userFirstName,
          lastName: userLastName,
        },
        email: userEmail,
        username: userUsername,
        password: {
          initialPassword: userInitialPassword,
          confirmedPassword: userPasswordConfirmation
        }
      }
    return request;
  }

  async function register() {
    const request = pullFormInfo();
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_ENDPOINT}/register`,
      request
    );
    
    console.log(res);
    
    const displayedResponseMessage = res.data.error ? res.data.error : '';
    document.getElementById('validation-message').innerHTML = displayedResponseMessage;
    
  };

  return (
    <div className="register-container">
      <form id="register-form">

      <div>
          <label htmlFor="first-name">First Name:</label>
          <input type="text" id="first-name" />
        </div>

        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input type="text" id="last-name" />
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" />
        </div>

        <div>
          <label htmlFor="initial-password">Password:</label>
          <input type="password" id="initial-password" />
        </div>

        <div>
          <label htmlFor="confirmed-password">Confirm Password:</label>
          <input type="password" id="confirmed-password" />
        </div>

      </form>
      <div>
        <button id="register" onClick={register}>
          Create new account
        </button>
      </div>
      <p id="validation-message"></p>
    </div>
  );
}

export default Register;
