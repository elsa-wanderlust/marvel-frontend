import "./header.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { Icon } from "@iconify/react";

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
        <img src={logo} alt="Marvel logo written in white on red background " />
      </section>
      <section className="header-menu">
        <div>
          <Icon
            className={
              whichPage === "characters" ? "thunder-on" : "thunder-off"
            }
            icon="mdi:thunder"
            width="50"
            height="50"
          />
          <button
            onClick={() => {
              setWhichPage("characters");
              navigate("/");
            }}
          >
            The characters
          </button>
        </div>
        <div>
          <Icon
            className={whichPage === "comics" ? "thunder-on" : "thunder-off"}
            icon="mdi:thunder"
            width="50"
            height="50"
          />
          <button
            onClick={() => {
              setWhichPage("comics");
              navigate("/comics");
            }}
          >
            The comics
          </button>
        </div>
        <div>
          <Icon
            className={whichPage === "favorites" ? "thunder-on" : "thunder-off"}
            icon="mdi:thunder"
            width="50"
            height="50"
          />
          <button
            onClick={() => {
              setWhichPage("favorites");
              navigate("/favorites");
            }}
          >
            My favorites
          </button>
        </div>
      </section>
      <section className="user-buttons">
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
