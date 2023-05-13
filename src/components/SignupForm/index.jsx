import "./signUpForm.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUpForm = ({ setModalVisible, setWhichModal, setToken }) => {
  // DECLARE STATE(S)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // DECLARE VARIABLE(S)
  const navigate = useNavigate();

  // DECLARE FUNCTIONS TO HANDLE CHANGES AND SUBMIT
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleClickNewsletter = () => {
    setNewsletter(!newsletter);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://site--marvel-back--7lpgx9xk8rh5.code.run/user/signup",
        { email, username, password }
      );
      setErrorMessage("");
      setModalVisible(false);
      setToken(result.data.token);
      Cookies.set("tokenMarvel", result.data.token, { expires: 7 });
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("There is already an account associated to that email");
      } else if (error.response.data.message === "missing parameter") {
        setErrorMessage("Please fill in all the fields");
      }
    }
  };

  return (
    <div
      className="modal"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <button
        className="closing-button"
        onClick={() => {
          setModalVisible(false);
        }}
      >
        X
      </button>
      <h1>S'inscrire</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleUsernameChange}
          value={username}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleEmailChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <div className="modal-submit">
          <button type="submit">Sign up</button>
          {errorMessage && <span>{errorMessage}</span>}
          <p
            onClick={() => {
              setWhichModal("login");
            }}
          >
            Do you already have an account? Login !
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
