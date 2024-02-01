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
                <option value="Playstation 2">PlayStation 2</option>
                <option value="Playstation 4">PlayStation 4</option>
                <option value="Nintendo DS">Nintendo DS</option>
                <option value="Nintendo 3DS">Nintendo 3DS</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="PC (Microsoft Windows)">PC (Microsoft Windows)</option>
            </select>
        </>
    );
}
