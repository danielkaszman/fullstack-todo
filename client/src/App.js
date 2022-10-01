import { useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import LoginModal from "./components/LoginModal";
import RegistrateModal from "./components/RegistrateModal";
import axios from "axios";
import { userContext } from "./context/userContext";

function App() {
  axios.defaults.withCredentials = true;

  const [loginModal, setLoginModal] = useState(false);
  const [regModal, setRegModal] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {loginModal && (
        <LoginModal setLoginModal={setLoginModal} setRegModal={setRegModal} />
      )}
      {regModal && (
        <RegistrateModal
          setRegModal={setRegModal}
          setLoginModal={setLoginModal}
        />
      )}
      <Navbar setLoginModal={setLoginModal} />
      <Todo />
    </userContext.Provider>
  );
}

export default App;
