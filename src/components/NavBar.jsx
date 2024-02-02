import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
    return (
        <nav className="nav-bar">
            <div className="logo">
                <h1>SeanVGO</h1>
            </div>
            <div className="nav-links">
                <ul className="links">
                    <li>
                        <Link to="/">
                            <p>Game List</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/insert-game">
                            <p>Insert Game</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/remove-game">
                            <p>Remove Game</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
