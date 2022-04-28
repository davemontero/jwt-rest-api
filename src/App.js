import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home"
import Private from "./views/private";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/" element={<ProtectedRoute isAllowed={localStorage.getItem("jwt")} />}>
        <Route path="/private" element={<Private />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
