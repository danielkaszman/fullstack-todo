import React, { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { userContext } from "../context/userContext";

function RegistrateModal({ setRegModal, setLoginModal }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPwd, setRepeatPwd] = useState();

  const [errorMessage, setErrorMessage] = useState();

  const { setUser } = useContext(userContext);

  function registrate() {
    axios
      .post("http://localhost:3001/user/registrate", {
        name,
        email,
        password,
      })
      .then((response) => {
        setErrorMessage(response.data);
        checkLogin();
      });
  }

  function checkLogin() {
    axios.get("http://localhost:3001/user/login").then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
        setRegModal(false);
      } else {
        setUser(null);
      }
    });
  }

  return (
    <Container>
      <Modal>
        <h2>Registrate</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Repeat password"
          onChange={(event) => {
            setRepeatPwd(event.target.value);
          }}
        />
        {errorMessage && <label>{errorMessage}</label>}
        <button
          disabled={
            !name || !email || !password || !repeatPwd || password !== repeatPwd
          }
          onClick={registrate}
        >
          Registrate
        </button>
        <p>
          If you already have an account, please{" "}
          <span
            onClick={() => {
              setRegModal(false);
              setLoginModal(true);
            }}
          >
            Login!
          </span>
        </p>
      </Modal>
    </Container>
  );
}

export default RegistrateModal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;

  top: 0;

  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  position: fixed;
  z-index: 10;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 0px 50px 10px rgb(0, 0, 0);
  background-image: linear-gradient(
    to right bottom,
    rgb(236, 192, 91),
    rgb(203, 81, 44)
  );

  border-radius: 20px;
  padding: 30px 20px;

  h2 {
    color: white;
    font-size: 50px;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    border-radius: 10px;
    border: none;
    font-size: 20px;
    padding: 15px;
    margin-bottom: 20px;

    :focus {
      outline-color: white;
    }
  }

  label {
    color: red;
    font-size: 20px;
    margin-bottom: 20px;
  }

  button {
    font-size: 20px;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: none;
    color: white;
    background-color: rgb(49, 49, 202);
    cursor: pointer;

    :disabled {
      color: grey;
      background-color: lightgray;
      cursor: auto;
    }
  }

  p {
    color: white;
    font-size: 15px;

    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
