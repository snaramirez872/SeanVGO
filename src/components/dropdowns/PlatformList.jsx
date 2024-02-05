import React, { useState } from "react";
import "../styles/Dropdown.css";

export default function PlatformList() {
    // Form Variable for Platform Dropdown
    const [platform, setPlatform] = useState("");
    return (
        <>
            <label htmlFor="platforms">Platform</label>
            <select id="platforms" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option defaultValue="">Choose...</option>
                <option value="PlayStation 2">PlayStation 2</option>
                <option value="PlayStation 3">PlayStation 3</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="Xbox 360">Xbox 360</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Xbox Series X|S">Xbox Series X|S</option>
                <option value="Game Boy Color">Game Boy Color</option>
                <option value="Game Boy Advanced">Game Boy Advanced</option>
                <option value="Nintendo DS">Nintendo DS</option>
                <option value="Nintendo 3DS">Nintendo 3DS</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="PC (Microsoft Windows)">PC (Microsoft Windows)</option>
            </select>
        </>
    );
}
