import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import db from "../firebase.js";

export const GamesList = () => {
    // Connecting to Firestore Backend
    const [games, setGames] = useState([]);
    useEffect(() => {
        const collRef = collection(db, "games-list");
        const q = query(collRef, orderBy("title"));

        const unsub = onSnapshot(q, (snap) =>
            setGames(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );

        return unsub;
    }, []);
    
    return { games };
}
