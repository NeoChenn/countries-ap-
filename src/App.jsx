import React from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Country from "./components/Country.jsx";
import CountryDetail from "./components/CountryDetail.jsx";

function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Nav darkMode={darkMode} setDarkMode={setDarkMode} />}
        >
          <Route path="" element={<Country darkMode={darkMode} />}></Route>
          <Route
            path=":id"
            element={<CountryDetail darkMode={darkMode} />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
