import React, { useState } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState(null);

    return (
        <UserContext.Provider value={{userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
}
