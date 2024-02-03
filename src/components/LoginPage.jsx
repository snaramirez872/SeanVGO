import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./styles/LoginPage.css";

export default function LoginPage() {
    // Login Logic
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navi = useNavigate();

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePass = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(userAuth, email, password);
            const userEmail = document.getElementById("email").value;

            if (userEmail === import.meta.env.VITE_adminUser) {
                // If user is the admin
                console.log("Welcome, Admin!");
            } else {
                console.log("Welcome, User!")
            }

            navi('/');

        } catch (error) {
            console.error("Login Failed", error.message);
        }
    };
    
    return (
        <div className="login-container">
            <form id="login-form">
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={email} onChange={onChangeEmail} />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={onChangePass} />
                <div className="button">
                    <button className="login-btn" type="button" onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
