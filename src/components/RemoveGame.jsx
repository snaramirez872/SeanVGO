import React, { useState } from "react";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where
} from "firebase/firestore";
import db from "../firebase.js"
import PlatformList from "./dropdowns/PlatformList.jsx";
import "./styles/Forms.css";

export default function RemoveGame() {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    // Logic for Removing Games
    const handleDelete = async (e) => {
        e.preventDefault();

        // User Input
        const userTitle = document.getElementById("game-title").value;
        const userPlat = document.getElementById("platforms").value;

        const collRef = collection(db, "games-list");
        const q = query(
            collRef, 
            where("title", "==", userTitle), 
            where("platform", "==", userPlat)
        );

        // Firebase Query
        try {
            const snap = await getDocs(q);
            const res = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            res.forEach(async (re) => {
                const docRef = doc(db, "games-list", re.id);
                await deleteDoc(docRef);
            });
            
            // Clear User Inputs
            setInputs({
                title: "",
                platform: "none"
            });
        } catch (error) {
            console.error("Error during deletion:", error.message);
        }
    };

    return (
        <div className="form-container">
            <form className="remove-game">
                <h1>Remove Game</h1>
                <label htmlFor="game-title">Title</label>
                <input 
                    id="game-title" 
                    type="text" 
                    name="title" 
                    value={inputs.title || ""} 
                    onChange={handleChange} 
                    placeholder="e.g. Final Fantasy VII: Remake" 
                />
                <div className="platform-list">
                    <PlatformList />
                </div>
                <div className="button">
                    <button 
                        className="remove-btn" 
                        type="button" 
                        onClick={handleDelete}
                    >
                        Remove Game
                    </button>
                </div>
            </form>
        </div>
    );
}
