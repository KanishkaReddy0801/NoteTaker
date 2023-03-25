import React, { useState, useEffect } from 'react';
import BASE_URL from '../../helper';
import './notes.css'

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from API
    fetch(`${BASE_URL}/notes`)
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='notes'>
      <div className='header'>
        <h1>My Notes</h1>
        <div className='nav'>
          <a href="/notes" className='nav-link'>Home</a>
          <a href="/addnote" className='nav-link'>Add Note</a>
          <a href="#" className='nav-link'>Delete All</a>
          <a href="#" className='nav-link'>Export</a>
          <a href="/login" className='nav-link'>Logout</a>
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search notes..." className="search-input" />
        <button className="search-button">Search</button>
      </div>
      <ul className="note-list">
        {notes.map(note => (
          <li key={note.id} className="note-item">
            <div className="note-header">
              <h2>{note.title}</h2>
              <p>Created on {note.date} at {note.time}</p>
            </div>
            <div className="note-content">
              <p>{note.description.substring(0, 50)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;



