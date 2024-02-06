import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useUserContext } from "./UserContext.jsx";
import db from "../firebase.js";

export const GamesList = () => {
    // Grabbing the current user's email for later conditional
    const { userEmail } = useUserContext();

    // Connecting to Firestore Backend
    const [games, setGames] = useState([]);
    useEffect(() => {
        let collRef;

        if (userEmail === import.meta.env.VITE_adminUser) {
            collRef = collection(db, "games-list");
        } else if (userEmail === "test.user@email.xyz") {
            collRef = collection(db, "user-game-list");
        }

        const q = query(collRef, orderBy("title"));

        const unsub = onSnapshot(q, (snap) =>
            setGames(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );

        return unsub;
    }, []);
    
    return { games };
}
