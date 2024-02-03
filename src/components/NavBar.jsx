import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "./styles/NavBar.css";

export default function NavBar() {
    // Logout Logic
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navi = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(userAuth);
            console.log("Logout successful");
            navi('/login');
        } catch (error) {
            console.error("Logout failed.", error.message);
        }
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(userAuth, (user) => {
            setLoggedIn(!!user);
        });
        return () => unsub();
    }, [userAuth]);

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
                    <li>
                        {isLoggedIn ? (
                            <a onClick={handleLogout}>
                                <p className="log-btns">Log Out</p>
                            </a>
                        ) : (
                            <Link to="/login">
                                <p className="log-btns">Log In</p>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
