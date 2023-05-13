import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// IMPORT PAGES
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import ComicsOfCharacter from "./pages/ComicsOfCharacters";
import Favorites from "./pages/Favorites";

// IMPORT COMPONENT(S)
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  // DECLARE STATE
  const [whichPage, setWhichPage] = useState("characters"); // will either be characters, comics or favorites
  const [modalVisible, setModalVisible] = useState(false); // for the login & signup modals
  const [whichModal, setWhichModal] = useState(""); // either "" or "login" or "signup"
  const [token, setToken] = useState("");
  const [search, setSearch] = useState(""); // stores what's in the search field
  const [limit, setLimit] = useState(100); // results per page (max 100)

  return (
    <Router>
      <Header
        whichPage={whichPage}
        setWhichPage={setWhichPage}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        whichModal={whichModal}
        setWhichModal={setWhichModal}
        setToken={setToken}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/comics"
          element={
            <Comics
              search={search}
              setSearch={setSearch}
              limit={limit}
              setLimit={setLimit}
            />
          }
        />
        <Route path="/comics/:id" element={<ComicsOfCharacter />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      {modalVisible && (
        <Modal
          setModalVisible={setModalVisible}
          setWhichModal={setWhichModal}
          whichModal={whichModal}
          setToken={setToken}
        />
      )}
    </Router>
  );
}

export default App;
