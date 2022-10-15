import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  // Variables
  const date = new Date();

  const [darkTheme, setDarkTheme] = useState(() => {
    return localStorage.getItem("darkTheme") == "true" ? true : false;
  });

  const [notes, setNotes] = useState(() => {
    let notesData = localStorage.getItem("notes");
    if (notesData == undefined) {
      localStorage.setItem("notes", JSON.stringify([]));
      notesData = [];
    } else {
      notesData = JSON.parse(notesData);
    }
    return notesData;
  });

  const [noteText, setNoteText] = useState("");
  const [searchValue, setSearch] = useState("");

  // Functions
  function toggleDarkTheme() {
    setDarkTheme(darkTheme == true ? false : true);
  }

  const handleNoteTextChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  function addNote() {
    if (noteText !== "" && noteText.trim().length !== 0) {
      if (noteText.length > 250) {
        setNoteText(noteText.substring(0, 250));
      }
      let day = date.getDay(),
        month = date.getMonth();

      setNotes((notes) => [
        {
          text: noteText,
          date: `${day.toString().length == 1 ? `0${day}` : day}/${
            month.toString().length == 1 ? `0${month}` : month
          }/${date.getFullYear()}`,
        },
        ...notes,
      ]);
    }
    setNoteText("");
  }

  function removeNote(idx) {
    setNotes([...notes.slice(0, idx), ...notes.slice(idx + 1, notes.length)]);
  }

  function filterNotes() {
    if (!searchValue) {
      return notes;
    }

    const search = searchValue.toLowerCase();
    return notes.filter((note) => {
      return note.text.toLowerCase().indexOf(search) > -1;
    });
  }

  // Effects
  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Main UI
  return (
    <div className={`App ${darkTheme == true ? "darkmode" : "lightmode"}`}>
      <div className="header">
        <h1>Notes {darkTheme}</h1>
        <span className="mdi mdi-brightness-4" onClick={toggleDarkTheme} />
      </div>
      <div className="search">
        <span className="mdi mdi-magnify" />
        <input
          type="text"
          id="search"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>

      <div className="notes">
        {filterNotes(notes).map((data, i) => {
          return (
            <div className="note" key={i}>
              <p className="noteText">{data.text}</p>
              <div className="bottom">
                <h2>{data.date}</h2>
                <span
                  className="mdi mdi-delete"
                  onClick={() => {
                    removeNote(i);
                  }}
                />
              </div>
            </div>
          );
        })}
        <div className="note createNote">
          <textarea
            className="noteText"
            value={noteText}
            onChange={handleNoteTextChange}
            placeholder="Type anything"
            maxLength="250"
          ></textarea>
          <div className="bottom">
            <h2>{(250 - noteText.length).toString()} Remaining</h2>
            <button onClick={addNote}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
