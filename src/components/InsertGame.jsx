import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useUserContext } from "./UserContext.jsx";
import db from "../firebase.js";
import PlatformList from "./dropdowns/PlatformList.jsx";
import "./styles/Forms.css";

export default function InsertGame() {
    // Getting user email
    const { userEmail } = useUserContext();

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
        let collRef;
        if (userEmail === import.meta.env.VITE_adminUser) {
            collRef = collection(db, "games-list");
        } else if (userEmail === "test.user@email.xyz") {
            collRef = collection(db, "user-game-list");
        }
        
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
            <form className="insert-game">
                <h1>Insert Game</h1>
                <label htmlFor="game-title">Title</label>
                <input 
                    id="game-title" 
                    type="text" 
                    name="title" 
                    value={inputs.title || ""} 
                    onChange={handleChange} 
                    placeholder="e.g. Final Fantasy VII: Remake" 
                />
                <label htmlFor="game-genre">Genre</label>
                <input 
                    id="game-genre" 
                    type="text" 
                    name="genre" 
                    value={inputs.genre || ""} 
                    onChange={handleChange} 
                    placeholder="e.g. Role-playing (RPG)" 
                />
                <label htmlFor="game-dev">Developer</label>
                <input 
                    id="game-dev" 
                    type="text" 
                    name="dev" 
                    value={inputs.dev || ""} 
                    onChange={handleChange} 
                    placeholder="e.g. Square Enix" 
                />
                <label htmlFor="release-date">Release Date</label>
                <input 
                    id="release-date" 
                    type="text" 
                    name="rDate" 
                    value={inputs.rDate || ""} 
                    onChange={handleChange} 
                    placeholder="MMM DD, YYYY" 
                />
                <div className="platform-list">
                    <PlatformList />
                </div>
                <div className="button">
                    <button 
                        className="insert-btn" 
                        type="button" 
                        onClick={handleNewGame}
                    >
                        Insert Game
                    </button>
                </div>
            </form>
            <div className="directions">
                <div className="direct-info">
                    <h1>Please Read Before Using Form</h1>
                    <ul>
                        <li>
                            <b><u>Multiple Genres</u>:</b> Please separate by a comma and a space.
                        </li>
                        <li>
                            <b><u>Multiple Developers</u>:</b> Please separate by a comma and a space.
                        </li>
                        <li>
                            <b><u>For Date</u>:</b> Examples of MMM DD, YYYY == "Feb 07, 2024", "Jan 12, 2021"
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
