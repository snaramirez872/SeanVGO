import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <h1>SeanVGO</h1>
            <div className="nav-links">
                <Link to="/">
                    Game List
                </Link>
                <Link to="/insert-game">
                    Insert Game
                </Link>
                <Link to="/remove-game">
                    Remove Game
                </Link>
            </div>
        </nav>
    );
}
