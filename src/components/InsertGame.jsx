import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase.js";
import PlatformList from "./dropdowns/PlatformList.jsx";
import "./styles/InsertGame.css";

export default function InsertGame() {
    // Form Variables + Utility
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleNewGame = async (e) => {
        e.preventDefault();

        // User Variables from Insert Form
        const userTitle = document.getElementById("game-title").value;
        const userGenre = document.getElementById("game-genre").value;
        const userDev = document.getElementById("game-dev").value;
        const userReleaseDate = document.getElementById("release-date").value;
        const userPlatform = document.getElementById("platforms").value;
    
        // Adding to Collection
        const collRef = collection(db, "games-list");
        
        const load = {
            title: userTitle,
            genre: userGenre,
            developer: userDev,
            release_date: userReleaseDate,
            platform: userPlatform
        };
        
        await addDoc(collRef, load);

        // Set Back to Default Values
        setInputs({
            "title": "",
            "genre": "",
            "developer": "",
            "release_date": "",
            "platform": "none"
        });
    }

    return (
        <div className="form-container">
            <form className="insert-game" onSubmit={handleNewGame}>
                <h1>Insert Game</h1>
                <label htmlFor="game-title">Title</label>
                <input id="game-title" type="text" name="title" value={inputs.title || ""} onChange={handleChange} placeholder="e.g. Final Fantasy VII: Remake" />
                <label htmlFor="game-genre">Genre</label>
                <input id="game-genre" type="text" name="genre" value={inputs.genre || ""} onChange={handleChange} placeholder="e.g. Role-playing (RPG)" />
                <label htmlFor="game-dev">Developer</label>
                <input id="game-dev" type="text" name="dev" value={inputs.dev || ""} onChange={handleChange} placeholder="e.g. Square Enix" />
                <label htmlFor="release-date">Release Date</label>
                <input id="release-date" type="text" name="rDate" value={inputs.rDate || ""} onChange={handleChange} placeholder="MMM DD, YYYY" />
                <PlatformList />
                <input type="submit" value="Submit" className="submit-insert" />
            </form>
        </div>
    );
}
