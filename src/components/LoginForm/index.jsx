import "./loginForm.css";
import { useState } from "react";
import axios from "axios"; // to be able to send request
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginForm = ({ setModalVisible, setWhichModal, setToken }) => {
  // DECLARE STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // DECLARE VARIABLE(S)
  const navigate = useNavigate();

  // DECLARE FUNCTIONS TO HANDLE CHANGES AND SUBMIT
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://site--marvel-back--7lpgx9xk8rh5.code.run/user/login",
        {
          email,
          password,
        }
      );
      setErrorMessage("");
      setModalVisible(false);
      setToken(result.data.token);
      Cookies.set("tokenMarvel", result.data.token, { expires: 7 });
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("email and/or password are not correct");
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
      <h1>Login</h1>
      <form className="form" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          {errorMessage && <span>{errorMessage}</span>}
          <p
            onClick={() => {
              setWhichModal("signup");
            }}
          >
            Don't have an account yet? Sign up !
          </p>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
