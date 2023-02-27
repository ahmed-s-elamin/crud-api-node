import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
