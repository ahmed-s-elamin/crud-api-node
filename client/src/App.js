import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/add" element={<AddBook />} exact />
          <Route path="/books" element={<Books />} exact />
          <Route path="/about" element={<About />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
