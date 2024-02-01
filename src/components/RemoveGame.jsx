import React, { useState } from "react";
import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import db from "../firebase.js";
import PlatformList from "./dropdowns/PlatformList";
import "./styles/RemoveGame.css";

export default function RemoveGame() {
  const [inputs, setInputs] = useState({
    title: "",
    platform: "none",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const { title, platform } = inputs;

    const collRef = collection(db, "games-list");
    const q = query(collRef, where("title", "==", title), where("platform", "==", platform));

    try {
      const snap = await getDocs(q);
      const res = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      res.forEach(async (r) => {
        const docRef = doc(db, "games-list", r.id);
        await deleteDoc(docRef);
      });

      // Set Back to Default Values
      setInputs({
        title: "",
        platform: "none",
      });
    } catch (error) {
      console.error("Error during deletion:", error.message);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="form-container">
      <form className="remove-game" onSubmit={handleDelete}>
        <h1>Remove Game</h1>
        <label htmlFor="game-title">Title</label>
        <input
          id="game-title"
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          placeholder="e.g. Final Fantasy VII: Remake"
        />
        <PlatformList />
        <input type="submit" value="Remove" className="submit-insert" />
      </form>
    </div>
  );
}
