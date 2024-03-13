import React from "react";
import { IoIosMoon } from "react-icons/io";
import { Outlet } from "react-router-dom";

export default function Nav({ darkMode, setDarkMode }) {
    function modeClick(){
        setDarkMode(prev=>!prev)
    }
  return (
    <>
        <nav className={darkMode ? "darkNav" : "lightNav"}>
            <h2>Where in the world?</h2>
            <div id="modeButton" onClick={modeClick}>
                <IoIosMoon />
                <h5>Dark Mode</h5>
            </div>
        </nav>
        <Outlet/>
    </>
  );
}
