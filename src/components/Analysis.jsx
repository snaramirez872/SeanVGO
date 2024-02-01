import React from "react";
import "./styles/Analysis.css";

export default function Analysis({onClose, children}) {
    return(
        <div className="analysis-container">
            {children}
            <button className="close-btn" onClick={onClose}>Close</button>
        </div>
    );
}
