import "./modal.css";

// IMPORT COMPONENT(S)
import SignUpForm from "../SignupForm";
import LoginForm from "../LoginForm";

const Modal = ({ setModalVisible, setWhichModal, whichModal, setToken }) => {
  return (
    <div
      className="modal-container"
      onClick={() => {
        setModalVisible(false);
      }}
    >
      {whichModal === "signup" ? (
        <SignUpForm
          setModalVisible={setModalVisible}
          setWhichModal={setWhichModal}
          setToken={setToken}
        />
      ) : (
        <LoginForm
          setModalVisible={setModalVisible}
          setWhichModal={setWhichModal}
          setToken={setToken}
        />
      )}
    </div>
  );
};
export default Modal;
