import React, { useState} from "react";
import BASE_URL from "../../helper";
import './addnotes.css'
import { Link } from "react-router-dom";

const Addnotes = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [response, setResponse] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault()
        // const note = { title, description }

        const resp = fetch(`${BASE_URL}/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              title,
              description,
            }),
          });
          const data = resp.json();
      
          if (data) {
            setResponse(data.message);
          }
    }
    return (
        <div>
            <h1>Add Note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit"> <Link to='/notes'> Add Note </Link></button>
            </form>
        </div>
    )
}

export default Addnotes;