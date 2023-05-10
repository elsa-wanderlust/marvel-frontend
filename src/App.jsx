import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// IMPORT PAGES
import Home from "./pages/Home";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Comics from "./pages/Comics";
import ComicsOfCharacter from "./pages/ComicsOfCharacters";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:id" element={<ComicsOfCharacter />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
