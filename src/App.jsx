import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleDarkTheme() {
    setDarkTheme(!darkTheme);
    console.log(darkTheme);
  }

  return (
    <div className={`App ${darkTheme == true ? "darkmode" : "lightmode"}`}>
      <div className="header">
        <h1>Notes</h1>
        <span className="mdi mdi-brightness-4" onClick={toggleDarkTheme} />
      </div>
      <div className="search">
        <span className="mdi mdi-magnify" onClick={toggleDarkTheme} />
        <input type="text" id="search" placeholder="Search" />
      </div>
    </div>
  );
}

export default App;
