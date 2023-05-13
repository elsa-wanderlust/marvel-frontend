import "./header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// src/assets/Img/logo.png
// /Users/elsaletallieur/LeReacteur/4.React/Marvel/Marvel-front/src/assets/Img/logo.png

const Header = ({
  whichPage,
  setWhichPage,
  modalVisible,
  setModalVisible,
  setWhichModal,
  setToken,
}) => {
  // DECLARE VARIABLE(S)
  const navigate = useNavigate();
  const token = Cookies.get("tokenMarvel");

  return (
    <div className="header">
      <section className="header-logo">
        {/* <img src={logo} alt="Marvel logo written in white on red background " /> */}
      </section>
      <section className="header-menu">
        <button
          onClick={() => {
            setWhichPage("characters");
            navigate("/");
          }}
        >
          The characters
        </button>
        <button
          onClick={() => {
            setWhichPage("comics");
            navigate("/comics");
          }}
        >
          The comics
        </button>
        <button
          onClick={() => {
            setWhichPage("favorites");
            navigate("/favorites");
          }}
        >
          My favorites
        </button>
      </section>
      <section className="header-buttons">
        <div>
          {!token ? (
            <div className="signup-login-buttons">
              <button
                onClick={() => {
                  setModalVisible(!modalVisible);
                  setWhichModal("signup");
                }}
              >
                Sign up
              </button>
              <button
                onClick={() => {
                  setModalVisible(!modalVisible);
                  setWhichModal("login");
                }}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="disconnect-button">
              <button
                onClick={() => {
                  Cookies.remove("tokenMarvel");
                  setToken("");
                }}
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Header;
