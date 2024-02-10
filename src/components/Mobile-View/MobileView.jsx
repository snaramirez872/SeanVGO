import React from "react";
import Sorry from "../../assets/sorry.gif"
import "./styles/MobileView.css";

export default function MobileView() {
    return(
        <div className="mobile-message">
            <h2>Sorry!</h2>
            <h3>This website is not optimized for mobile/smaller screens!</h3>
            <img src={Sorry} />
        </div>
    );
}
