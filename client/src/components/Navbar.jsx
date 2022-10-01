import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { userContext } from "../context/userContext";

function Navbar({ setLoginModal }) {
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    axios.get("http://localhost:3001/user/login").then((response) => {
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    });
  }

  function logout() {
    axios.get("http://localhost:3001/user/logout").then((response) => {
      checkLogin();
    });
  }

  return (
    <>
      <Nav>
        {user ? (
          <UserInfo>
            <p>{user.name}</p>
          </UserInfo>
        ) : (
          <UserInfo>
            <p></p>
          </UserInfo>
        )}
        {user ? (
          <Menu onClick={logout}>
            <p>Logout</p>
          </Menu>
        ) : (
          <Menu
            onClick={() => {
              setLoginModal(true);
            }}
          >
            <p>Login</p>
          </Menu>
        )}
      </Nav>
    </>
  );
}

export default Navbar;

const Nav = styled.div`
  display: flex;
  align-items: center;

  height: 50px;
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  background-color: rgba(255, 255, 255, 0);
  z-index: 1;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-inline: 50px;
  flex: 1;

  p {
    color: white;
    font-size: 25px;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 50px;

  p {
    color: white;
    font-size: 25px;
    cursor: pointer;
    border-bottom: 2px solid rgba(255, 255, 255, 0);
    transition: all 250ms;

    :hover {
      border-bottom: 2px solid white;
    }
  }
`;
